from sqlalchemy import Column, Integer, String, Date, TIMESTAMP, DateTime, Boolean, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql import func

Base = declarative_base()

class SensingAlerts_ORM(Base):
    __tablename__ = "pr_tb_SensingAlerts"

    AlertIdx = Column(Integer, primary_key=True, autoincrement=True)
    DeviceIdx = Column(Integer, nullable=False, index=True)
    SensingIdx = Column(Integer, nullable=False, default=0)
    SensingType = Column(String(20), nullable=False)
    SensingValue = Column(Integer)  # nullable=True 생략
    SensingDetails = Column(Text)   # nullable=True 생략
    SensedAt = Column(DateTime, nullable=False, server_default=func.now())
    UserID = Column(String(50), nullable=False, index=True)
    AlertType = Column(String(20), nullable=False)
    