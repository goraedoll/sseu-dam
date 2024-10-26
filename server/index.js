const express = require('express');
const cors = require('cors');
const alertsRoute = require('./routes/alerts'); // 알림 라우트 가져오기
const tasksRoute = require('./routes/tasks'); // tasks 라우트 가져오기 (오타 수정)

const app = express();
app.use(cors());
app.use(express.json());

// 알림 API 라우트 사용
app.use('/', alertsRoute);
app.use('/api', tasksRoute); // 오타 수정

// 서버 포트 설정
const port = 3001;
app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
