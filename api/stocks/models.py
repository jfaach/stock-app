from django.db import models

# Create your models here.
class Stock(models.Model):
    symbol = models.CharField(max_length=100)
    name = models.CharField(max_length=50)
    price = models.DecimalField(max_digits=5, decimal_places=2, default=None)

    def __str__(self):
        return self.symbol