from fastapi import APIRouter
from typing import List

from utils import schemas
from database import dal
# from database import db_layer


router = APIRouter()

car_dal = dal.CarDAL("postgresql")
task_dal = dal.TaskDAL("postgresql")
result_dal = dal.ResultDAL("postgresql")


@router.get("/cars/", response_model=List[schemas.Car])
def get_cars():
    return car_dal.get_all_cars()
