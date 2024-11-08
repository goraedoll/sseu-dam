const express = require("express");
const router = express.Router();
const db = require("../db/dbConnection"); // DB 연결 가져오기

// 전체 알림 메시지 가져오기
router.get("/alerts", (req, res) => {
  const query = "SELECT * FROM alerts_test";
  db.query(query, (err, results) => {
    if (err) {
      console.error("데이터 가져오기 실패:", err);
      res.status(500).send("데이터베이스 오류");
      return;
    }
    res.json(results);
  });
});

// 최신 알림 메시지 가져오기
router.get("/latest-alert", (req, res) => {
  const query = "SELECT * FROM alerts_test ORDER BY id DESC LIMIT 1"; // 최신 데이터를 가져오는 쿼리
  db.query(query, (err, results) => {
    if (err) {
      console.error("데이터 가져오기 실패:", err);
      res.status(500).send("데이터베이스 오류");
      return;
    }
    res.json(results[0]); // 가장 최신 데이터만 반환
  });
});

module.exports = router;
