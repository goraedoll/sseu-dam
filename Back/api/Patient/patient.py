from fastapi import FastAPI, APIRouter, Request, Depends, HTTPException
from schema.patient_schema import patient_post
from db_session.db_session import session_store, create_session, get_db
from sqlalchemy.orm import Session
from ORM.ORM_patient import patient_orm
from sqlalchemy import func



router = APIRouter()

@router.post("/upload", tags=["patient"])
def patient_post(request: Request, patient : patient_post, db: Session = Depends(get_db)):
    session_id = request.cookies.get("session_id")
    session = session_store.get(session_id)
    if not session:
        raise HTTPException(status_code=403, detail="세션 인증 실패")
    user_id = session["user_id"]
    idx_increament = db.query(func.max(patient_orm.idx)).scalar()
    new_Idx = (idx_increament + 1)
    user_Idx = db.query(patient_orm).filter(patient_orm.UserID == user_id).order_by(patient_orm.user_idx.desc()).first()
    new_user_Idx = (user_Idx.user_idx+1)
    db_patient = patient_orm(UserID = user_id,
                          idx = new_Idx,
                          user_idx = new_user_Idx,
                          name = patient.name,
                          address = patient.address,
                          email = patient.email,
                          phone = patient.phone)
    db.add(db_patient)
    db.commit()
    db.refresh(db_patient)

    return {"message": "성공"}

# @router.get("/get", tags=["patient"])
# def patient_get(request: Request, db:Session=Depends(get_db())):
#     session_id = request.cookies.get("session_id")
#     session = session_store.get(session_id)
#     if not session:
#         raise HTTPException(status_code=403, detail="세션 인증 실패")
#     user_id = session["user_id"]
#     patients = db.query(patient_orm).filter(patient_orm.UserID==user_id).order_by(patient_orm.user_idx.desc()).all()

#     return [
#         {

#         }
#     ]
    
    