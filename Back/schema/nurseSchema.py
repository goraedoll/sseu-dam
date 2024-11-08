from datetime import datetime
from typing import Optional, List, Union
from pydantic import BaseModel

class MedicationChecked(BaseModel):
    checked: Union[bool, List[bool]]

class MedicationsCheckedList(BaseModel):
    medications: List[Union[bool, List[bool]]]