from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Date, TIMESTAMP, DateTime, Boolean, Text
from sqlalchemy.sql import func

base = declarative_base()

class to_do_orm(base) :
    __tablename__ = "tb_todolist"

    id = Column(Integer, primary_key= True)
    UserID = Column(String, nullable = False)
    task_description = Column(String)
    completed = Column(Boolean)
    created_at = Column(DateTime, server_default=func.now())

    