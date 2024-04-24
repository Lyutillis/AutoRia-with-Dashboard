from fastapi import APIRouter, Request
from typing import List

from utils import schemas


router = APIRouter()


@router.get("/cars/", response_model=List[schemas.Car])
def get_cars(request: Request):
    return request.app.state.car_dal.get_all_cars()
