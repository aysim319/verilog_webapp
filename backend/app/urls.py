from django.urls import path
from .views import index, process, login, consent_form, register, get_code_snippet

urlpatterns = [
    path("", index, name="index"),
    path("login", login, name="login"),
    path("api/consentform", consent_form, name="consentform"),
    path("api/submit", process, name="process"),
    path("api/register", register, name="register"),
    path("api/codesnippets", get_code_snippet, name="get_code_snippet")
]