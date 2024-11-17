import React, { useEffect, useState } from "react";
import checkBoxChecked from "../../assets/icons/alltask-check.svg";
import checkBoxUnchecked from "../../assets/icons/todo-noncheck.svg";
import correctionIcon from "../../assets/icons/alltask-correction.svg"; // 수정 및 저장 아이콘
import deleteIcon from "../../assets/icons/alltask-delete.svg"; // 삭제 아이콘
import "./AllTasks.css";

const serverip = import.meta.env.VITE_SERVER_IP;
const BASE_URL = `http://${serverip}:1252`;

const AllTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [editMode, setEditMode] = useState(null);
  const [editText, setEditText] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false); // 팝업 창 상태
  const tasksPerPage = 9;

  const fetchTasks = async () => {
    const token = localStorage.getItem("access_token");

    try {
      const response = await fetch(`${BASE_URL}/to_do_list/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }

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

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const toggleTask = async (id, completed) => {
    const token = localStorage.getItem("access_token");

    try {
      await fetch(`${BASE_URL}/to_do_list/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id: id, completed: !completed }),
      });
      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const openEditPopup = (id, text) => {
    setEditMode(id);
    setEditText(text);
    setIsPopupOpen(true); // 팝업 창 열기
  };

  const closeEditPopup = () => {
    setEditMode(null);
    setEditText("");
    setIsPopupOpen(false); // 팝업 창 닫기
  };

  const editTask = async () => {
    const token = localStorage.getItem("access_token");

    try {
      await fetch(`${BASE_URL}/to_do_list/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id: editMode, task_description: editText }),
      });
      closeEditPopup();
      fetchTasks();
    } catch (error) {
      console.error("Error editing task:", error);
    }
  };

  const deleteTask = async (id) => {
    const token = localStorage.getItem("access_token");

    try {
      await fetch(`${BASE_URL}/to_do_list/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id }),
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
      <h1 className="alltasks-container-title">전체 할일</h1>
      <button className="alltasks-button" onClick={() => setIsAddTaskOpen(true)}>
        +
      </button>
      <table className="tasks-table">
        <thead>
          <tr>
            <th className="alltasks-column-id">#</th>
            <th className="alltasks-column-text">내용</th>
            <th className="alltasks-column-completed">완료</th>
            <th className="alltasks-column-date">작성일</th>
            <th className="alltasks-column-tools">도구</th>
          </tr>
        </thead>
        <tbody className="tasks-tbody">
          {currentTasks.map((task) => (
            <tr
              key={task.id}
              className={`task-item ${task.completed ? "completed" : ""}`}
            >
              <td className="row-id">{task.id}</td>
              <td className="row-text">{task.text}</td>
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
                  <img
                    src={correctionIcon}
                    alt="수정"
                    onClick={() => openEditPopup(task.id, task.text)}
                    className="tool-icon"
                  />
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

      {/* Pagination 바로 테이블 아래에 위치 */}
      <div className="pagination tasks-pagination">
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
      {/* 수정 팝업 창 */}
      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>할일 수정</h3>
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              placeholder="새 텍스트 입력"
              className="my-custom-modal-input"
            />
            <div className="my-custom-modal-buttons">
              {" "}
              {/* 수정된 버튼 컨테이너 클래스 */}
              <button
                onClick={editTask}
                className="my-custom-modal-button my-custom-save-button"
              >
                저장
              </button>
              <button
                onClick={closeEditPopup}
                className="my-custom-modal-button my-custom-cancel-button"
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllTasks;
