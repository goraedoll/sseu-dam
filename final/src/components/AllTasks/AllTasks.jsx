import React, { useEffect, useState } from "react";
import checkBoxChecked from "../../assets/icons/alltask-check.svg";
import checkBoxUnchecked from "../../assets/icons/todo-noncheck.svg";
import correctionIcon from "../../assets/icons/alltask-correction.svg";
import deleteIcon from "../../assets/icons/alltask-delete.svg";
import "./AllTasks.css";

const AllTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [editMode, setEditMode] = useState(null);
  const [editText, setEditText] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [loading, setLoading] = useState(false); // 로딩 상태 추가
  const [error, setError] = useState(null); // 에러 상태 추가
  const tasksPerPage = 9;

  // 데이터 가져오기 함수
  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:3001/api/tasks");
      if (!response.ok) throw new Error("데이터베이스 연결 실패");
      const data = await response.json();
      setTasks(data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setError("데이터를 불러오지 못했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // 완료 상태 토글 핸들러
  const toggleTask = async (id, completed) => {
    try {
      await fetch(`http://localhost:3001/api/tasks/${id}/completed`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !completed }),
      });
      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // 수정 모드 시작
  const startEditing = (id, text) => {
    setEditMode(id);
    setEditText(text);
  };

  // 할 일 텍스트 수정
  const editTask = async (id) => {
    try {
      await fetch(`http://localhost:3001/api/tasks/${id}/text`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: editText }),
      });
      setEditMode(null);
      setEditText("");
      fetchTasks();
    } catch (error) {
      console.error("Error editing task:", error);
    }
  };

  // 할 일 삭제
  const deleteTask = async (id) => {
    try {
      await fetch(`http://localhost:3001/api/tasks/${id}`, { method: "DELETE" });
      setDeleteConfirm(null);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // 페이지네이션 계산
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(tasks.length / tasksPerPage);

  // 페이지네이션 컴포넌트
  const Pagination = () => (
    <div className="pagination">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => setCurrentPage(index + 1)}
          className={currentPage === index + 1 ? "active" : ""}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );

  return (
    <div className="alltasks-container">
      <h1 className="alltasks-container-title">할일 목록</h1>

      {/* 로딩 및 에러 메시지 */}
      {loading && <p>로딩 중...</p>}
      {error && <p className="error-message">{error}</p>}

      {/* 할 일 테이블 */}
      {!loading && !error && (
        <>
          <table className="tasks-table">
            <thead>
              <tr>
                <th>#</th>
                <th>내용</th>
                <th>완료</th>
                <th>작성일</th>
                <th>도구</th>
              </tr>
            </thead>
            <tbody>
              {currentTasks.map((task) => (
                <tr key={task.id} className={`task-item ${task.completed ? "completed" : ""}`}>
                  <td>{task.id}</td>
                  <td>
                    {editMode === task.id ? (
                      <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="edit-input"
                      />
                    ) : (
                      task.text
                    )}
                  </td>
                  <td onClick={() => toggleTask(task.id, task.completed)} style={{ cursor: "pointer" }}>
                    <img
                      src={task.completed ? checkBoxChecked : checkBoxUnchecked}
                      alt={task.completed ? "Checked" : "Unchecked"}
                      width="24"
                      height="24"
                    />
                  </td>
                  <td>{new Date(task.CreatedAt).toLocaleDateString()}</td>
                  <td>
                    {editMode === task.id ? (
                      <img src={correctionIcon} alt="저장" onClick={() => editTask(task.id)} className="tool-icon" />
                    ) : (
                      <img src={correctionIcon} alt="수정" onClick={() => startEditing(task.id, task.text)} className="tool-icon" />
                    )}
                    <img src={deleteIcon} alt="삭제" onClick={() => setDeleteConfirm(task.id)} className="tool-icon" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Pagination />

          {deleteConfirm && (
            <div className="delete-confirm">
              <p>정말 삭제하시겠습니까?</p>
              <button onClick={() => deleteTask(deleteConfirm)} className="confirm-button">확인</button>
              <button onClick={() => setDeleteConfirm(null)} className="cancel-button">취소</button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AllTasks;
