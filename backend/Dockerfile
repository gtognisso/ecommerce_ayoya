FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN mkdir -p /app/orders /app/config /app/uploads/visuals /app/uploads/videos /app/uploads/favicon

ENV ADMIN_PASSWORD=ayoya_admin_2024
ENV SECRET_KEY=ayoya-ecom-secret-key-prod-2024

EXPOSE 8001

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8001"]
