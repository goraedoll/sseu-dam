cmd에서 ifconfig 해서 뜨는 IP -> en0 inet

.env( final 안에) 그리고 Back의 config.json

VITE_SERVER_IP 여기에 할당
CORS_Client_1 여기에 할당

cd Back (백폴더가서)
uvicorn main:app --host 192.168.20.83 --port 1252 --reload

(final 폴더 가서)
npm run dev -- --host 192.168.20.83
