from pydantic.v1 import BaseSettings
from typing import ClassVar


class Settings(BaseSettings):
    PROJECT_NAME: str = "AutoRia Parser"

    class Config:
        case_sensitive = True


settings = Settings()
