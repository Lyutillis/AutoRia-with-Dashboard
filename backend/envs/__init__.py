from environs import Env
import os

try:
    os.mkdir("logs")
except Exception:
    pass

env = Env()

try:
    env.read_env(".env", override=True)

    POSTGRES_HOST = env.str("POSTGRES_HOST")
    POSTGRES_USER = env.str("POSTGRES_USER")
    POSTGRES_PASSWORD = env.str("POSTGRES_PASSWORD")
    POSTGRES_DB = env.str("POSTGRES_DB")
    POSTGRES_PORT = env.int("POSTGRES_PORT")
    REDIS_HOST = env.str("REDIS_HOST")
    REDIS_PORT = env.int("REDIS_PORT")
    REDIS_PASSWORD = env.str("REDIS_PASSWORD")
    MONGO_URI = env.str("MONGO_URI")
    SECRET_KEY = env.str("SECRET_KEY")
    ALGORITHM = env.str("ALGORITHM")
    ACCESS_TOKEN_EXPIRE_MINUTES = env.int("ACCESS_TOKEN_EXPIRE_MINUTES")

    PAGES = env.int("PAGES")

except Exception as e:
    print(e)
    exit()


if __name__ == "__main__":
    print(PAGES)
