from fastapi import FastAPI
import uvicorn

from verilog_repair.src.config import Settings
from verilog_repair.src.posts.router import router

app = FastAPI()

app.include_router(router)



if __name__ == "__main__":
    settings = Settings()
    print(settings.PORT)
    uvicorn.run(app, port=settings.PORT)