import os

import jwt
from dotenv import load_dotenv

SECRET = os.getenv('JWT_SECRET')


def create_token(pid: int):
    return jwt.encode(payload={'pid': pid}, key=SECRET)


def verify_token(token, pid):
    return {'pid': pid} == jwt.decode(token)

def decode_token(token):
    return jwt.decode(token, key=SECRET)
