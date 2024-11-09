from typing import Union, List
from pydantic import BaseModel

class MedicationChecked(BaseModel):
    id: int
    checked: Union[bool, List[bool]]
