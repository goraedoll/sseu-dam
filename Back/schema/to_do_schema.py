from pydantic import BaseModel, ConfigDict, Field
from datetime import datetime
from typing import Optional
import datetime

class to_do_schema(BaseModel):
    task_description: str
    completed : bool
    created_at : Optional[datetime.datetime] = None
    class Config:
        from_attributes = True  # SQLAlchemy 모델을 Pydantic 모델로 변환할 수 있게 해줍니다.

class update_to_do_schema(BaseModel):
    id : Optional[int] = None
    task_description: Optional[str] = None
    completed : Optional[bool] = None
    class Config:
        from_attributes = True  # SQLAlchemy 모델을 Pydantic 모델로 변환할 수 있게 해줍니다.

class DeleteToDoSchema(BaseModel):
    id: int

class getAlltodoSchema(BaseModel):
    id: int
    text: str
    completed: bool
    createdAt: datetime.datetime