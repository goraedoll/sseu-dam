from fastapi import APIRouter, UploadFile, File
from fastapi.responses import StreamingResponse
import cv2
import numpy as np
import time

router = APIRouter()

@router.post("/upload")
async def upload_image(image: UploadFile = File(...)):  # UploadFile : 파일 업로드를 위해 사용 (FastAPI 특)
    global latest_frame
    #전
    # 이미지를 읽어 numpy 배열로 변환
    img_bytes = await image.read()
    #전송받은 바이트 데이터를 Numpy배열로 변환
    np_arr = np.frombuffer(img_bytes, np.uint8)
    #인코딩
    frame = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
    # 최신 프레임 저장
    latest_frame = frame
    return {"message": "Image received"}



def generate_frames():
    global latest_frame
    while True:
        if latest_frame is not None:
            # 프레임을 JPEG로 인코딩
            _, buffer = cv2.imencode('.jpg', latest_frame)
            frame = buffer.tobytes()
            # 프레임 반환

            # 이 타입을 멀티파트라고 하는데 파일 업로딩에 쓰이는 건데 FastAPI 에선
            # 파일 업로드 다룰 떄 이런식으로 처리한다고 하네요.
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
        else:
            # 최신 프레임이 없을 때 잠시 대기 (33ms) ####30fps 겨냥.
            time.sleep(0.033)

@router.get("/video_feed")
async def video_feed():
    # 비디오 스트림을 반환
    return StreamingResponse(generate_frames(),
                             media_type='multipart/x-mixed-replace; boundary=frame')