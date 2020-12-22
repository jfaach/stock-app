"""api URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from stocks import views as stocks_views
from stock_user import views as stock_user_views
from scheduler import views as scheduler_views
from django.conf.urls import url
from rest_framework_jwt.views import obtain_jwt_token
from core import urls as core_urls

urlpatterns = [
    path("api/admin/", admin.site.urls),
    path("api/token-auth/", obtain_jwt_token),
    path("api/core/", include(core_urls)),
    path("api/stockuser/save", stock_user_views.save_stock),
    path("api/stockuser/", stock_user_views.stock_user_list),
    path("api/stockuser/delete", stock_user_views.delete_stock),
    url(r"^api/stocks/$", stocks_views.stocks_list),
    url(r"^api/stocks/(?P<pk>[0-9]+)$", stocks_views.stock_detail),
    url(r"^api/scheduler/$", scheduler_views.scheduler_list),
    url(r"^api/scheduler/(?P<pk>[0-9]+)$", scheduler_views.scheduler_update),
]
