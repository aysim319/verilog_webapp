from django.urls import path
from .views import (index_page, process, login_page, done_page,
                    register_page, consent_form, process_register, process_login, get_code_snippet,
                    mark_problem, record_codechange)


urlpatterns = [
    path("home", index_page, name="index"),
    path("register", register_page, name="register"),
    path("login", login_page, name="login"),
    path("api/consentform", consent_form, name="consentform"),
    path("api/submit", process, name="process"),
    path("api/register", process_register, name="process_register"),
    path("api/login", process_login, name="process_login"),
    path("api/codesnippets", get_code_snippet, name="get_code_snippet"),
    path("api/markproblem", mark_problem, name="mark_problem"),
    path("api/recordcode", record_codechange, name="record_codechange"),
    path("done", done_page, name="done_page")
]
