from sqlalchemy import Column, Integer, String, Date, TIMESTAMP, DateTime, Boolean, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql import func

Base = declarative_base()

class medication_ORM(Base):
    __tablename__ = "tb_medication"

    id = Column(Integer, primary_key=True, autoincrement=True)  # 기본 키
    UserID = Column(Integer,nullable=False)  # tb_users 테이블 참조
    date = Column(DateTime, nullable=False)  # 날짜 및 시간
    vitamin = Column(Boolean)  # 비타민 복용 여부
    lactic = Column(Boolean)  # 유산균 복용 여부
    diabetes_1 = Column(Boolean)  # 당뇨약 1 복용 여부
    diabetes_2 = Column(Boolean)  # 당뇨약 2 복용 여부
    diabetes_3 = Column(Boolean)  # 당뇨약 3 복용 여부
