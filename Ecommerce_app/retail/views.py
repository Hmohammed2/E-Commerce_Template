import logging
from rest_framework import viewsets, filters
from .models import Category, Product, Order, Payment
from .serializers import (
    CategorySerializer,
    ProductSerializer,
    OrderSerializer,
    PaymentSerializer,
)
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from .services.payment_service import PaymentService
from .facades.stripe_facade import StripePaymentFacade

# Configure logger
logger = logging.getLogger(__name__)

# Categories
class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = "slug"  # so you can fetch by /categories/sticks/


# Products
class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.all().order_by("-created_at")
    serializer_class = ProductSerializer
    lookup_field = "slug"
    filter_backends = [filters.SearchFilter]
    search_fields = ["name", "description"]


# Orders
class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


# Payments
class PaymentViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = PaymentSerializer

    def get_queryset(self):
        return Payment.objects.filter(order__user=self.request.user)


@api_view(["POST"])
def create_payment_intent(request):
    """
    Create Stripe PaymentIntent for an order
    """
    try:
        data = request.data
        order_id = data.get("order_id")
        logger.info(f"[Stripe] Creating PaymentIntent for order {order_id}")

        order = Order.objects.get(id=order_id)
        amount = int(order.total_price * 100)

        intent_data = StripePaymentFacade.create_payment_intent(amount)
        PaymentService.create_payment_record(order, intent_data["id"], amount)

        logger.info(
            f"[Stripe] PaymentIntent created successfully for order {order_id}, intent_id={intent_data['id']}"
        )
        return Response(intent_data, status=status.HTTP_200_OK)

    except Order.DoesNotExist:
        logger.error(f"[Stripe] Order not found: {order_id}")
        return Response({"error": "Order not found"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        logger.exception("[Stripe] Failed to create PaymentIntent")
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@csrf_exempt
def stripe_webhook(request):
    """
    Stripe webhook
    """
    payload = request.body
    sig_header = request.META.get("HTTP_STRIPE_SIGNATURE")

    logger.info("[Stripe] Webhook received")

    try:
        event = StripePaymentFacade.handle_webhook_event(payload, sig_header)
        logger.info(f"[Stripe] Webhook event parsed: {event['type']}")
    except ValueError as e:
        logger.error(f"[Stripe] Invalid payload: {str(e)}")
        return HttpResponse(status=400)
    except Exception as e:
        logger.exception("[Stripe] Webhook signature verification failed")
        return HttpResponse(status=400)

    try:
        if event["type"] == "payment_intent.succeeded":
            logger.info(f"[Stripe] Payment succeeded: {event['data']['object']['id']}")
            PaymentService.mark_payment_succeeded(event["data"]["object"])
        elif event["type"] == "payment_intent.payment_failed":
            logger.warning(f"[Stripe] Payment failed: {event['data']['object']['id']}")
            PaymentService.mark_payment_failed(event["data"]["object"])
        else:
            logger.info(f"[Stripe] Ignored event type: {event['type']}")
    except Exception as e:
        logger.exception("[Stripe] Error handling webhook event")
        return HttpResponse(status=500)

    return HttpResponse(status=200)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def checkout(request):
    """
    Create Order + PaymentIntent
    """
    try:
        user = request.user
        items = request.data.get("items", [])

        if not items:
            logger.warning(f"[Checkout] Empty items for user={user.id}")
            return Response({"error": "No items provided"}, status=status.HTTP_400_BAD_REQUEST)

        logger.info(f"[Checkout] Creating order + PaymentIntent for user={user.id}")

        result = PaymentService.create_order_and_payment(user, items)

        logger.info(
            f"[Checkout] Order {result['order_id']} created with PaymentIntent {result['clientSecret']}"
        )
        return Response(result, status=status.HTTP_201_CREATED)

    except Exception as e:
        logger.exception("[Checkout] Failed to create order + payment")
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
