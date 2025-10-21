import asyncio
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# --- Modelos Pydantic (Definem a estrutura dos dados da API) ---
class ChatRequest(BaseModel):
    """Define o formato esperado para a requisição do chat."""
    prompt: str

class ChatResponse(BaseModel):
    """Define o formato da resposta do chat."""
    response: str

# --- Aplicação FastAPI ---
app = FastAPI(
    title="Kamba Legal API",
    description="API para a plataforma de assistência digital Kamba Legal.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Em produção, deves restringir isto ao teu domínio do frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/")
def read_root():
    """Endpoint de boas-vindas para verificar se a API está a funcionar."""
    return {"status": "ok", "message": "Bem-vindo à API do Kamba Legal!"}

@app.post("/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    """Recebe um prompt do utilizador e retorna uma resposta da IA."""

    # Simula um atraso de processamento da IA (2 segundos)
    await asyncio.sleep(2)
    # Lógica simulada: apenas ecoa a pergunta com um prefixo.
    # No futuro, aqui será a chamada para a API do Gemini.
    simulated_response = f"Recebi a sua pergunta sobre: '{request.prompt}'. Em breve terei a resposta completa."
    return ChatResponse(response=simulated_response)
