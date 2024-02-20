import datetime
from django.db import models
from uuid import uuid4

class Participant(models.Model):
    pid = models.PositiveIntegerField(primary_key=True)
    name = models.TextField()
    date = models.DateTimeField()

class CodeFile(models.Model):
    participant = models.ForeignKey(Participant, to_field='pid', on_delete=models.CASCADE)
    filename = models.CharField(max_length=100, default=f'{uuid4()}_{datetime.datetime.utcnow()}.txt')
    filepath = models.TextField()
    implicated_lines = models.TextField()
    created = models.DateTimeField()

    class Meta:
        ordering = ['created']

class Problem(models.Model):
    source_code = models.TextField()
    problem_type = models.TextField()
    bug_type = models.TextField()
    implicated_lines = models.TextField()
    participant = models.ForeignKey(Participant, to_field='pid', on_delete=models.CASCADE)
    idx = models.IntegerField()
    solved = models.IntegerField(default=0)


