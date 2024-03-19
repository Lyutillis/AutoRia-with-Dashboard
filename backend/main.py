from fastapi import FastAPI

from api import router


app = FastAPI()


app.include_router(router.router)


@app.get("/")
def root() -> dict:
    return {"message": "Hello World"}
