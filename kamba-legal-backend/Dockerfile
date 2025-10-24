# Usa uma imagem oficial Python como base
FROM python:3.11-slim
# Define o diretório de trabalho dentro do container
WORKDIR /app

# Define a variável de ambiente PORT (necessária para Cloud Run)
# Define um valor padrão (8080), mas Cloud Run vai sobrescrever isto.
ENV PORT 8080

# Copia o ficheiro de dependências
COPY requirements.txt requirements.txt

# Instala as dependências
RUN pip install --no-cache-dir -r requirements.txt

# Copia o resto do código da aplicação para o diretório de trabalho
COPY . .

# Expõe a porta que a aplicação vai escutar (usando a variável de ambiente)
EXPOSE $PORT

# Comando para correr a aplicação quando o container iniciar
# Usa a variável de ambiente $PORT para definir a porta do Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "$PORT"]
