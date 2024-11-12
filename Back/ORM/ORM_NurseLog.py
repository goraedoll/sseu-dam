from sqlalchemy import Column, Integer, String, Date, TIMESTAMP, DateTime, Boolean, Text, JSON
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


class NursingSchedule_ORM(Base):
    __tablename__ = 'tb_NursingSchedule'

    idx = Column(Integer, primary_key=True, autoincrement=True)
    UserID = Column(String(20), nullable=False)          # 사용자 ID
    Patient = Column(String(20), nullable=False)         # 환자 ID
    ScheduleDate = Column(Date, nullable=False)          # 일정 날짜
    Meal_Morning = Column(Boolean, default=False)        # 아침 식사 여부
    Meal_Afternoon = Column(Boolean, default=False)      # 점심 식사 여부
    Meal_Evening = Column(Boolean, default=False)        # 저녁 식사 여부
    Urination = Column(JSON, nullable=False)             # 소변 상태 (JSON 형식)
    Defecation = Column(JSON, nullable=False)            # 대변 상태 (JSON 형식)
    WaterIntake = Column(JSON, nullable=False)           # 수분 섭취 상태 (JSON 형식)
