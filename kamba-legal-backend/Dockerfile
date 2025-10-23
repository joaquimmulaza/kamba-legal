# Usa uma imagem oficial Python como base
FROM python:3.11-slim
# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia o ficheiro de dependências
COPY requirements.txt requirements.txt

# Instala as dependências
RUN pip install --no-cache-dir "pip<24.1" && pip install --no-cache-dir -r requirements.txt

# Copia o resto do código da aplicação para o diretório de trabalho
COPY . .

# Expõe a porta que o Uvicorn vai usar
EXPOSE 8000

# Comando para correr a aplicação quando o container iniciar
CMD exec python -m uvicorn main:app --host 0.0.0.0 --port ${PORT:-8080}
