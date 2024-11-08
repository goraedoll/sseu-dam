const express = require("express");
const cors = require("cors");
const alertsRoute = require("./routes/alerts");
const tasksRoute = require("./routes/tasks");

const app = express();
app.use(cors());
app.use(express.json());

// 알림 및 할일 라우트 사용
app.use("/", alertsRoute);
app.use("/api", tasksRoute);

// 서버 포트 설정
const port = 3001;
app.listen(port, "0.0.0.0", () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
