from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.forms import UserChangeForm

# Register your models here.
from .models import CodeFile, Participant

admin.site.register(CodeFile)
admin.site.register(Participant)