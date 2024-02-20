import os
from pydantic_settings import BaseSettings
from dotenv import load_dotenv

load_dotenv()

class Settings(BaseSettings):
    app_name: str = "Cirfix Fault Locationization API"
    PORT: int = int(os.getenv("PORT"))