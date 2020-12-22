from django.db import models
from django.contrib.auth.models import User
from stocks.models import Stock

# Create your models here.
class StockUser(models.Model):
    stock = models.ForeignKey(Stock, default=None, on_delete=models.PROTECT)
    user = models.ForeignKey(User, default=None, on_delete=models.PROTECT)
    price_min = models.DecimalField(max_digits=5, decimal_places=2, default=None)
    price_max = models.DecimalField(max_digits=5, decimal_places=2, default=None)

    class Meta:
        unique_together = ["stock", "user"]
