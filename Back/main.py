from fastapi import FastAPI, Request
from api.Login.login import router as login_router
from api.Alerts.alerts import router as alerts_router
from api.to_do_list.to_do_list import router as to_do_router
from api.Patient.patient import router as patient_router
from api.NurseLog.medication import router as medication_router
from api.user_info.user_info import router as user_info_router
from starlette.middleware.sessions import SessionMiddleware
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()

app.add_middleware(
        CORSMiddleware,
        allow_origins=["http://192.168.20.6:5173","http://192.168.20.6:1252","http://192.168.21.193:5173"],  # 요청을 허용할 출처(origin)
        allow_credentials=True,
        allow_methods=["*"],  # 모든 HTTP 메서드 허용 (GET, POST, PUT 등)
        allow_headers=["*"],  # 모든 헤더 허용
    )

app.add_middleware(SessionMiddleware, secret_key = "autok_haeyadam?")


app.include_router(login_router, prefix="/member")
app.include_router(alerts_router, prefix="/main")
app.include_router(to_do_router, prefix="/to_do_list")
app.include_router(medication_router, prefix="/nurselog")
app.include_router(patient_router, prefix="/patient")
app.include_router(user_info_router, prefix="/user_info")

