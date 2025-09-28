from django.urls import path
from .views import WaitlistView
from .views import ProductListView
from .views import PreorderView

urlpatterns = [
    path("waitlist/", WaitlistView.as_view(), name="waitlist"),
    path("products/", ProductListView.as_view(), name="product-list"),
    path("preorders/", PreorderView.as_view(), name="preorder"),
]