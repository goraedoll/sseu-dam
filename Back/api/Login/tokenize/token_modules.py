import datetime
import jwt
from fastapi import HTTPException

from passlib.context import CryptContext

# pwd_context = CryptContext(schemes=["bcrypt"], deprecated = "auto")

def get_password_hash(password):
    pwd_context = CryptContext(schemes=["bcrypt"], deprecated = "auto")
    return pwd_context.hash(password)


def create_jwt(data: dict):
    expiration = datetime.datetime.now() + datetime.timedelta(hours=1) #만료 시간
    data["exp"] = expiration  # Jwt의 "exp"클레임에 만료 시간을 ㅓㅅㄹ정
    return jwt.encode(data,secret_key, algorithm="HS256")

def verify_jwt_token(token: str):
    try:
        return jwt.decode(token, secret_key, algorithms=['HS256'])
    except:
        raise HTTPException(status_code=400, detail="응아니야~")