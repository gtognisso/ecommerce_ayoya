import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import asyncio
from app.models import Order
from app.config import get_settings


async def send_order_email(order: Order):
    settings = get_settings()
    config = settings.get_email_config()

    if not config.get("user") or not config.get("password"):
        print("Email not configured, skipping...")
        return

    loop = asyncio.get_event_loop()
    await loop.run_in_executor(None, _send_email, order, config)


def _send_email(order: Order, config: dict):
    try:
        msg = MIMEMultipart()
        msg["From"] = config.get("from_email", config["user"])
        msg["To"] = config["user"]
        msg["Subject"] = f"Nouvelle commande AYOYA: {order.orderNumber}"

        delivery_text = "Livraison à domicile" if order.deliveryMethod == 'delivery' else "Retrait en point de vente"
        payment_text = "Paiement à la livraison" if order.paymentMethod == 'cash' else "Mobile Money"

        body = f"""
        <html>
            <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background: linear-gradient(135deg, #C9A227 0%, #8B7355 100%); padding: 20px; text-align: center;">
                    <h1 style="color: white; margin: 0;">AYOYA</h1>
                    <p style="color: white; margin: 5px 0;">Nouvelle Commande</p>
                </div>

                <div style="padding: 20px; background: #FDF8F0;">
                    <h2 style="color: #3D2914;">Commande #{order.orderNumber}</h2>

                    <div style="background: white; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                        <h3 style="color: #C9A227; margin-top: 0;">Client</h3>
                        <p><strong>Nom:</strong> {order.customerName}</p>
                        <p><strong>Téléphone:</strong> {order.phone}</p>
                        <p><strong>Adresse:</strong> {order.address}, {order.city}</p>
                    </div>

                    <div style="background: white; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                        <h3 style="color: #C9A227; margin-top: 0;">Commande</h3>
                        <p><strong>Produit:</strong> AYOYA Liqueur de Racine (75cl)</p>
                        <p><strong>Quantité:</strong> {order.quantity} bouteille(s)</p>
                        <p><strong>Livraison:</strong> {delivery_text}</p>
                        <p><strong>Paiement:</strong> {payment_text}</p>
                    </div>

                    <div style="background: #C9A227; color: white; padding: 15px; border-radius: 8px; text-align: center;">
                        <h2 style="margin: 0;">Total: {order.totalAmount} FCFA</h2>
                    </div>

                    <p style="text-align: center; color: #666; margin-top: 20px;">
                        Date: {order.created_at}
                    </p>
                </div>
            </body>
        </html>
        """

        msg.attach(MIMEText(body, "html"))

        with smtplib.SMTP(config["host"], config["port"]) as server:
            server.starttls()
            server.login(config["user"], config["password"])
            server.send_message(msg)

    except Exception as e:
        raise Exception(f"Failed to send email: {str(e)}")
