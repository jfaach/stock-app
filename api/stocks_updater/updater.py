import investpy as inv
from stocks.models import Stock
from stock_user.models import StockUser
from stock_email.sender import Email
from scheduler.models import Scheduler
from datetime import datetime
from apscheduler.schedulers.background import BackgroundScheduler

running_job = None


def generate_message(symbol, price, price_min=None, price_max=None):
    if price_min != None:
        return f"""
        O preço da ação {symbol} - {price} atingiu o preço minino de {price_min} !!!
        """
    if price_max != None:
        return f"""
        O preço da ação {symbol} - {price} atingiu o preço maximo de {price_max} !!!
        """


def update_stock():

    stocks = Stock.objects.all()
    for stock in stocks:
        print(stock)
        send_mail = False
        try:
            df = inv.get_stock_recent_data(stock=stock.symbol, country="brazil")
            price = df.iloc[-1, :][0]
            Stock.objects.filter(symbol=stock.symbol).update(price=price)
            stock_users = StockUser.objects.filter(stock=stock.pk)
            for stock_user in stock_users:
                if price < stock_user.price_min:
                    message = generate_message(
                        symbol=stock.symbol, price=price, price_min=stock_user.price_min
                    )
                    email = Email(
                        "jvfacholli@gmail.com",
                        stock_user.user.email,
                        "Atualizacao Preco",
                        message,
                    )
                    email.send()
                if price > stock_user.price_max:
                    message = generate_message(
                        symbol=stock.symbol, price=price, price_max=stock_user.price_max
                    )
                    email = Email(
                        "jvfacholli@gmail.com",
                        stock_user.user.email,
                        "Atualizacao Preco",
                        message,
                    )
                    email.send()
            connection.close()
        except Exception as e:
            print("Error", str(e))


def update_timer(minutes):
    global running_job
    running_job.remove()
    scheduler = BackgroundScheduler()

    running_job = scheduler.add_job(update_stock, "interval", minutes=minutes)


def start():
    global running_job

    scheduler = BackgroundScheduler()
    minutes = Scheduler.objects.first().minutes
    running_job = scheduler.add_job(update_stock, "interval", minutes=minutes)
    scheduler.start()