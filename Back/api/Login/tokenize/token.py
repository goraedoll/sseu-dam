from fastapi import HTTPException, Depends, APIRouter
import token_modules as tm

router = APIRouter()

@router.get('/token')
def generate_token(username: str):
    return {"token" : tm.create_jwt({"username": username})}    

from fastapi import Header
@router.get('/protect')
def protect(toekn: str = Header(None)):
    if not toekn :
        raise HTTPException(status_code=400, detail="asdfasdfkljasd fals dfa")
    tm.verify_jwt_token(token=toekn)
    return {"message": "This is a protected root"}
