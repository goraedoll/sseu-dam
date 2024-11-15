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

orm = ORM_NurseLog.NursingSchedule_ORM

router = APIRouter()

@router.get("/", tags=["nurselog"])
def get_NurseSchedule(db: Session = Depends(get_db),user_id : str = Depends(verify_jwt_token),x_date: str = Header()):
    try:
        user_date = datetime.strptime(x_date, "%Y-%m-%d").date()
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid date format. Use 'YYYY-MM-DD'.")
    data = db.query(orm).filter(orm.UserID == user_id).filter(func.date(orm.ScheduleDate) == user_date).first()
    return {
        "Meal_Morning": data.Meal_Morning,
        "Meal_Afternoon": data.Meal_Afternoon,
        "Meal_Evening": data.Meal_Evening,
        "Urination": data.Urination,
        "Defecation": data.Defecation,
        "WaterIntake": data.WaterIntake
    }

    

#식사 체크
@router.put("/meal", tags=["nurselog"])
def update_meal(meal: nurseSchema.meal_check_schema,
                      db: Session = Depends(get_db),
                      user_id : str = Depends(verify_jwt_token),
                      x_date: str = Header()):
    try:
        user_date = datetime.strptime(x_date, "%Y-%m-%d").date()
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid date format. Use 'YYYY-MM-DD'.")
    meal_sql = db.query(orm).filter(func.date(orm.ScheduleDate) == user_date, orm.UserID == user_id).first()
    if meal.MealTime == "식사_아침":
        setattr(meal_sql, "Meal_Morning", meal.Status)
    if meal.MealTime == "식사_점심":
        setattr(meal_sql, "Meal_Afternoon", meal.Status)
    if meal.MealTime == "식사_저녁":
        setattr(meal_sql, "Meal_Evening", meal.Status)
    try:
        print(meal_sql)
        db.commit()
        db.refresh(meal_sql)
        print("Database update successful")  # 커밋 성공 로그
    except Exception as e:
        db.rollback()
        print("Commit Error:", e)  # 커밋 오류 확인
        raise HTTPException(status_code=500, detail="데이터베이스 업데이트 실패")

    return {"message": "수정 완료"}



@router.put("/UD", tags = ["nurselog"])
def update_UD(ud_data: nurseSchema.BathroomUpdateSchema,
                      db: Session = Depends(get_db),
                      user_id : str = Depends(verify_jwt_token),
                      x_date: str = Header()):
    try:
        user_date = datetime.strptime(x_date, "%Y-%m-%d").date()
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid date format. Use 'YYYY-MM-DD'.")
    meal_sql = db.query(orm).filter(func.date(orm.ScheduleDate) == user_date, orm.UserID == user_id).first()
    update_data = ud_data.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(meal_sql, key, value)
    try:
        db.commit()
        db.refresh(meal_sql)

    except Exception as e:
        db.rollback()
        print("Commit Error:", e)  # 커밋 오류 확인
        raise HTTPException(status_code=500, detail="데이터베이스 업데이트 실패")

    return {"message": "수정 완료"}



@router.put("/water", tags = ["nurselog"])
def update_UD(water_data: nurseSchema.water_update_schema,
                      db: Session = Depends(get_db),
                      user_id : str = Depends(verify_jwt_token),
                      x_date: str = Header()):
    try:
        user_date = datetime.strptime(x_date, "%Y-%m-%d").date()
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid date format. Use 'YYYY-MM-DD'.")
    water_sql = db.query(orm).filter(func.date(orm.ScheduleDate) == user_date, orm.UserID == user_id).first()
    update_data = water_data.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(water_sql, key, value)
    try:
        db.commit()
        db.refresh(water_sql)

    except Exception as e:
        db.rollback()
        print("Commit Error:", e)  # 커밋 오류 확인
        raise HTTPException(status_code=500, detail="데이터베이스 업데이트 실패")

    return {"message": "수정 완료"}
