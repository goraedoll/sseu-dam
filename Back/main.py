from fastapi import FastAPI
from CORS.cors import cors_middleware
from api.Login.login import router as login_router
from api.Alerts.alerts import router as alerts_router
from api.Stream.stream import router as stream_router

app = FastAPI()

cors_middleware(app)

app.include_router(login_router, prefix="/member")
app.include_router(alerts_router, prefix="/main")
app.include_router(stream_router, prefix="/monitoring")