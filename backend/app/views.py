from django_nextjs.render import render_nextjs_page
import json
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from random import randrange

from src.settings import STATIC_PATH


from .serializers import ParticipantSerializer
from .utils.problems import generate_problem


async def index(request):
    return await render_nextjs_page(request)

@api_view(['GET'])
def get_code_snippet(request):

    return Response({"code_snippets": generate_problem(request.session.get("seed"))}, status=200)
async def login(request):
    return await render_nextjs_page(request)

@api_view(['GET'])
def consent_form(request):
    with open(f"{STATIC_PATH}/consent_form.txt") as f:
        consent_form = f.read()
    return Response({"text":consent_form}, status=200)

@api_view(['POST'])
def process(request):
    # serializer = CodeFileSerializer(data=request.data)
    # print(request.body)

    # print(serializer.data)
    # if serializer.is_valid():
    #     return Response({"sent": True}, status=status.HTTP_200_OK)
    implicated_lines = [randrange(1, 16) for i in range(randrange(3, 8))]
    return Response({"implicated_lines": implicated_lines}, status=status.HTTP_200_OK)


@api_view(['POST'])
def register(request):
    data_dict = json.loads(request.body)
    serializer = ParticipantSerializer(data=data_dict)
    print(request.session.get('seed'), data_dict.get('pid'))
    if not request.session.get('seed'):
        request.session['seed'] = data_dict.get('pid')
    if serializer.is_valid():
        serializer.save()
        print(request.session.get('seed'), data_dict.get('pid'))

        return Response(status=status.HTTP_201_CREATED)
    return Response(status=status.HTTP_400_BAD_REQUEST)

