from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from m_api import car_router, user_router
from database.dal import CarDAL, TaskDAL, ResultDAL, UserDAL


app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://localhost"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.state.car_dal = CarDAL("postgresql")
app.state.task_dal = TaskDAL("postgresql")
app.state.result_dal = ResultDAL("postgresql")
app.state.user_dal = UserDAL("postgresql")

app.include_router(car_router.router)
app.include_router(user_router.router)


@app.get("/")
def root() -> dict:
    return {"message": "Hello World"}
