from django.shortcuts import render
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from .serializers import *
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from stocks.models import Stock
from .models import StockUser
from rest_framework import status


# Create your views here.
@api_view(["GET"])
def stock_user_list(request):
    data = []
    nextPage = 1
    previousPage = 1
    user = request.user.id
    stock_user = StockUser.objects.all().filter(user=user)
    page = request.GET.get("page", 1)
    paginator = Paginator(stock_user, 10)
    try:
        data = paginator.page(page)
    except PageNotAnInteger:
        data = paginator.page(1)
    except EmptyPage:
        data = paginator.page(paginator.num_pages)

    serializer = StockUserSerializer(data, context={"request": request}, many=True)
    if data.has_next():
        nextPage = data.next_page_number()
    if data.has_previous():
        previousPage = data.previous_page_number()

    return Response(
        {
            "data": serializer.data,
            "count": paginator.count,
            "numpages": paginator.num_pages,
            "nextlink": "/api/stockuser/?page=" + str(nextPage),
            "prevlink": "/api/stockuser/?page=" + str(previousPage),
        }
    )


@api_view(["POST"])
def save_stock(request):
    if request.method == "POST":
        user = request.user.id
        stock = request.data["stock"]
        stocks = Stock.objects.filter(symbol=stock)
        if len(stocks) == 0:
            return Response("Stock not exist", status=status.HTTP_400_BAD_REQUEST)
        stock = stocks[0]
        stock_id = stock.id
        data = request.data
        data["user"] = user
        data["stock"] = stock_id
        serializer = StockUserSerializerSave(data=data, context={"request": request})
        if serializer.is_valid():
            serializer.save()
            stock_user = StockUser.objects.all().filter(user=user, stock=stock_id)
            serializer = StockUserSerializer(stock_user, many=True)
            return Response(serializer.data[0])
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def delete_stock(request):
    if request.method == "POST":
        user = request.user.id
        stock = request.data["id"]
        stocks = StockUser.objects.filter(id=stock, user=user).delete()
        dict_response = {"Success": True}
        return Response(dict_response)
