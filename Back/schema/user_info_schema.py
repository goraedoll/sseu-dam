from pydantic import BaseModel, field_validator, Field
from datetime import date, datetime
from typing import Optional


class user_info_schema(BaseModel):
    UserID: str
    UserName: str
    email : str
    PasswordHash: str= Field(..., alias="password")
    BirthDate: date
    Addr: str
    Phone: str
    EmergencyContact: str

    class Config:
        from_attributes = True  # SQLAlchemy 모델을 Pydantic 모델로 변환할 수 있게 해줍니다.