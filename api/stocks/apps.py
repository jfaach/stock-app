from django.apps import AppConfig


class StocksConfig(AppConfig):
    name = "stocks"

    def ready(self):
        from stocks_updater import updater

        updater.start()
