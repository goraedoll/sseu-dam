from fastapi.middleware.cors import CORSMiddleware
from ipconfig import client_ip

def cors_middleware(app):
    # CORS 주소 = 클라이언트 주소
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[client_ip],  # 요청을 허용할 출처(origin)
        allow_credentials=True,
        allow_methods=["*"],  # 모든 HTTP 메서드 허용 (GET, POST, PUT 등)
        allow_headers=["*"],  # 모든 헤더 허용
    )