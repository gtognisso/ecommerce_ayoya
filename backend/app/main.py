from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
import json
import os
from pathlib import Path
import random
import string

from app.models import Order, AdminLogin, EmailConfig
from app.auth import create_access_token, verify_token
from app.email_service import send_order_email
from app.routes import config, media, zones, logistics

app = FastAPI(title="AYOYA E-Commerce API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(config.router)
app.include_router(media.router)
app.include_router(zones.router)
app.include_router(logistics.router)

# Static files
from fastapi.staticfiles import StaticFiles
UPLOADS_DIR = Path("/app/uploads")
UPLOADS_DIR.mkdir(exist_ok=True)
if UPLOADS_DIR.exists():
    app.mount("/uploads", StaticFiles(directory=UPLOADS_DIR), name="uploads")

ORDERS_DIR = Path("/app/orders")
ORDERS_DIR.mkdir(exist_ok=True)
CONFIG_DIR = Path("/app/config")
CONFIG_DIR.mkdir(exist_ok=True)

PRICE_PER_BOTTLE = 5000
DELIVERY_FEE = 1000


def generate_order_number():
    date_part = datetime.now().strftime("%Y%m%d")
    random_part = ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))
    return f"AYO-{date_part}-{random_part}"


@app.get("/health")
@app.get("/api/health")
async def health():
    return {"status": "ok", "app": "AYOYA E-Commerce"}


@app.post("/api/orders")
async def create_order(order: Order):
    order.id = f"ORD-{datetime.now().strftime('%Y%m%d%H%M%S')}-{random.randint(1000, 9999)}"
    order.order_id = generate_order_number()
    order.orderNumber = generate_order_number()
    order.created_at = datetime.now().isoformat()
    order.status = "pending"

    # Calculate total based on order type
    if order.order_type == 'carton':
        subtotal = order.quantity * 25000
    else:
        subtotal = order.quantity * PRICE_PER_BOTTLE

    delivery = DELIVERY_FEE if order.deliveryMethod == 'delivery' else 0
    order.total = subtotal + delivery
    order.totalAmount = order.total

    order_file = ORDERS_DIR / f"{order.id}.json"
    with open(order_file, "w") as f:
        json.dump(order.model_dump(), f, indent=2)

    try:
        await send_order_email(order)
    except Exception as e:
        print(f"Email error: {e}")

    return {"id": order.id, "order_id": order.order_id, "orderNumber": order.orderNumber, "status": "created", "totalAmount": order.totalAmount}


@app.get("/api/orders/{order_id}")
async def get_order(order_id: str):
    order_file = ORDERS_DIR / f"{order_id}.json"
    if not order_file.exists():
        raise HTTPException(status_code=404, detail="Order not found")

    with open(order_file) as f:
        return json.load(f)


@app.get("/api/orders")
async def list_orders(token: str = Depends(verify_token)):
    orders = []
    for file in ORDERS_DIR.glob("*.json"):
        with open(file) as f:
            orders.append(json.load(f))
    orders.sort(key=lambda x: x.get('created_at', ''), reverse=True)
    return orders


@app.post("/api/admin/login")
async def admin_login(credentials: AdminLogin):
    valid_usernames = ["admin", "admin@ayoya.bj"]
    if credentials.username not in valid_usernames or credentials.password != os.getenv("ADMIN_PASSWORD", "ayoya_admin_2024"):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    token = create_access_token({"sub": credentials.username, "role": "admin"})
    return {"token": token, "access_token": token, "token_type": "bearer", "role": "admin"}


@app.get("/api/admin/config")
async def get_config(token: str = Depends(verify_token)):
    config_file = CONFIG_DIR / "email_config.json"
    if not config_file.exists():
        return {"host": "", "port": 587, "user": "", "password": "", "from_email": ""}

    with open(config_file) as f:
        return json.load(f)


@app.put("/api/admin/config")
async def update_config(config: EmailConfig, token: str = Depends(verify_token)):
    config_file = CONFIG_DIR / "email_config.json"

    with open(config_file, "w") as f:
        json.dump(config.model_dump(), f, indent=2)

    return {"message": "Config updated"}
