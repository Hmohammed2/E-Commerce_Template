from django.db import models

# Create your models here.

class Subscriber(models.Model):
    email = models.EmailField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.email

class Product(models.Model):
    title = models.CharField(max_length=255)
    subtitle = models.CharField(max_length=255, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to="products/")

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
    
class Preorder(models.Model):
    product = models.ForeignKey("Product", on_delete=models.CASCADE, related_name="preorders")
    email = models.EmailField()  # who preordered
    quantity = models.PositiveIntegerField(default=1)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.email} - {self.product.title} x{self.quantity}"