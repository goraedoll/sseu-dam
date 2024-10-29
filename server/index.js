const express = require('express');
const cors = require('cors');
const alertsRoute = require('./routes/alerts'); // 알림 라우트 가져오기
const tasksRoute = require('./routes/tasks'); // tasks 라우트 가져오기

const app = express();

// CORS 설정
const corsOptions = {
  origin: '*', // 모든 도메인 허용 (보안상 문제가 될 수 있으니 필요한 경우 특정 IP로 제한)
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // 허용할 HTTP 메서드
  credentials: true, // 쿠키 등을 포함할 경우 true로 설정
};
app.use(cors(corsOptions));

app.use(express.json());

// 알림 API 라우트 사용
app.use('/', alertsRoute); // 알림 라우트 (전체 알림과 최신 알림을 포함)
app.use('/api', tasksRoute); // tasks 관련 API

// 서버 포트 설정
const port = 3001;
app.listen(port, '0.0.0.0', () => { // 모든 네트워크 인터페이스에서 요청 수신
  console.log(`서버가 http://0.0.0.0:${port} 에서 실행 중입니다.`);
});
