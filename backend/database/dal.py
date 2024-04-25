from typing import List, Literal

from utils import schemas
from utils.log import get_logger
from database.db_layer import DBInterface
from m_api import auth


db_logger = get_logger("Database")


class DAL:
    def __init__(self, db_type: Literal["postgresql", "mongodb"]) -> None:
        print("Created DAL")
        self.db: DBInterface = DBInterface(db_type)


class CarDAL(DAL):
    def process_items(self, items: List[schemas.Car]):
        if not items:
            pass

        for item in items:
            if self.db.get_car_by_vin(item.car_vin):
                db_logger.warning(
                    "Item already in database. Vin: %s" % item.car_vin
                )
                continue
            self.db.add_car(item)

    def get_all_cars(self) -> List[schemas.Car]:
        return [
            schemas.Car(
                id=car.id,
                url=car.url,
                title=car.title,
                price_usd=car.price_usd,
                odometer=car.odometer,
                username=car.username,
                phone_number=car.phone_number,
                image_url=car.image_url,
                images_count=car.images_count,
                car_number=car.car_number,
                car_vin=car.car_vin,
                datetime_found=car.datetime_found,
            )
            for car in self.db.get_all_cars()
        ]


class TaskDAL(DAL):
    def reset_tasks_status(self) -> None:
        db_logger.info("Resetting unfinished tasks")
        self.db.reset_tasks_status()

    def create_tasks(self) -> None:
        db_logger.info("Creating new tasks")
        tasks = [
            schemas.TaskCreate(page_number=i)
            for i in range(1, 11)
        ]
        self.db.bulk_save_tasks(tasks)

    def get_tasks(self, limit: int) -> List[schemas.Task]:
        db_logger.info("Getting tasks from DataBase")
        result = []
        for item in self.db.get_idle_tasks(limit):
            task = schemas.Task(
                item.id,
                item.page_number,
                item.in_work,
                item.completed
            )
            self.db.update_task(item, in_work=True)
            result.append(task)

        return result


class ResultDAL(DAL):
    def save_results(self, items: List[schemas.Result]) -> None:
        if not items:
            return

        db_logger.info("Saving results into DataBase")

        existing_vins = []

        for item in items:
            db_car = self.db.get_car_by_vin(item.car.car_vin)
            if db_car:
                db_logger.warning(
                    "Item already in database. Vin: %s" % item.car.car_vin
                )
            elif item.car.car_vin in existing_vins:
                db_logger.warning(
                    "Item already in database. Vin: %s" % item.car.car_vin
                )
                continue
            else:
                db_car = self.db.add_car(item.car)

            existing_vins.append(item.car.car_vin)

            result = schemas.ResultCreate(
                task_id=item.task_id,
                car_id=db_car.id
            )
            self.db.add_result(result)
            self.db.update_task(
                self.db.get_task_by_id(item.task_id),
                completed=True
            )


class UserDAL(DAL):
    def get_user(self, email: str) -> schemas.User:
        db_logger.info("Getting user from database.")
        user = self.db.get_user(email)
        if user:
            return schemas.User(
                email=user.email,
                hashed_password=user.hashed_password,
            )

    def create_user(self, data: schemas.UserCreate) -> schemas.UserBase:
        user = self.db.create_user(
            data.email,
            auth.get_password_hash(data.password)
        )
        return schemas.UserBase(
            user.email
        )
