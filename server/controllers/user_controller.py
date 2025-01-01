from fastapi import APIRouter
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from config.connection import db_connection

router = APIRouter(tags=["Users"])


class UserCreate(BaseModel):
    email: str
    name: str | None = None
    image: str | None = None
    googleId: str




@router.post('/')
async def create_user(user:UserCreate):
    try:
        print("received user")
        created_user = await db_connection.prisma.user.create(
             data={
                "email": user.email,
                "name": user.name,
                "image": user.image,
                "googleId": user.googleId,
            }
        )
        return JSONResponse(
            content={"valid":True , "user":created_user.model_dump()},
            status_code=200
        )
    except Exception as e :
        print(e)
        return JSONResponse(
            content={"valid":False , "user":None},
            status_code=200
        )    


@router.get("/{email}")
async def get_user_by_email(email:str):
    try:
        user_found = await db_connection.prisma.user.find_unique(
            where={"email": email}
        )
        if not user_found:
             return JSONResponse(
            content={"valid":False , "user" :None},
            status_code=200
        )
        return JSONResponse(
            content={"valid":True , "user":user_found.model_dump()},
            status_code=200
        )

    except Exception as e:
        print(e)
        return JSONResponse(
            content={"valid":False , "user" :None},
            status_code=200
        )