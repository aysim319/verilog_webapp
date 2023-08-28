import datetime
from django.db import models
from uuid import uuid4


class CodeFile(models.Model):
    id = models.PositiveIntegerField(primary_key=True)
    filename = models.CharField(max_length=100, default=f'{uuid4()}_{datetime.datetime.utcnow()}.txt')
    filepath = models.TextField()
    num_lines = models.IntegerField()
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['created']