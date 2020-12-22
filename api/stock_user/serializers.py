from rest_framework import serializers
from .models import StockUser
from django.contrib.auth.models import User
from core import serializers as CoreSerializer
from stocks import serializers as StockSerializer


class StockUserSerializer(serializers.ModelSerializer):
    stock = StockSerializer.StockSerializer()
    user = CoreSerializer.UserSerializer()

    class Meta:
        model = StockUser
        fields = ("pk", "stock", "user", "price_min", "price_max")


class StockUserSerializerSave(serializers.ModelSerializer):
    class Meta:
        model = StockUser
        fields = ("pk", "stock", "user", "price_min", "price_max")
