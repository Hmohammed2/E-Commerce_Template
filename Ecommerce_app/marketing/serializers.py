from rest_framework import serializers
from .models import Product
from .models import Preorder

class PreorderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Preorder
        fields = ["id", "product", "email", "quantity", "created_at"]

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ["id", "title", "subtitle", "price", "image"]
