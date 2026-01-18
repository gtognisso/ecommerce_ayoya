from pydantic import BaseModel
from typing import Optional, Literal
from datetime import datetime


class Order(BaseModel):
    id: Optional[str] = None
    order_id: Optional[str] = None
    customer_name: str
    phone: str
    contact_phone: Optional[str] = None
    address: str
    city: str
    zone: Optional[str] = None
    quantity: int
    order_type: Literal['unit', 'carton'] = 'unit'
    paymentMethod: Literal['cash', 'mobile'] = 'cash'
    deliveryMethod: Literal['delivery', 'pickup'] = 'delivery'
    total: Optional[int] = None
    totalAmount: Optional[int] = None
    status: Optional[str] = "pending"
    delivery_id: Optional[str] = None
    notes: Optional[str] = None
    created_at: Optional[str] = None
    customerName: Optional[str] = None
    orderNumber: Optional[str] = None


class AdminLogin(BaseModel):
    username: str
    password: str


class User(BaseModel):
    id: Optional[str] = None
    username: str
    password_hash: Optional[str] = None
    role: Literal['admin', 'logistics']


class SiteConfig(BaseModel):
    bottle_price: int = 5000
    delivery_price: int = 1000
    carton_price: int = 25000
    carton_size: int = 6


class ContactInfo(BaseModel):
    phone: str
    email: str
    address: str


class SocialLinks(BaseModel):
    facebook: Optional[str] = None
    instagram: Optional[str] = None
    tiktok: Optional[str] = None


class NotificationEmail(BaseModel):
    id: Optional[str] = None
    email: str
    active: bool = True


class Visual(BaseModel):
    id: Optional[str] = None
    type: Literal['hero_background', 'hero_bottle', 'product_main', 'product_gallery_1', 'product_gallery_2', 'product_gallery_3', 'product_gallery_4', 'about_image', 'footer_logo']
    path: str
    description: Optional[str] = None


class Video(BaseModel):
    id: Optional[str] = None
    title: str
    path: str
    description: Optional[str] = None


class DeliveryZone(BaseModel):
    id: Optional[str] = None
    city: str
    zone_name: str
    zone_id: str


class Delivery(BaseModel):
    id: Optional[str] = None
    name: str
    phone: str
    active: bool = True


class EmailConfig(BaseModel):
    host: str
    port: int
    user: str
    password: str
    from_email: Optional[str] = "noreply@ayoya.bj"
