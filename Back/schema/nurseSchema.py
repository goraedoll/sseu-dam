from datetime import datetime
from typing import Optional, List, Union
from pydantic import BaseModel

class MedicationChecked(BaseModel):
    id : int
    checked: Union[bool, List[bool]]

