from django.db import migrations
import investpy as inv


def create_data(apps, schema_editor):
    Stock = apps.get_model("stocks", "Stock")
    stocks = inv.get_stocks("brazil")
    for stock in stocks.itertuples():
        Stock(symbol=stock.symbol, name=stock.name).save()


class Migration(migrations.Migration):

    dependencies = [
        ("stocks", "0001_initial"),
    ]

    operations = [
        migrations.RunPython(create_data),
    ]
