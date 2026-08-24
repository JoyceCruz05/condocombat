FROM python:3.12-slim

WORKDIR /app

# Copia a configuração de dependências do backend
COPY backend/pyproject.toml ./backend/

# Instala as dependências a partir do pyproject.toml
RUN pip install --no-cache-dir ./backend

# Copia o restante da aplicação
COPY backend/ ./backend/

ENV PYTHONPATH=/app
EXPOSE 8000

CMD ["uvicorn", "backend.app.main:app", "--host", "0.0.0.0", "--port", "8000"]