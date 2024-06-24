from django_nextjs.render import render_nextjs_page
import json
from datetime import datetime
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
import pathlib
from src.settings import STATIC_PATH
import time
from dotenv import load_dotenv
from pydantic import TypeAdapter
import requests
import os

from app.serializers import ParticipantSerializer, CodeFileSerializer, ProblemSerializer
from app.models import Participant, Problem
from app.utils.problems import get_problems, update_problems
from app.utils.authentication import create_token, decode_token

load_dotenv()
DATA_PATH = os.getenv("DATA_PATH")
VERILOG_API_URL = os.getenv("VERILOG_API_URL")
DEBUG = TypeAdapter(bool).validate_python(os.getenv('DEBUG'))


async def index_page(request):
    return await render_nextjs_page(request)
async def register_page(request):
    return await render_nextjs_page(request)

async def login_page(request):
    return await render_nextjs_page(request)

async def done_page(request):
    return await render_nextjs_page(request)


@api_view(['GET'])
def consent_form(request):
    with open(f"{STATIC_PATH}/consent_form.txt") as f:
        consent_form = f.read()
    return Response({"text":consent_form}, status=200)

@api_view(['POST'])
def process_register(request):
    data_dict = json.loads(request.body)
    serializer = ParticipantSerializer(data=data_dict)
    pid = data_dict.get('pid')

    if DEBUG:
        pid_path = pathlib.Path(f"{DATA_PATH}/{pid}")
        pid_path.mkdir(parents=True, exist_ok=True)
        token = create_token(pid)
        return Response(data={'token': token}, status=status.HTTP_201_CREATED)

    if serializer.is_valid():
        serializer.save()
        pid_path = pathlib.Path(f"{DATA_PATH}/{pid}")
        pid_path.mkdir(parents=True, exist_ok=True)

        token = create_token(pid)
        return Response(data={'token': token}, status=status.HTTP_201_CREATED)
    return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def process_login(request):
    data_dict = json.loads(request.body)
    pid = data_dict.get("pid")
    name = data_dict.get("name")
    qs = Participant.objects.filter(pid=pid, name=name)
    if qs.exists():
        token = create_token(pid)
        return Response(data={'token': token}, status=status.HTTP_201_CREATED)
    return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_code_snippet(request):
    jwt_token = request.headers.get('Authorization')
    payload = decode_token(jwt_token)

    if not payload:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    code_snippets = get_problems(payload.get("pid"))
    return Response({"code_snippets": code_snippets}, status=200)

@api_view(['PATCH'])
def mark_problem(request):
    jwt_token = request.data.get('participant_id')
    payload = decode_token(jwt_token)
    if not payload:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    request.data['participant_id'] = int(payload.get('pid'))
    update_problems(request.data)

    return Response(status=status.HTTP_202_ACCEPTED)

@api_view(['PUT'])
def record_codechange(request):
    jwt_token = request.data.get('pid')
    payload = decode_token(jwt_token)
    if not payload:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    code_snippet = request.data.get("code_snippet")
    if code_snippet:
        code_type = request.data.get("code_type")
        bug_type = request.data.get("bug_type")
        implicated_lines = request.data.get("implicated_lines")
        implicated_lines_str = ",".join([str(num) for num in implicated_lines]) if implicated_lines else ''
        pid = payload.get("pid")
        epoch_time = int(time.time())

        file_name = f"{code_type}_{epoch_time}.v"
        file_path = f"{DATA_PATH}/{pid}"
        with open(f"{file_path}/{file_name}", "w") as f:
            f.write(code_snippet)

        codefile_dict = {
            "filename": file_name,
            "filepath": file_path,
            "created": datetime.fromtimestamp(epoch_time),
            "participant_id": int(pid),
            "implicated_lines": implicated_lines_str
        }

        codefile_serializer = CodeFileSerializer(data=codefile_dict)
        codefile_serializer.create(codefile_dict)

        return Response(status=status.HTTP_202_ACCEPTED)
    return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
def get_problem_status(request):
    jwt_token = request.data.get('pid')
    payload = decode_token(jwt_token)
    if not payload:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    code_type = request.data.get("code_type")
    bug_type = request.data.get("bug_type")
    pid = payload.get("pid")
    solved = Problem.objects.filter(pid=pid, code_type=code_type, bug_type=bug_type).values("solved")

    return Response({"solved": solved}, status=200)

@api_view(['POST'])
def process(request):
    # serializer = CodeFileSerializer(data=request.data)
    jwt_token = request.data.get('pid')
    payload = decode_token(jwt_token)

    if not payload:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    code_snippet = request.data.get("code_snippet")
    code_type = request.data.get("code_type")
    bug_type = request.data.get("bug_type")
    pid = payload.get("pid")
    epoch_time = int(time.time())
    file_name = f"{code_type}_{epoch_time}.v"
    file_path = f"{DATA_PATH}/{pid}"
    with open(f"{file_path}/{file_name}", "w") as f:
        f.write(code_snippet)

    data = {"pid": str(pid),
            "code_type": code_type,
            "code_filename": file_name}
    res = requests.post(f"{VERILOG_API_URL}/api/submit", json=data)

    implicated_lines = json.loads(res.content).get("implicated_lines") if res.status_code == 200 else [-1]

    implicated_lines_str = ",".join([str(line) for line in implicated_lines])

    codefile_dict = {
        "filename": file_name,
        "filepath": file_path,
        "created": datetime.fromtimestamp(epoch_time),
        "participant_id": pid,
        "implicated_lines": implicated_lines_str
    }

    codefile_serializer = CodeFileSerializer(data=codefile_dict)
    codefile_serializer.create(codefile_dict)

    problem_dict = {
        'participant_id': pid,
        'problem_type': code_type,
        'bug_type': bug_type
    }

    if len(implicated_lines) != 0:
        update_problems(problem_dict)

    return Response({"implicated_lines": implicated_lines}, status=status.HTTP_200_OK)


