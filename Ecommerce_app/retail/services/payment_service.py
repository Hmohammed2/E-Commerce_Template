from decimal import Decimal
from django.db import transaction
from django.contrib.auth.models import User

from retail.models import Order, OrderItem, Payment, Product
from retail.facades.stripe_facade import StripePaymentFacade


class PaymentService:
    """
    Service layer that coordinates Order <-> Payment updates
    """

    @staticmethod
    @transaction.atomic
    def create_order_and_payment(user: User, items: list, currency: str = "GBP"):
        """
        Factory method: creates Order, OrderItems, Stripe PaymentIntent, and Payment record.
        :param user: Django User
        :param items: list of dicts [{product_id: int, quantity: int}, ...]
        """
        # 1. Build order total
        order = Order.objects.create(user=user, total_price=Decimal("0.00"))

        total_price = Decimal("0.00")
        for item in items:
            product = Product.objects.get(id=item["product_id"])
            quantity = int(item["quantity"])
            line_price = product.price * quantity

            OrderItem.objects.create(
                order=order,
                product=product,
                quantity=quantity,
                price=product.price,
            )

            total_price += line_price

            # reduce stock
            product.stock = max(0, product.stock - quantity)
            product.save()

        order.total_price = total_price
        order.save()

        # 2. Create PaymentIntent in Stripe
        amount_in_pence = int(total_price * 100)
        intent_data = StripePaymentFacade.create_payment_intent(amount_in_pence, currency.lower())

        # 3. Create Payment record
        payment = Payment.objects.create(
            order=order,
            stripe_payment_intent=intent_data["id"],
            amount=total_price,
            currency=currency.upper(),
            status="pending",
        )

        return {
            "order_id": order.id,
            "payment_id": payment.id,
            "clientSecret": intent_data["clientSecret"],
            "amount": amount_in_pence,
            "currency": currency,
        }

    @staticmethod
    @transaction.atomic
    def mark_payment_succeeded(intent: dict) -> None:
        try:
            payment = Payment.objects.get(stripe_payment_intent=intent["id"])
            payment.status = "succeeded"
            payment.payment_method = intent["payment_method_types"][0]
            payment.save()

            order = payment.order
            order.status = "processing"
            order.save()

        except Payment.DoesNotExist:
            pass

    @staticmethod
    def mark_payment_failed(intent: dict) -> None:
        try:
            payment = Payment.objects.get(stripe_payment_intent=intent["id"])
            payment.status = "failed"
            payment.save()
        except Payment.DoesNotExist:
            pass
