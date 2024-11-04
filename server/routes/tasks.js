const express = require('express');
const router = express.Router();
const db = require('../db/dbConnection');

// 모든 tasks를 최신 순으로 가져오는 라우트 (GET 요청)
router.get('/tasks', (req, res) => {
  const query = 'SELECT * FROM todo_test ORDER BY CreatedAt DESC'; // 최신 순으로 정렬
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json(results); // 결과를 JSON으로 반환
  });
});

// 새로운 Task를 추가하는 라우트 (POST 요청)
router.post('/tasks', (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "할일 내용을 입력해주세요." });
  }

  const query = 'INSERT INTO todo_test (text, completed, CreatedAt) VALUES (?, 0, NOW())';
  db.query(query, [text], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.status(201).json({ success: true, id: result.insertId });
  });
});

// Task의 'completed' 상태를 업데이트하는 라우트 (PUT 요청)
router.put('/tasks/:id/completed', (req, res) => {
  const taskId = req.params.id;
  const { completed } = req.body;

  const query = 'UPDATE todo_test SET completed = ? WHERE id = ?';
  db.query(query, [completed, taskId], (err) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json({ success: true });
  });
});

// Task의 'text'를 업데이트하는 라우트 (PUT 요청)
router.put('/tasks/:id/text', (req, res) => {
  const taskId = req.params.id;
  const { text } = req.body;

  const query = 'UPDATE todo_test SET text = ? WHERE id = ?';
  db.query(query, [text, taskId], (err) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json({ success: true });
  });
});

// Task를 삭제하는 라우트 (DELETE 요청)
router.delete('/tasks/:id', (req, res) => {
  const taskId = req.params.id;

  const query = 'DELETE FROM todo_test WHERE id = ?';
  db.query(query, [taskId], (err) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json({ success: true });
  });
});

module.exports = router;
