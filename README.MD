cmd에서 ifconfig 해서 뜨는 IP -> en0 inet

.env( final 안에) 그리고 Back의 config.json

VITE_SERVER_IP 여기에 할당
CORS_Client_1 여기에 할당

터미널에 (base) gom@gom-ui-MacBookAir final_final % 여기까지만 있으면
source venv/bin/activate # 가상환경 접속

#pip install -r requirements.txt (안해도되는데 혹시 초기화되거나 가상환경 날려야되면 )

cd Back (백폴더가서)
uvicorn main:app --host 192.168.20.110 --port 1252 --reload

(final 폴더 가서)
npm run dev -- --host 192.168.20.110
