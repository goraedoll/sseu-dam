from fastapi import Depends,APIRouter
from sqlalchemy.orm import Session
from sqlalchemy import func

import schema.SensingAlerts_schema as SA_schema
from ORM.ORM_SensingAlerts import SensingAlerts_ORM as SA_orm
import datetime
from db_session.db_session import get_db

router = APIRouter()

### 낙상 여부 데이터 삽입
@router.post("/alert")
def upload_fall(AlertData: SA_schema.SensingAlertsSchema, db:Session=Depends(get_db)):

    Alert_Idx_increament = db.query(func.max(SA_orm.AlertIdx)).scalar()
    new_Alert_Idx = (Alert_Idx_increament + 1)

    time_now = datetime.datetime.now()

    new_fall_allert = SA_orm(DeviceIdx = AlertData.DeviceIdx,
                                                    SensingIdx = AlertData.SensingIdx,
                                                    AlertIdx = new_Alert_Idx,
                                                    SensingType = AlertData.SensingType,
                                                    SensingDetails = AlertData.SensingDetails,
                                                    UserID = AlertData.UserID,
                                                    AlertType = AlertData.AlertType,
                                                    SensedAt = time_now
                                                       )
    db.add(new_fall_allert)
    db.commit()
    db.refresh(new_fall_allert)
    return {"message":"수신 완료"}