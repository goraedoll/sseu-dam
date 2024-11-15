from fastapi import Depends,APIRouter, HTTPException, WebSocket
from sqlalchemy.orm import Session
from sqlalchemy import func, event
import ORM.ORM_login as ORI
import schema.SensingAlerts_schema as SA_schema
from ORM.ORM_SensingAlerts import SensingAlerts_ORM as SA_orm
import datetime
from jwt_jp.jwt_jp import verify_jwt_token, verify_jwt_token_socket
from db_session.db_session import get_db
router = APIRouter()
import asyncio

### 낙상 여부 데이터 삽입
@router.post("/alert", tags=['Alert'])
def upload_fall(AlertData: SA_schema.SensingAlertsSchema, db:Session=Depends(get_db)):
    user_id = AlertData.UserID
    if not db.query(SA_orm).filter(SA_orm.UserID == user_id).first():
        HTTPException(status_code=403, detail="인증되지 않음.")

    Alert_Idx_increament = db.query(func.max(SA_orm.AlertIdx)).scalar()
    new_Alert_Idx = (Alert_Idx_increament + 1)

    time_now = datetime.datetime.now()

    if AlertData.AlertType == "낙상 사고" :
        SensingType_opt = "낙상"
        Sensingdetails_opt = "낙상이 발생했습니다"
    elif AlertData.AlertType == "낙상 주의":
        SensingType_opt = "낙상"
        Sensingdetails_opt = "낙상을 주의하세요"
    elif AlertData.AlertType == "욕창 주의":
        SensingType_opt = "욕창"
        Sensingdetails_opt = "자세 변경 시간입니다."
    elif AlertData.AlertType == "요청 사항":
        SensingType_opt = "요청"
        Sensingdetails_opt = "물을 요청합니다"


    new_fall_allert = SA_orm(DeviceIdx = AlertData.DeviceIdx, UserID = AlertData.UserID,
                                                    SensingIdx = AlertData.SensingIdx,
                                                    AlertIdx = new_Alert_Idx,
                                                    SensingType = SensingType_opt,
                                                    SensingDetails = Sensingdetails_opt,
                                                    AlertType = AlertData.AlertType,
                                                    SensedAt = time_now
                                                       )
    db.add(new_fall_allert)
    db.commit()
    db.refresh(new_fall_allert)
    return {"message":"수신 완료"}



@router.get("/alert", tags=["Alert"])
def get_fall(db: Session = Depends(get_db), user_id : str = Depends(verify_jwt_token)):

    user = db.query(SA_orm).filter(SA_orm.UserID == user_id).order_by(SA_orm.SensedAt.desc()).limit(7).all()
    if not user:
        raise HTTPException(status_code=400, detail=f"{user_id}가 없어요")
    
    return [ {
        "SensingDetails": data.SensingDetails,
        "AlertType": data.AlertType,
        "SensedAt": data.SensedAt
    } for data in user ]


# @router.get("/alert_one", tags=["Alert"])
# def get_fall(db: Session = Depends(get_db), user_id : str = Depends(verify_jwt_token)):

#     data = db.query(SA_orm).filter(SA_orm.UserID == user_id).order_by(SA_orm.SensedAt.desc()).first()
#     if not data:
#         raise HTTPException(status_code=400, detail=f"{user_id}가 없어요")
    
#     return  {
#         "SensingDetails": data.SensingDetails,
#         "AlertType": data.AlertType
#     } 

# connected_clients = set()
connected_clients = {}

@router.websocket("/ws/alert")
async def websocket_alert_one(websocket: WebSocket):
    token = websocket.query_params.get("token")
    if not token:
        await websocket.close(code=1008)  # 인증 실패 시 연결 종료
        return

    # 토큰 검증 및 사용자 정보 추출
    user_id = verify_jwt_token_socket(token)
    if not user_id:
        await websocket.close(code=1008)  # 인증 실패 시 연결 종료
        return

    await websocket.accept()
    connected_clients[user_id] = websocket  # user_id를 키로 추가

    try:
        while True:
            await asyncio.sleep(3600)  # 연결을 유지하기 위해 대기
    except Exception as e:
        print("WebSocket connection error:", e)
    finally:
        connected_clients.pop(user_id, None)  # 연결이 종료되면 제거

async def send_websocket_message(user_id, alert_data):
    # user_id가 connected_clients에 있는지 확인
    websocket = connected_clients.get(user_id)
    if websocket:
        try:
            await websocket.send_json(alert_data)
        except Exception as e:
            print("Failed to send message:", e)
            connected_clients.pop(user_id, None)  # 전송 실패 시 연결 제거

def after_insert_listener(mapper, connection, target):
    alert_data = {
        "SensingDetails": target.SensingDetails,
        "AlertType": target.AlertType,
    }
    
    # target.UserID가 connected_clients에 있는 경우만 메시지 전송
    user_id = target.UserID
    if user_id in connected_clients:
        # 비동기 작업 실행 보장
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        loop.run_until_complete(send_websocket_message(user_id, alert_data))
        loop.close()

# 이벤트 리스너 등록
event.listen(SA_orm, "after_insert", after_insert_listener)