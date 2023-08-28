from django.urls import path
from .views import index, process

urlpatterns = [
    path("", index, name="index"),
    path("api/submit", process, name="process")
]