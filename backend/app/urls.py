from django.urls import path
from .views import index, process, login

urlpatterns = [
    path("", index, name="index"),
    path("login", login, name="login"),
    path("api/submit", process, name="process")
]