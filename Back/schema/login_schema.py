from pydantic import BaseModel, field_validator, Field
from datetime import date, datetime
from typing import Optional

class Signup_Schema(BaseModel):
    UserID: str
    UserName: str
    email : str
    PasswordHash: str = Field(..., alias="password")
    BirthDate: date
    Addr: str
    Phone: str
    EmergencyContact: str
    JoinedAt : Optional[datetime] = None

    class Config:
        from_attributes = True  # SQLAlchemy 모델을 Pydantic 모델로 변환할 수 있게 해줍니다.

class LoginSchema(BaseModel):
    UserID: str
    PasswordHash: str = Field(..., alias="Password")

class pr_schema_SensingAlert(BaseModel):
    DeviceIdx: int
    SensingIdx: Optional[int] = None
    SensingType: str
    SensingValue: Optional[int] = None
    SensingDetails: Optional[str] = None
    SensedAt: Optional[datetime] = None
    AlertIdx: Optional[int] = None
    UserID: Optional[str] = None
    AlertType: Optional[str] = None
    ReceivedYN: Optional[bool] = True

    class Config:
        from_attributes = True

class forgot_Password(BaseModel):
    UserID : str
    Phone: str
    email : Optional[str] = None

class check_Password(BaseModel):
    UserID : str
    password : str
    password2 : str