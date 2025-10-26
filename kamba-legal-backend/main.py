import os
import asyncio
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import google.generativeai as genai

# Carrega as variáveis de ambiente do ficheiro .env
load_dotenv()

# --- Configuração da API do Gemini ---
api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    raise ValueError("A variável de ambiente GEMINI_API_KEY não foi definida.")

genai.configure(api_key=api_key)
model = genai.GenerativeModel('gemini-2.5-flash')

# --- Modelos Pydantic ---
class ChatRequest(BaseModel):
    prompt: str

class ChatResponse(BaseModel):
    response: str

# --- Aplicação FastAPI ---
app = FastAPI(
    title="Kamba Legal API",
    description="API para a plataforma de assistência digital Kamba Legal.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"status": "ok", "message": "Bem-vindo à API do Kamba Legal!"}

@app.post("/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    """Recebe um prompt do utilizador, envia para a Gemini API e retorna a resposta."""
    try:
        # No futuro, aqui iremos adicionar o contexto dos teus documentos (RAG)
        full_prompt = f"""
        Você é um assistente especializado em processos burocráticos de Angola.
        Responda à seguinte pergunta de forma clara, concisa e passo a passo,
        como se estivesse a ajudar um cidadão comum.

        Pergunta: {request.prompt}
        """
        # Chama a API da Gemini
        gemini_response = await model.generate_content_async(full_prompt)
        # Extrai e limpa o texto da resposta
        response_text = gemini_response.text.strip()
        return ChatResponse(response=response_text)
    except Exception as e:
        print(f"Ocorreu um erro ao chamar a API do Gemini: {e}")
        raise HTTPException(status_code=500, detail="Erro ao processar a sua pergunta.")
