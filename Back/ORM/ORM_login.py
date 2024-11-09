from sqlalchemy import Column, Integer, String, Date, TIMESTAMP, DateTime, Boolean, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql import func

Base = declarative_base()

#tb_User테이블
class User(Base):
    __tablename__ = 'tb_Users'

    UserID = Column(String, primary_key = True)
    UserName = Column(String)
    email = Column(String)
    PasswordHash = Column(String)
    BirthDate = Column(Date)
    Addr = Column(String)
    Phone = Column(String, unique=True, nullable = False)
    EmergencyContact = Column(String)
    JoinedAt = Column(TIMESTAMP, nullable=True, server_default=func.now())

class pr_tb_SensingAlerts(Base):
    __tablename__ = 'tb_SensingAlerts'
    DeviceIdx = Column(Integer, primary_key=True)
    SensingIdx = Column(Integer, nullable=True)
    SensingType = Column(String(20), nullable=True)
    SensingValue = Column(Integer, nullable=True)
    SensingDetails = Column(Text, nullable=True)
    SensedAt = Column(DateTime, nullable=True)
    AlertIdx = Column(Integer, nullable=True)
    UserID = Column(String(50), nullable=True)
    AlertType = Column(String(20), nullable=True)
    ReceivedYN = Column(Boolean, nullable=True)
