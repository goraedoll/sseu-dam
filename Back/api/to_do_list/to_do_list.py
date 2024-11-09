from fastapi import APIRouter, Depends, HTTPException, Query
from fastapi import Request
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from ORM import ORM_to_do
from schema import to_do_schema
from db_session.db_session import get_db
from sqlalchemy import func
from datetime import datetime
from jwt_jp.jwt_jp import verify_jwt_token

router = APIRouter()

orm = ORM_to_do.to_do_orm

# 삽입
@router.post("/", tags=["to_do_list"])
def send_to_do(todo_schema : to_do_schema.to_do_schema,  db:Session=Depends(get_db), user_id : str = Depends(verify_jwt_token)):
    try:
        if not db.query(orm).filter(orm.UserID == user_id):
            HTTPException(status_code=403, detail="인증되지 않음.")

        id_increament = db.query(func.max(orm.id)).scalar()
        max_id = (id_increament + 1)

        db_user = orm(id=max_id,
                            UserID = user_id,
                            task_description = todo_schema.task_description,
                            completed = todo_schema.completed,
                            created_at = todo_schema.created_at
                            )
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return {"message" : "수신 완료"}
    except HTTPException as e:
        # HTTPException을 그대로 전달
        raise e
    
    except SQLAlchemyError as e:
        # 데이터베이스 관련 오류 처리
        db.rollback()
        raise HTTPException(status_code=500, detail="데이터베이스 오류 발생")
    
    except Exception as e:
        # 기타 예외 처리
        raise HTTPException(status_code=500, detail=f"예상치 못한 오류 발생: {str(e)}")


# 업데이트
@router.put("/", tags=["to_do_list"])
def update_todo(
    todo_update: to_do_schema.update_to_do_schema,
    db: Session = Depends(get_db),
    user_id : str = Depends(verify_jwt_token)
):
    # 해당 투두 항목 조회
    todo_item = db.query(orm).filter(orm.UserID == user_id,orm.id == todo_update.id).first()
    if not todo_item:
        raise HTTPException(status_code=404, detail="투두 항목을 찾을 수 없습니다.")

    # 수정할 필드만 업데이트
    update_data = todo_update.model_dump(exclude_unset=True)
    print("Update Data:", update_data)
    for key, value in update_data.items():
        setattr(todo_item, key, value)
    try:
        db.commit()
        db.refresh(todo_item)
        print("Database update successful")  # 커밋 성공 로그
    except Exception as e:
        db.rollback()
        print("Commit Error:", e)  # 커밋 오류 확인
        raise HTTPException(status_code=500, detail="데이터베이스 업데이트 실패")

    return {"message": "수정 완료"}



    
@router.get("/", tags=["to_do_list"])
def get_to_do(date: str =Query(...),db: Session = Depends(get_db),user_id : str = Depends(verify_jwt_token)):
    user_date = datetime.strptime(date, "%Y-%m-%d").date()
    try:
        user_tasks = db.query(orm).filter(orm.UserID == user_id).filter(func.date(orm.created_at)==user_date).order_by(orm.created_at.desc()).all()  # 5개만 반환
        return [
            {
                "text": task.task_description,
                "completed": task.completed,
                "id": task.id
            }
            for task in user_tasks
        ]
    except HTTPException as e:
        # HTTPException 발생 시 그대로 반환
        raise e

    except SQLAlchemyError:
        # 데이터베이스 오류 발생 시 롤백하고 오류 메시지 반환
        db.rollback()
        raise HTTPException(status_code=500, detail="데이터베이스 오류 발생")

    except Exception as e:
        # 기타 예상치 못한 오류 처리
        raise HTTPException(status_code=500, detail=f"예상치 못한 오류 발생: {str(e)}")

#삭제
@router.delete("/", tags=["to_do_list"])
def delete_todo(
    todo_id: to_do_schema.DeleteToDoSchema,
    db: Session = Depends(get_db),
    user_id : str = Depends(verify_jwt_token)
):
    # 해당 투두 항목 조회
    todo_item = db.query(orm).filter(orm.UserID == user_id, orm.id == todo_id.id).first()
    if not todo_item:
        raise HTTPException(status_code=404, detail="투두 항목을 찾을 수 없습니다.")

    # 항목 삭제
    db.delete(todo_item)
    try:
        db.commit()
        print(f"Deleted Todo Item with ID {todo_id}")  # 삭제 로그
    except Exception as e:
        db.rollback()
        print("Delete Error:", e)  # 삭제 오류 확인
        raise HTTPException(status_code=500, detail="데이터베이스에서 항목 삭제 실패")

    return {"message": "삭제 완료"}

#모든 할 일 조회
@router.get("/all", tags=["to_do_list"])
def get_all_todo(user_id : str = Depends(verify_jwt_token) ,db: Session = Depends(get_db)):
    todo_all = db.query(orm).filter(orm.UserID == user_id).all()
    return [ {
        "id": data.id,
        "text": data.task_description,
        "completed":data.completed,
        "createdAt": data.created_at
    } for data in todo_all ]