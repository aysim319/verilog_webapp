from django_nextjs.render import render_nextjs_page_sync
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import CodeFileSerializer


def index(request):
    return render_nextjs_page_sync(request)


@api_view(['POST'])
def process(request):
    # serializer = CodeFileSerializer(data=request.data)
    print(request.data)

    # print(serializer.data)
    # if serializer.is_valid():
    #     return Response({"sent": True}, status=status.HTTP_200_OK)
    return Response(status=status.HTTP_200_OK)
