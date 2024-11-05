from fastapi import FastAPI
from CORS.cors import cors_middleware
from api.Login.login import router as login_router
from starlette.middleware.sessions import SessionMiddleware
from api.Alerts.alerts import router as alerts_router
import os




app = FastAPI()

cors_middleware(app)
secret_key = os.environ.get("SESSION_SECRET_KEY")
app.add_middleware(SessionMiddleware, Secret_key = secret_key)

app.include_router(login_router, prefix="/member")
app.include_router(alerts_router, prefix="/main")
