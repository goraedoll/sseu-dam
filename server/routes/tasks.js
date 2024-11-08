const express = require("express");
const router = express.Router();
const db = require("../db/dbConnection"); // DB 연결 가져오기

// 전체 할일 목록 가져오기
router.get("/to_do_list/all", (req, res) => {
  const query = "SELECT * FROM tb_todolist";
  db.query(query, (err, results) => {
    if (err) {
      console.error("데이터 가져오기 실패:", err);
      res.status(500).send("데이터베이스 오류");
      return;
    }
    res.json(results);
  });
});

// 할일 완료 상태 토글
router.put("/to_do_list/toggle", (req, res) => {
  const { id, completed } = req.body;
  const query = "UPDATE tb_todolist SET completed = ? WHERE id = ?";
  db.query(query, [completed, id], (err, results) => {
    if (err) {
      console.error("업데이트 실패:", err);
      res.status(500).send("데이터베이스 오류");
      return;
    }
    res.json({ message: "Task updated successfully" });
  });
});

// 할일 수정
router.put("/to_do_list/edit", (req, res) => {
  const { id, task_description } = req.body;
  const query = "UPDATE tb_todolist SET task_description = ? WHERE id = ?";
  db.query(query, [task_description, id], (err, results) => {
    if (err) {
      console.error("수정 실패:", err);
      res.status(500).send("데이터베이스 오류");
      return;
    }
    res.json({ message: "Task updated successfully" });
  });
});

// 할일 삭제
router.delete("/to_do_list/delete/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM tb_todolist WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("삭제 실패:", err);
      res.status(500).send("데이터베이스 오류");
      return;
    }
    res.json({ message: "Task deleted successfully" });
  });
});

module.exports = router;
