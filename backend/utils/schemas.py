from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class CarBase(BaseModel):
    url: str
    title: str
    price_usd: float
    odometer: float
    username: str
    phone_number: str
    image_url: Optional[str]
    images_count: int
    car_number: Optional[str]
    car_vin: str
    datetime_found: datetime


class CarCreate(CarBase):
    pass


class Car(CarBase):
    id: int

    class Config:
        from_attributes = True


class TaskCreate(BaseModel):
    page_number: int


class Task(BaseModel):
    id: int
    page_number: int
    in_work: bool
    completed: bool

    class Config:
        from_attributes = True


class ResultCreate(BaseModel):
    task_id: int
    car_id: int


class Result(BaseModel):
    task_id: int
    car: CarCreate

    class Config:
        from_attributes = True
