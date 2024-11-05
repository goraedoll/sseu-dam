from fastapi import FastAPI
from CORS.cors import cors_middleware
from api.Login.login import router as login_router
from api.Alerts.alerts import router as alerts_router
from api.to_do_list.to_do_list import router as to_do_router
from api.Patient.patient import router as patient_router
from starlette.middleware.sessions import SessionMiddleware

app = FastAPI()

# cors_middleware(app)

app.add_middleware(SessionMiddleware, secret_key = "autok_haeyadam?")


app.include_router(login_router, prefix="/member")
app.include_router(alerts_router, prefix="/main")
app.include_router(to_do_router, prefix="/to_do_list")
app.include_router(patient_router, prefix="/patient")
