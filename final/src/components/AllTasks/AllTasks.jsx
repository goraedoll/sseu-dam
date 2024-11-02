import React, { useEffect, useState, useCallback, useMemo } from "react";
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [newTask, setNewTask] = useState("");
  const tasksPerPage = 9;

  const fetchTasks = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const addTask = async () => {
    if (newTask.trim() === "") return;

    try {
      const response = await fetch("http://localhost:3001/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: newTask }),
      });
      if (!response.ok) throw new Error("할일 추가 실패");
      setNewTask("");
      setShowAddTaskModal(false);
      fetchTasks();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

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

  const startEditing = (id, text) => {
    setEditMode(id);
    setEditText(text);
  };

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

  const deleteTask = async (id) => {
    try {
      await fetch(`http://localhost:3001/api/tasks/${id}`, { method: "DELETE" });
      setDeleteConfirm(null);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(tasks.length / tasksPerPage);

  const paginationButtons = useMemo(() => {
    return Array.from({ length: totalPages }, (_, index) => (
      <button
        key={index + 1}
        onClick={() => setCurrentPage(index + 1)}
        className={currentPage === index + 1 ? "active" : ""}
      >
        {index + 1}
      </button>
    ));
  }, [totalPages, currentPage]);

  return (
    <div className="alltasks-container">
      <div className="alltasks-header">
        <h1 className="alltasks-container-title">할일 목록</h1>
        <button onClick={() => setShowAddTaskModal(true)} className="add-task-button">할일 추가</button>
      </div>

      {loading && <p>로딩 중...</p>}
      {error && <p className="error-message">{error}</p>}

      {!loading && !error && (
        <>
          <table className="tasks-table">
            <thead>
              <tr>
                <th className="tasks-table-head-id">#</th>
                <th className="tasks-table-head-text">내용</th>
                <th className="tasks-table-head-complete">완료</th>
                <th className="tasks-table-head-date">작성일</th>
                <th className="tasks-table-head-tools">도구</th>
              </tr>
            </thead>
            <tbody>
              {currentTasks.map((task) => (
                <tr key={task.id} className={`task-item ${task.completed ? "completed" : ""}`}>
                  <td className="tasks-table-body-id">{task.id}</td>
                  <td className="tasks-table-body-text">
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
                  <td className="tasks-table-body-complete" onClick={() => toggleTask(task.id, task.completed)}>
                    <img src={task.completed ? checkBoxChecked : checkBoxUnchecked} alt="완료 상태" />
                  </td>
                  <td className="tasks-table-body-date">{new Date(task.CreatedAt).toLocaleDateString()}</td>
                  <td className="tasks-table-body-tools tool-icons">
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

          <div className="pagination">
            {paginationButtons}
          </div>

          {deleteConfirm && (
            <div className="modal-overlay">
              <div className="delete-confirm">
                <p>정말 삭제하시겠습니까?</p>
                <div className="confirm-buttons">
                  <button onClick={() => deleteTask(deleteConfirm)} className="confirm-button">확인</button>
                  <button onClick={() => setDeleteConfirm(null)} className="cancel-button">취소</button>
                </div>
              </div>
            </div>
          )}

          {showAddTaskModal && (
            <div className="modal-overlay">
              <div className="add-task-modal">
                <h2>새로운 할일 추가</h2>
                <input
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  placeholder="할일을 입력하세요"
                />
                <div className="confirm-buttons">
                  <button onClick={addTask} className="confirm-button">추가</button>
                  <button onClick={() => setShowAddTaskModal(false)} className="cancel-button">취소</button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AllTasks;
