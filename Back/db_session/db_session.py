
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import DB_connect
from datetime import datetime, timedelta
import uuid



# DATABASE_URL = "mysql+pymysql://username:password@localhost:3306/yourdatabase"

# engine = create_engine(DATABASE_URL)
Base = declarative_base()

def get_db(): #Session 초기화 의존성 // 요청처리가 끝난 후 자동으로 정리하기 위해
    db = Session(bind = DB_connect.engine)
    try:
        yield db
    finally:
        db.close()
