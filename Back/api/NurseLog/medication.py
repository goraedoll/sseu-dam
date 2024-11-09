from fastapi import APIRouter, Depends, HTTPException, Query, Header
from fastapi import Request
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from ORM import ORM_NurseLog
from schema import nurseSchema
from db_session.db_session import get_db
from sqlalchemy import func
from datetime import datetime
from jwt_jp.jwt_jp import verify_jwt_token
from typing import List

router = APIRouter()

orm = ORM_NurseLog.medication_ORM

@router.get("/", tags=["nurselog"])
def get_medication(date: str =Query(...),db: Session = Depends(get_db),user_id : str = Depends(verify_jwt_token)):
    user_date = datetime.strptime(date, "%Y-%m-%d").date()

    try:
        medications = db.query(orm).filter(orm.UserID == user_id).filter(func.date(orm.date)==user_date).first()  # 5개만 반환
        diabetes = [medications.diabetes_1, medications.diabetes_2, medications.diabetes_3]
        return [
            {
                "checked": i
            }
            for i in [medications.vitamin, medications.lactic, diabetes]
        ]


    except HTTPException as e:
        # HTTPException 발생 시 그대로 반환
        raise e

    except SQLAlchemyError:
        # 데이터베이스 오류 발생 시 롤백하고 오류 메시지 반환
        db.rollback()
        raise HTTPException(status_code=500, detail="데이터베이스 오류 발생")

    except Exception as e:
        # 기타 예상치 못한 오류 처리
        raise HTTPException(status_code=500, detail=f"예상치 못한 오류 발생: {str(e)}")
    
@router.put("/", tags=["nurselog"])
def update_medication(listdata: nurseSchema.MedicationChecked,
                      db: Session = Depends(get_db),
                      user_id : str = Depends(verify_jwt_token),
                      x_date: str = Header()):
    user_date = datetime.strptime(x_date, "%Y-%m-%d").date()
    medication_data = db.query(orm).filter(orm.UserID == user_id).filter(func.date(orm.date)==user_date).first()
    if not medication_data:
        raise HTTPException(status_code=404, detail="날짜에 관한 데이터를 찾을 수 없습니다.")
    
    if listdata.id == 1:
        setattr(medication_data, "vitamin", listdata.checked)
    if listdata.id == 2:
        setattr(medication_data, "lactic", listdata.checked)

    if listdata.id == 3:
        setattr(medication_data, "diabetes_1", listdata.checked[0])
        setattr(medication_data, "diabetes_2", listdata.checked[1])
        setattr(medication_data, "diabetes_3", listdata.checked[2])
    try:
        print(medication_data)
        db.commit()
        db.refresh(medication_data)
        print("Database update successful")  # 커밋 성공 로그
    except Exception as e:
        db.rollback()
        print("Commit Error:", e)  # 커밋 오류 확인
        raise HTTPException(status_code=500, detail="데이터베이스 업데이트 실패")

    return {"message": "수정 완료"}


