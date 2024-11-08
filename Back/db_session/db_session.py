
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import DB_connect
from datetime import datetime, timedelta
import uuid



DATABASE_URL = "mysql+pymysql://username:password@localhost:3306/yourdatabase"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db(): #Session 초기화 의존성 // 요청처리가 끝난 후 자동으로 정리하기 위해
    db = Session(bind = DB_connect.engine)
    try:
        yield db
    finally:
        db.close()


session_store = {}

# 세션 유효성 검사 함수
def get_session(session_id: str):
    session_data = session_store.get(session_id)
    if session_data and session_data["expires_at"] > datetime.now():
        return session_data["user_id"]
    elif session_data:
        del session_store[session_id]  # 만료된 세션 삭제
    return None

def create_session(user_id):
    # 새로운 고유 세션 ID 생성
    session_id = str(uuid.uuid4())
    expires_at = datetime.now() + timedelta(hours=1)  # 만료 시간 설정
    session_store[session_id] = {
        "user_id": user_id,
        "expires_at": expires_at
    }
    return session_id