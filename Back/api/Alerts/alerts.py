from fastapi import Depends,APIRouter, HTTPException, Request
from sqlalchemy.orm import Session
from sqlalchemy import func
import ORM.ORM_login as ORI
import schema.SensingAlerts_schema as SA_schema
from ORM.ORM_SensingAlerts import SensingAlerts_ORM as SA_orm
import datetime
from db_session.db_session import get_db, get_session, session_store

router = APIRouter()

### 낙상 여부 데이터 삽입
@router.post("/alert", tags=['Alert'])
def upload_fall(request: Request,AlertData: SA_schema.SensingAlertsSchema, db:Session=Depends(get_db)):
    session_id = request.cookies.get("session_id")
        # session_id를 통해 메모리 내 세션 데이터 조회
    session = session_store.get(session_id)
    if not session:
        raise HTTPException(status_code=403, detail="세션 인증 실패")
    user_id = session["user_id"]

    Alert_Idx_increament = db.query(func.max(SA_orm.AlertIdx)).scalar()
    new_Alert_Idx = (Alert_Idx_increament + 1)

    time_now = datetime.datetime.now()

    new_fall_allert = SA_orm(DeviceIdx = AlertData.DeviceIdx,
                                                    SensingIdx = AlertData.SensingIdx,
                                                    AlertIdx = new_Alert_Idx,
                                                    SensingType = AlertData.SensingType,
                                                    SensingDetails = AlertData.SensingDetails,
                                                    UserID = user_id,
                                                    AlertType = AlertData.AlertType,
                                                    SensedAt = time_now
                                                       )
    db.add(new_fall_allert)
    db.commit()
    db.refresh(new_fall_allert)
    return {"message":"수신 완료"}



@router.get("/alert", tags=["Alert"])
def get_fall(request: Request, db: Session = Depends(get_db)):
    # 쿠키에서 session_id 가져오기
    session_id = request.cookies.get("session_id")
    
    # session_id를 통해 메모리 내 세션 데이터 조회
    session = session_store.get(session_id)
    if not session:
        raise HTTPException(status_code=403, detail="세션 인증 실패")
    
    # 세션 만료 시간 확인
    if session["expires_at"] <= datetime.datetime.now():
        del session_store[session_id]  # 만료된 세션 삭제
        raise HTTPException(status_code=403, detail="세션이 만료되었습니다.")
    
    # 유효한 세션에서 user_id 가져오기
    user_id = session["user_id"]
    
    # DB에서 user_id에 해당하는 데이터 조회
    user = db.query(SA_orm).filter(SA_orm.UserID == user_id).order_by(SA_orm.SensedAt.desc()).limit(7).all()
    if not user:
        raise HTTPException(status_code=400, detail=f"{user_id}가 없어요")
    
    return [ {
        "SensingDetails": data.SensingDetails,
        "AlertType": data.AlertType,
        "SensedAt": data.SensedAt
    } for data in user ]