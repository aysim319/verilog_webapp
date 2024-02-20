from django.urls import path
from .views import (index, process, login,
                    register, consent_form, process_register, process_login, get_code_snippet,
                    mark_problem)


urlpatterns = [
    path("home", index, name="index"),
    path("register", register, name="register"),
    path("login", login, name="login"),
    path("api/consentform", consent_form, name="consentform"),
    path("api/submit", process, name="process"),
    path("api/register", process_register, name="process_register"),
    path("api/login", process_login, name="process_login"),
    path("api/codesnippets", get_code_snippet, name="get_code_snippet"),
    path("api/markproblem", mark_problem, name="mark_problem_skip"),
]
