from fastapi import Depends,APIRouter, HTTPException, Request
from sqlalchemy.orm import Session
from sqlalchemy import func
import ORM.ORM_login as ORI
import schema.SensingAlerts_schema as SA_schema
from ORM.ORM_SensingAlerts import SensingAlerts_ORM as SA_orm
import datetime
from jwt_jp.jwt_jp import verify_jwt_token
from db_session.db_session import get_db
router = APIRouter()

### 낙상 여부 데이터 삽입
@router.post("/alert", tags=['Alert'])
def upload_fall(AlertData: SA_schema.SensingAlertsSchema, db:Session=Depends(get_db), user_id : str = Depends(verify_jwt_token)):

    if not db.query(SA_orm).filter(SA_orm.UserID == user_id):
        HTTPException(status_code=403, detail="인증되지 않음.")

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
def get_fall(request: Request, db: Session = Depends(get_db), user_id : str = Depends(verify_jwt_token)):

    user = db.query(SA_orm).filter(SA_orm.UserID == user_id).order_by(SA_orm.SensedAt.desc()).limit(7).all()
    if not user:
        raise HTTPException(status_code=400, detail=f"{user_id}가 없어요")
    
    return [ {
        "SensingDetails": data.SensingDetails,
        "AlertType": data.AlertType,
        "SensedAt": data.SensedAt
    } for data in user ]