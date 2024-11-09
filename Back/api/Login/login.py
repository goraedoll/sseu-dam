from fastapi import Depends, HTTPException, APIRouter, Request, Response
from sqlalchemy.orm import Session
from sqlalchemy import func
import schema.login_schema as login_schema
import ORM.ORM_login as ORM_login
from db_session.db_session import get_db
from fastapi.security import HTTPBasic
from api.Login.tokenize import token_modules as tm
import datetime
from jwt_jp import jwt_jp

security = HTTPBasic()

router = APIRouter()

ORM_login.Base
ORU = ORM_login.User



@router.post("/login", tags=["member"])
def select_login(login: login_schema.LoginSchema, db: Session = Depends(get_db)):
    # 사용자 조회
    db_user = db.query(ORU).filter(ORU.UserID == login.UserID).first()
    if db_user is None:
        raise HTTPException(status_code=400, detail="아이디 틀림")
    if db_user.PasswordHash != login.PasswordHash:
        raise HTTPException(status_code=400, detail="비밀번호 틀림")
    

    access_token = jwt_jp.create_access_token(data={"sub": login.UserID})

    return {"message": "로그인 성공", "access_token": access_token}


@router.post("/signup", tags=["member"])
def add_member(member : login_schema.Signup_Schema, db:Session=Depends(get_db)):
    existing_user = db.query(ORM_login.User).filter(ORM_login.User.UserID == member.UserID).first()
    # 이미 있는 아이디 인지 확인
    if existing_user:
        raise HTTPException(status_code=400, detail="이미 존재하는 사용자 ID입니다.")
    ### 등록된 폰인지 확인
    existing_phone = db.query(ORM_login.User).filter(ORM_login.User.Phone == member.Phone).first()
    if existing_phone:
        raise HTTPException(status_code=400, detail="이미 사용중인 전화번호입니다.")
    

    Hashed_pw = tm.get_password_hash(member.PasswordHash)
    time_now = datetime.datetime.now()

    # db_user = ORM_login.User(**member.dict(exclude_unset=True))
    db_user = ORM_login.User(UserID = member.UserID,
                             UserName = member.UserName,
                             email = member.email,
                             PasswordHash = Hashed_pw,
                             BirthDate = member.BirthDate,
                             Addr = member.Addr,
                             Phone = member.Phone,
                             EmergencyContact = member.EmergencyContact,
                             JoinedAt = time_now)

    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return{"message" : "회원가입이 완료되었습니다."}
    

@router.post("/forgot-password", tags=['member']) #정보 입력창
def forgot_password(model : login_schema.forgot_Password , db:Session=Depends(get_db)):
    existing_user = db.query(ORM_login.User).filter(ORM_login.User.UserID==model.UserID).first()
    if existing_user:
        if existing_user.email==model.email:
            if existing_user.Phone == model.Phone:
                return{"message":f"/{model.UserID}/reset-password"}
            raise HTTPException(status_code=400, detail="폰 번호 다름")
        raise HTTPException(status_code=400, detail="이메일 다름")
    raise HTTPException(status_code=400, detail="아이디가 틀렸습니다.")


@router.post("/{UserID}/reset-password", tags=['member'])# 비번 리셋하기
def reset_password(UserID: str, model : login_schema.check_Password, db:Session=Depends(get_db)):
    if model.password == model.password2:
        user = db.query(ORM_login.User).filter(ORM_login.User.UserID==model.UserID).first()
        user.PasswordHash = model.password
        db.commit()
        return{"message": "변경 성공"}
    else:
        raise HTTPException(status_code=400, detail="비밀번호 확인 실패")
    
