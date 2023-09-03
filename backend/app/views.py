from django_nextjs.render import render_nextjs_page_sync
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

import random
from random import randrange

from dotenv import load_dotenv
import os
from django.views.decorators.csrf import csrf_exempt

load_dotenv()
NUM_PROBLEM = int(os.getenv("NUM_PROBLEM"))

# from src.settings import CODE_FILES


def index(request):
    pid = request.GET.get('pid')
    print(f"HIIIIII {pid}")
    seed = random.seed(pid)
    # problem_set = random.sample(CODE_FILES, NUM_PROBLEM)
    # print(problem_set)
    return render_nextjs_page_sync(request)

def login(request):
    return render_nextjs_page_sync(request)


@api_view(['POST'])
def process(request):
    # serializer = CodeFileSerializer(data=request.data)
    print(request.body)

    # print(serializer.data)
    # if serializer.is_valid():
    #     return Response({"sent": True}, status=status.HTTP_200_OK)
    implicated_lines = [randrange(1,16) for i in range(randrange(3,8))]

    return Response({"implicated_lines": implicated_lines }, status=status.HTTP_200_OK)

def fetch_codefile(request):

    return
    pass
