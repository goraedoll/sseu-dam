const express = require('express');
const router = express.Router();
const db = require('../db/dbConnection');

// 모든 tasks를 가져오는 라우트 (GET 요청)
router.get('/tasks', (req, res) => {
  const query = 'SELECT * FROM todo_test'; // 할일 목록을 가져오는 SQL 쿼리
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json(results); // 결과를 JSON으로 반환
  });
});

// Task의 'completed' 상태를 업데이트하는 라우트 (PUT 요청)
router.put('/tasks/:id', (req, res) => {
  const taskId = req.params.id; // URL에서 task ID 가져오기
  const { completed } = req.body; // 요청 본문에서 'completed' 값 가져오기

  const query = 'UPDATE todo_test SET completed = ? WHERE id = ?';
  
  db.query(query, [completed, taskId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json({ success: true });
  });
});

module.exports = router;
