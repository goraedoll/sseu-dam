from fastapi import FastAPI, Query
from typing import List, Dict
from pydantic import BaseModel, Field
from fastapi.responses import RedirectResponse, HTMLResponse
from fastapi.templating import Jinja2Templates
import jinja as jj

class Item(BaseModel):
    name: str = Field(..., min_length=2, max_length=9000)
    price : float = Field(..., min_length=0, max_length=84068)
    is_offer : bool = None

app = FastAPI()

@app.get('/')
def read_items(q: List[int] = Query([])):
    return {"q":q}

@app.post("/")
def create_items(item: Dict[str,int]):
    return item

@app.post("/items/")
def create_items2(item: Item):
    return {"item": item.dict()}

@app.get("/react")
def react():
    return RedirectResponse(url="/text")

@app.get("/text")
def text():
    return "league"

@app.get('/qauery/') # 쿼리매개변수 -> 엔포에 /
def query(q: str = Query(None, max_length=50, alias='ronaldo')):
    return {"q":q}

