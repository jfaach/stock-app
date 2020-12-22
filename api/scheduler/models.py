from django.db import models

# Create your models here.
class Scheduler(models.Model):
    minutes = models.IntegerField(default=15)
    createdDate = models.DateTimeField(auto_now_add=True)
