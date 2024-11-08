import React, { useEffect, useState } from "react";
import checkBoxChecked from "../../assets/icons/alltask-check.svg";
import checkBoxUnchecked from "../../assets/icons/todo-noncheck.svg";
import correctionIcon from "../../assets/icons/alltask-correction.svg";
import deleteIcon from "../../assets/icons/alltask-delete.svg";
import "./AllTasks.css";

const BASE_URL = "localhost:3001/api";

const AllTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [editMode, setEditMode] = useState(null);
  const [editText, setEditText] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const tasksPerPage = 9;

  // 할일 데이터 가져오기
  const fetchTasks = async () => {
    const token = localStorage.getItem("access_token");

    try {
      const response = await fetch(`${BASE_URL}/to_do_list/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch tasks");

      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  // 할일 완료 상태 토글
  const toggleTask = async (id, completed) => {
    const token = localStorage.getItem("access_token");

    try {
      await fetch(`${BASE_URL}/to_do_list/toggle`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id, completed: !completed }),
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

  // 할일 수정
  const editTask = async (id) => {
    const token = localStorage.getItem("access_token");

    try {
      await fetch(`${BASE_URL}/to_do_list/edit`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id, task_description: editText }),
      });
      setEditMode(null);
      setEditText("");
      fetchTasks();
    } catch (error) {
      console.error("Error editing task:", error);
    }
  };

  // 할일 삭제
  const deleteTask = async (id) => {
    const token = localStorage.getItem("access_token");

    try {
      await fetch(`${BASE_URL}/to_do_list/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDeleteConfirm(null);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const totalPages = Math.ceil(tasks.length / tasksPerPage);

  return (
    <div className="alltasks-container">
      <h1 className="alltasks-container-title">할일 목록</h1>
      <table className="tasks-table">
        <thead>
          <tr>
            <th className="column-id">#</th>
            <th className="column-text">내용</th>
            <th className="column-completed">완료</th>
            <th className="column-date">작성일</th>
            <th className="column-tools">도구</th>
          </tr>
        </thead>
        <tbody className="tasks-tbody">
          {currentTasks.map((task) => (
            <tr
              key={task.id}
              className={`task-item ${task.completed ? "completed" : ""}`}
            >
              <td className="row-id">{task.id}</td>
              <td className="row-text">
                {editMode === task.id ? (
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    placeholder="새 텍스트 입력"
                    className="edit-input"
                  />
                ) : (
                  task.task_description
                )}
              </td>
              <td className="row-completed">
                <div
                  className="checkbox-icon"
                  onClick={() => toggleTask(task.id, task.completed)}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={task.completed ? checkBoxChecked : checkBoxUnchecked}
                    alt={task.completed ? "Checked" : "Unchecked"}
                    width="24"
                    height="24"
                  />
                </div>
              </td>
              <td className="row-date">
                {new Date(task.createdAt).toLocaleDateString()}
              </td>
              <td className="row-tools">
                <div className="tool-icons">
                  {editMode === task.id ? (
                    <img
                      src={correctionIcon}
                      alt="저장"
                      onClick={() => editTask(task.id)}
                      className="tool-icon"
                    />
                  ) : (
                    <img
                      src={correctionIcon}
                      alt="수정"
                      onClick={() =>
                        startEditing(task.id, task.task_description)
                      }
                      className="tool-icon"
                    />
                  )}
                  <img
                    src={deleteIcon}
                    alt="삭제"
                    onClick={() => setDeleteConfirm(task.id)}
                    className="tool-icon"
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {deleteConfirm && (
        <div className="delete-confirm">
          <p>정말 삭제하시겠습니까?</p>
          <div className="confirm-buttons">
            <button
              onClick={() => deleteTask(deleteConfirm)}
              className="confirm-button"
            >
              확인
            </button>
            <button
              onClick={() => setDeleteConfirm(null)}
              className="cancel-button"
            >
              취소
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllTasks;
