from datetime import datetime
from typing import Optional
from pydantic import BaseModel

class patient_post(BaseModel):
    name: str
    address: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    class Config:
        from_attributes = True

class patient_update(BaseModel):
    id: int
    address: Optional[str] = None
    phone: Optional[str] = None
    HealthStatus: Optional[str] = None
    class Config:
        from_attributes = True