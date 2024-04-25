from fastapi import APIRouter, Request, Depends, HTTPException, status
from datetime import timedelta
from typing import Annotated
from fastapi.security import OAuth2PasswordRequestForm

from envs import ACCESS_TOKEN_EXPIRE_MINUTES
from utils import schemas
from m_api.auth import authenticate_user, create_access_token, get_current_user


router = APIRouter()


@router.post("/users/create/", response_model=schemas.UserBase)
async def create_user(
    request: Request,
    body: schemas.UserCreate
) -> schemas.UserBase:
    if request.app.state.user_dal.get_user(body.email):
        raise HTTPException(
            status_code=422,
            detail="User with this username already exists!",
        )

    return request.app.state.user_dal.create_user(body)


@router.post("/token/")
def login_for_access_token(
    request: Request,
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()]
) -> schemas.Token:
    user = authenticate_user(form_data.email, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return schemas.Token(access_token=access_token, token_type="Bearer")


@router.get("/users/me/", response_model=schemas.User)
def read_users_me(
    current_user: Annotated[schemas.User, Depends(get_current_user)]
) -> schemas.User:
    return current_user
