from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from .models import Scheduler
from .serializers import *
from django.contrib.auth.models import User
from stocks_updater.updater import update_timer


@api_view(["GET", "POST"])
def scheduler_list(request):
    """
    List of Stocks.
    """

    if request.method == "GET":
        data = []
        schedule = Scheduler.objects.all()

        serializer = SchedulerSerializer(
            schedule, context={"request": request}, many=True
        )

        return Response(
            {
                "data": serializer.data,
            }
        )


@api_view(["PUT"])
def scheduler_update(request, pk):
    try:
        scheduler = Scheduler.objects.get(pk=pk)
        user = User.objects.get(pk=request.user.id)

        if not user.is_superuser:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
    except Scheduler.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "PUT":
        serializer = SchedulerSerializer(
            scheduler, data=request.data, context={"request": request}
        )
        if serializer.is_valid():
            serializer.save()
            update_timer(serializer.data["minutes"])
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)