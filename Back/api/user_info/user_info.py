from fastapi import APIRouter, Depends, HTTPException
from schema.user_info_schema import user_info_schema
from db_session.db_session import  get_db
from sqlalchemy.orm import Session
from sqlalchemy import func
from jwt_jp.jwt_jp import verify_jwt_token
from ORM.ORM_login import User
from jwt_jp import hash
import hashlib
router = APIRouter()


@router.get("/", tags=["user_info"])
def user_info_get(db:Session=Depends(get_db),user_id : str = Depends(verify_jwt_token)):
    user_info = db.query(User).filter(User.UserID==user_id).first()
    return {
        "UserID" : user_id,
        "UserName":user_info.UserName,
        "email": user_info.email,
        "password":user_info.PasswordHash,
        "BirthDate":user_info.BirthDate,
        "Addr":user_info.Addr,
        "Phone":user_info.Phone,
        "EmergencyContact":user_info.EmergencyContact
    }

@router.put("/update", tags=["user_info"])
def user_info_update(info : user_info_schema,db:Session=Depends(get_db),user_id : str = Depends(verify_jwt_token)):


    user_data = db.query(User).filter(User.UserID == user_id).first()
    info.PasswordHash = hashlib.sha3_256(info.PasswordHash.encode()).hexdigest() #sha3사용
    update_data = info.model_dump(exclude_unset=True)
    print("Update Data:", update_data)
    

    for key, value in update_data.items():
        setattr(user_data, key, value)
    try:
        db.commit()
        db.refresh(user_data)
        print("Database update successful")  # 커밋 성공 로그
    except Exception as e:
        db.rollback()
        print("Commit Error:", e)  # 커밋 오류 확인
        raise HTTPException(status_code=500, detail="데이터베이스 업데이트 실패")

    return {"message": "수정 완료"}

    
    