from typing import Union, List, Optional, Dict
from datetime import date
from pydantic import BaseModel

class MedicationChecked(BaseModel):
    id: int
    checked: Union[bool, List[bool]]


class meal_check_schema(BaseModel):
    MealTime : str
    Status: bool


class BathroomUpdateSchema(BaseModel):         
    Urination: Dict[str, str]     
    Defecation: Dict[str, str]  

class water_update_schema(BaseModel):
    WaterIntake:  List[bool]

class remote_schema(BaseModel):
    date : date
    UserID : str
    id : int
    checked: bool