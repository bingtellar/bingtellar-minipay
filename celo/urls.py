from django.urls import path, include
from . import views
import app

urlpatterns = [
    path('abi', views.abi)
]