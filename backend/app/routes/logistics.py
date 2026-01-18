from fastapi import APIRouter, HTTPException, status
from pathlib import Path
import json
import uuid
from datetime import datetime
from typing import List
import hashlib
import os

from app.models import AdminLogin, User, Order, Delivery
from app.auth import create_access_token, verify_token
from fastapi import Depends

router = APIRouter(prefix="/api", tags=["logistics"])
ORDERS_DIR = Path("/app/orders")
CONFIG_DIR = Path("/app/config")

ORDERS_DIR.mkdir(exist_ok=True)
CONFIG_DIR.mkdir(exist_ok=True)

USERS_FILE = CONFIG_DIR / "users.json"
DELIVERIES_FILE = CONFIG_DIR / "deliveries.json"


def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()


def load_users():
    if USERS_FILE.exists():
        with open(USERS_FILE) as f:
            return json.load(f)
    return []


def save_users(users):
    with open(USERS_FILE, "w") as f:
        json.dump(users, f, indent=2)


def load_deliveries():
    if DELIVERIES_FILE.exists():
        with open(DELIVERIES_FILE) as f:
            return json.load(f)
    return []


def save_deliveries(deliveries):
    with open(DELIVERIES_FILE, "w") as f:
        json.dump(deliveries, f, indent=2)


def initialize_default_users():
    users = load_users()
    if not users:
        users = [
            {
                "id": str(uuid.uuid4()),
                "username": "admin@ayoya.bj",
                "password_hash": hash_password("ayoya_admin_2024"),
                "role": "admin"
            },
            {
                "id": str(uuid.uuid4()),
                "username": "logistique@ayoya.bj",
                "password_hash": hash_password("ayoya_logistique_2024"),
                "role": "logistics"
            }
        ]
        save_users(users)


@router.post("/auth/login")
async def login(credentials: AdminLogin):
    users = load_users()
    user = next((u for u in users if u["username"] == credentials.username), None)

    if not user or user["password_hash"] != hash_password(credentials.password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    token = create_access_token({"sub": user["username"], "role": user["role"]})
    return {
        "token": token,
        "access_token": token,
        "token_type": "bearer",
        "role": user["role"],
        "username": user["username"]
    }


@router.get("/logistics/orders", dependencies=[Depends(verify_token)])
async def list_orders():
    orders = []
    for file in ORDERS_DIR.glob("*.json"):
        with open(file) as f:
            orders.append(json.load(f))
    orders.sort(key=lambda x: x.get('created_at', ''), reverse=True)
    return orders


@router.get("/logistics/orders/{order_id}", dependencies=[Depends(verify_token)])
async def get_order(order_id: str):
    order_file = ORDERS_DIR / f"{order_id}.json"
    if not order_file.exists():
        raise HTTPException(status_code=404, detail="Order not found")

    with open(order_file) as f:
        return json.load(f)


@router.put("/logistics/orders/{order_id}/status", dependencies=[Depends(verify_token)])
async def update_order_status(order_id: str, status: str):
    order_file = ORDERS_DIR / f"{order_id}.json"
    if not order_file.exists():
        raise HTTPException(status_code=404, detail="Order not found")

    with open(order_file) as f:
        order = json.load(f)

    order["status"] = status
    with open(order_file, "w") as f:
        json.dump(order, f, indent=2)

    return order


@router.put("/logistics/orders/{order_id}/assign", dependencies=[Depends(verify_token)])
async def assign_order(order_id: str, delivery_id: str):
    order_file = ORDERS_DIR / f"{order_id}.json"
    if not order_file.exists():
        raise HTTPException(status_code=404, detail="Order not found")

    deliveries = load_deliveries()
    if not any(d["id"] == delivery_id for d in deliveries):
        raise HTTPException(status_code=404, detail="Delivery not found")

    with open(order_file) as f:
        order = json.load(f)

    order["delivery_id"] = delivery_id
    order["status"] = "assigned"

    with open(order_file, "w") as f:
        json.dump(order, f, indent=2)

    return order


@router.post("/logistics/deliveries", dependencies=[Depends(verify_token)])
async def create_delivery(delivery: Delivery):
    delivery.id = str(uuid.uuid4())
    deliveries = load_deliveries()
    deliveries.append(delivery.model_dump())
    save_deliveries(deliveries)
    return delivery


@router.get("/logistics/deliveries", dependencies=[Depends(verify_token)])
async def list_deliveries():
    return load_deliveries()


@router.put("/logistics/deliveries/{delivery_id}", dependencies=[Depends(verify_token)])
async def update_delivery(delivery_id: str, delivery: Delivery):
    deliveries = load_deliveries()
    idx = next((i for i, d in enumerate(deliveries) if d["id"] == delivery_id), None)

    if idx is None:
        raise HTTPException(status_code=404, detail="Delivery not found")

    deliveries[idx] = {**deliveries[idx], **delivery.model_dump(exclude_unset=True)}
    save_deliveries(deliveries)
    return deliveries[idx]


initialize_default_users()
