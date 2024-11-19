from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Date, TIMESTAMP, DateTime, Boolean, Text
from sqlalchemy.sql import func

Base = declarative_base()

#pr_tb_User테이블
class patient_orm(Base):
    __tablename__ = 'tb_Patient'
    idx = Column(Integer, primary_key=True, autoincrement=True)  # 기본 키로 자동 증가 설정
    UserID = Column(String, nullable=False)  # 관리인 ID, 필수
    user_idx = Column(Integer, nullable=False)  # 사용자 인덱스
    name = Column(String, nullable=False)  # 환자의 이름, 필수
    address = Column(String)  # 주소
    phone = Column(String, unique=True)  # 전화번호, 고유 제약 조건
    created_at = Column(DateTime, server_default=func.now(), nullable=False)  # 생성 시간, DB에서 자동 설정
    BirthDate = Column(Date, nullable = True)
    Gender = Column(String, nullable=True)
    HealthStatus = Column(String, nullable = True)
