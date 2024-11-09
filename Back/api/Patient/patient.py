from fastapi import APIRouter, Depends, HTTPException
from schema.patient_schema import patient_post, patient_update
from db_session.db_session import  get_db
from sqlalchemy.orm import Session
from ORM.ORM_patient import patient_orm
from sqlalchemy import func
from jwt_jp.jwt_jp import verify_jwt_token


router = APIRouter()

# @router.post("/upload", tags=["patient"])
# def patient_post(patient : patient_post, db: Session = Depends(get_db)):
#     idx_increament = db.query(func.max(patient_orm.idx)).scalar()
#     new_Idx = (idx_increament + 1)
#     user_Idx = db.query(patient_orm).filter(patient_orm.UserID == user_id).order_by(patient_orm.user_idx.desc()).first()
#     new_user_Idx = (user_Idx.user_idx+1)
#     db_patient = patient_orm(UserID = user_id,
#                           idx = new_Idx,
#                           user_idx = new_user_Idx,
#                           name = patient.name,
#                           address = patient.address,
#                           email = patient.email,
#                           phone = patient.phone)
#     db.add(db_patient)
#     db.commit()
#     db.refresh(db_patient)

#     return {"message": "성공"}

@router.get("/get", tags=["patient"])
def patient_get(db:Session=Depends(get_db),user_id : str = Depends(verify_jwt_token)):
    patients = db.query(patient_orm).filter(patient_orm.UserID==user_id).order_by(patient_orm.user_idx.asc()).all()
    return [
        {
            "id" : patient.user_idx,
            "name": patient.name,
            "BirthDate": patient.BirthDate,
            "address": patient.address,
            "phone" : patient.phone,
            "HealthStatus" : patient.HealthStatus,
            "createdAt" :  patient.created_at
        }
        for patient in patients
    ]
    
@router.put("/update", tags=["patient"])
def patient_update(update: patient_update,db:Session=Depends(get_db),user_id : str = Depends(verify_jwt_token)):
    patients = db.query(patient_orm).filter(patient_orm.UserID == user_id).filter(update.id == patient_orm.user_idx).first()
    update_data = update.model_dump(exclude_unset=True)
    print("Update Data:", update_data)
    for key, value in update_data.items():
        setattr(patients, key, value)
    try:
        db.commit()
        db.refresh(patients)
        print("Database update successful")  # 커밋 성공 로그
    except Exception as e:
        db.rollback()
        print("Commit Error:", e)  # 커밋 오류 확인
        raise HTTPException(status_code=500, detail="데이터베이스 업데이트 실패")
    return {"message": "수정 성공"}
    

@router.delete("/delete/{id}", tags=["patient"])
def delete_patient(id: int, db: Session = Depends(get_db), user_id: str = Depends(verify_jwt_token)):
    # 데이터베이스에서 환자 검색
    patient = db.query(patient_orm).filter(patient_orm.user_idx == id, patient_orm.UserID == user_id).first()

    if not patient:
        raise HTTPException(status_code=404, detail="환자를 찾을 수 없습니다.")

    try:
        # 데이터 삭제
        db.delete(patient)
        db.commit()
        return {"detail": "환자가 성공적으로 삭제되었습니다."}
    except Exception as e:
        db.rollback()
        print("Error deleting patient:", e)
        raise HTTPException(status_code=500, detail="데이터베이스 삭제 실패")