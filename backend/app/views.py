from django_nextjs.render import render_nextjs_page_sync
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from random import randrange
from pathlib import Path


def index(request):
    return render_nextjs_page_sync(request)

def login(request):
    return render_nextjs_page_sync(request)

@api_view(['POST'])
def process(request):
    # serializer = CodeFileSerializer(data=request.data)
    print(request.data)

    # print(serializer.data)
    # if serializer.is_valid():
    #     return Response({"sent": True}, status=status.HTTP_200_OK)
    implicated_lines = [randrange(1,16) for i in range(randrange(3,8))]

    return Response({"implicated_lines": implicated_lines }, status=status.HTTP_200_OK)

def fetch_codefile(request):

    return
    pass
