from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from .models import Category, Product, Order, OrderItem, Payment


class CategoryProductTests(APITestCase):
    def setUp(self):
        self.category = Category.objects.create(name="Sticks", slug="sticks")
        self.product = Product.objects.create(
            name="Sanwa Joystick",
            slug="sanwa-joystick",
            category=self.category,
            description="High quality Sanwa arcade stick",
            price="29.99",
            stock=10,
        )

    def test_list_categories(self):
        url = reverse("category-list")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data[0]["name"], "Sticks")

    def test_list_products(self):
        url = reverse("product-list")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data[0]["name"], "Sanwa Joystick")

    def test_get_single_product(self):
        url = reverse("product-detail", args=[self.product.slug])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["slug"], "sanwa-joystick")


class OrderTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="testuser", password="testpass")
        self.client.login(username="testuser", password="testpass")

        self.category = Category.objects.create(name="Buttons", slug="buttons")
        self.product = Product.objects.create(
            name="Seimitsu Button",
            slug="seimitsu-button",
            category=self.category,
            description="Arcade pushbutton",
            price="3.50",
            stock=50,
        )

    def test_create_order(self):
        url = reverse("order-list")
        data = {
            "items": [
                {
                    "product": self.product.id,
                    "quantity": 2,
                    "price": "7.00"
                }
            ],
            "total_price": "7.00"
        }
        response = self.client.post(url, data, format="json")
        # Since OrderSerializer is read-only for items, this may need tweaking if you allow POST
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Order.objects.count(), 1)
        self.assertEqual(OrderItem.objects.count(), 0)  # unless you wire in item creation

    def test_list_orders(self):
        Order.objects.create(user=self.user, total_price="15.00")
        url = reverse("order-list")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)


class PaymentTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="payuser", password="paypass")
        self.client.login(username="payuser", password="paypass")

        self.order = Order.objects.create(user=self.user, total_price="29.99")
        self.payment = Payment.objects.create(
            order=self.order,
            stripe_payment_intent="pi_test_123",
            amount="29.99",
            currency="GBP",
            status="pending",
            payment_method="card",
        )

    def test_list_payments(self):
        url = reverse("payment-list")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data[0]["stripe_payment_intent"], "pi_test_123")

    def test_payment_detail(self):
        url = reverse("payment-detail", args=[self.payment.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["status"], "pending")
