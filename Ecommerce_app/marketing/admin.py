# Register your models here
from django.contrib import admin
from .models import Subscriber
from .models import Product
from .models import Preorder

@admin.register(Subscriber)
class SubscriberAdmin(admin.ModelAdmin):
    list_display = ('email', 'created_at')

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("title", "subtitle", "price", "created_at", "image_preview")
    search_fields = ("title", "subtitle")
    list_filter = ("created_at",)
    readonly_fields = ("created_at", "image_preview")

    def image_preview(self, obj):
        if obj.image:
            return f'<img src="{obj.image.url}" style="max-height: 80px;"/>'
        return "(No image)"
    image_preview.allow_tags = True
    image_preview.short_description = "Preview"

@admin.register(Preorder)
class PreorderAdmin(admin.ModelAdmin):
    list_display = ('email', 'product', 'quantity', 'created_at')
    search_fields = ('email', 'product__title')
    list_filter = ('created_at', 'product')
    readonly_fields = ('created_at',)
    ordering = ('-created_at',)
    
    def get_queryset(self, request):
        qs = super().get_queryset(request)
        return qs.select_related('product')
