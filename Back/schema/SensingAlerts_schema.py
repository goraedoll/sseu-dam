from pydantic import BaseModel, field_validator
from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

class SensingAlertsSchema(BaseModel):
    UserID : str = Field(...,description="유저 아이디")
    DeviceIdx: int = Field(..., description="장치 인덱스")
    SensingIdx: int = Field(..., description="센싱 인덱스 (카메라 등)")
    # SensingType: str = Field(..., max_length=20, description="센싱 타입 (낙상, 욕창 등)")
    # SensingDetails: str = Field(..., max_length=255, description="센싱 상세 내용 (예: 낙상이 발생했습니다.)")
    AlertType: str = Field(..., max_length=20, description="알림 종류 (실시간 알림, 설정 표시란)")

    class Config:
        from_attributes = True

# SensigAlertDetails_Schema
class SensingALertsDetails_Schema(BaseModel):

    AlertType: str = Field(..., max_length=20, description="알림 종류 (실시간 알림, 설정 표시란)")
    UserID: str = Field(..., max_length=50, description="유저 아이디")
    SensingDetails: str = Field(..., max_length=255, description="센싱 상세 내용 (예: 낙상이 발생했습니다.)")
    SensedAt : Optional[datetime] = None

    class Config:
        from_attributes = True