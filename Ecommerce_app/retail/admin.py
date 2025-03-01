from django.contrib import admin
from .models import Category, Product, Order, OrderItem, Payment


class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'stock')
    prepopulated_fields = {"slug": ("name",)}
    
# Register your models here.
admin.site.register(Category)
admin.site.register(Product)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(Payment)