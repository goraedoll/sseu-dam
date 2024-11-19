// AllTasks.jsx

import React, { useEffect, useState } from "react";
import checkBoxChecked from "../../assets/icons/alltask-check.svg";
import checkBoxUnchecked from "../../assets/icons/todo-noncheck.svg";
import correctionIcon from "../../assets/icons/alltask-correction.svg";
import deleteIcon from "../../assets/icons/alltask-delete.svg";
import CusAdd from "../../assets/icons/cus-add.svg";
import "./AllTasks.css";

const serverip = import.meta.env.VITE_SERVER_IP;
const BASE_URL = `http://${serverip}:1252`;

const AllTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [editMode, setEditMode] = useState(null);
  const [editText, setEditText] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(null); // 삭제 확인 모달 상태
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [newTaskText, setNewTaskText] = useState(""); // 새 할 일 텍스트
  const tasksPerPage = 9;

  // 할 일 목록 가져오기
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

  // 새 할 일 추가
  const addTask = async () => {
    const token = localStorage.getItem("access_token");

    const newTask = {
      task_description: newTaskText,
      completed: false,
      created_at: new Date().toISOString(),
    };

    try {
      const response = await fetch(`${BASE_URL}/to_do_list/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "새 할 일 추가 실패");
      }

      const result = await response.json();
      alert(result.message);
      closeAddPopup();
      fetchTasks();
    } catch (error) {
      console.error("Error adding task:", error);
      alert("할 일 추가 중 오류 발생");
    }
  };

  // 할 일 완료 상태 토글
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

  // 수정 팝업 열기
  const openEditPopup = (id, text) => {
    setEditMode(id);
    setEditText(text);
    setIsPopupOpen(true);
  };

  // 수정 팝업 닫기
  const closeEditPopup = () => {
    setEditMode(null);
    setEditText("");
    setIsPopupOpen(false);
  };

  // 할 일 수정
  const editTask = async () => {
    const token = localStorage.getItem("access_token");

    try {
      const response = await fetch(`${BASE_URL}/to_do_list/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id: editMode, task_description: editText }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "할 일 수정 실패");
      }

      const result = await response.json();
      alert(result.message);
      closeEditPopup();
      fetchTasks();
    } catch (error) {
      console.error("Error editing task:", error);
      alert("할 일 수정 중 오류 발생");
    }
  };

  // 삭제 확인 모달 열기
  const openDeleteConfirm = (id) => setDeleteConfirm(id);

  // 삭제 확인 모달 닫기
  const closeDeleteConfirm = () => setDeleteConfirm(null);

  // 할 일 삭제
  const deleteTask = async () => {
    const token = localStorage.getItem("access_token");

    try {
      const response = await fetch(`${BASE_URL}/to_do_list/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id: deleteConfirm }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "할 일 삭제 실패");
      }

      const result = await response.json();
      alert(result.message);
      closeDeleteConfirm();
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("할 일 삭제 중 오류 발생");
    }
  };

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  // 모달창 열기/닫기
  const openAddPopup = () => setIsAddPopupOpen(true);
  const closeAddPopup = () => {
    setIsAddPopupOpen(false);
    setNewTaskText("");
  };

  const totalPages = Math.ceil(tasks.length / tasksPerPage);
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  return (
    <div className="alltasks-container">
      <div className="alltasks-header">
        <h2 className="alltasks-container-title">전체 할일</h2>
        <button className="alltasks-button" onClick={openAddPopup}>
          <img src={CusAdd} alt="Add Task" />
        </button>
      </div>
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
        <tbody>
          {currentTasks.map((task) => (
            <tr key={task.id}>
              <td className="alltasks-column-id">{task.id}</td>
              <td className="alltasks-column-text">{task.text}</td>
              <td className="alltasks-column-completed">
                <img
                  src={task.completed ? checkBoxChecked : checkBoxUnchecked}
                  onClick={() => toggleTask(task.id, task.completed)}
                  alt="Toggle Task"
                />
              </td>
              <td className="alltasks-column-date">
                {new Date(task.createdAt).toLocaleDateString()}
              </td>
              <td className="alltasks-column-tools">
                <img
                  src={correctionIcon}
                  onClick={() => openEditPopup(task.id, task.text)}
                  alt="Edit"
                />
                <img
                  src={deleteIcon}
                  onClick={() => openDeleteConfirm(task.id)}
                  alt="Delete"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={currentPage === index + 1 ? "active" : ""}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* 추가 모달창 */}
      {isAddPopupOpen && (
        <div className="my-custom-modal-overlay">
          <div className="my-custom-modal">
            <h3>새 할 일 추가</h3>
            <input
              type="text"
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              placeholder="할 일 입력"
            />
            <div>
              <button onClick={addTask}>추가</button>
              <button onClick={closeAddPopup}>취소</button>
            </div>
          </div>
        </div>
      )}

      {/* 삭제 확인 모달창 */}
      {deleteConfirm && (
        <div className="my-custom-modal-overlay">
          <div className="my-custom-modal">
            <h3>정말 삭제하시겠습니까?</h3>
            <div>
              <button onClick={deleteTask}>삭제</button>
              <button onClick={closeDeleteConfirm}>취소</button>
            </div>
          </div>
        </div>
      )}

      {/* 수정 모달창 */}
      {isPopupOpen && (
        <div className="my-custom-modal-overlay">
          <div className="my-custom-modal">
            <h3>할 일 수정</h3>
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              placeholder="할 일 입력"
            />
            <div>
              <button onClick={editTask}>수정</button>
              <button onClick={closeEditPopup}>취소</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllTasks;
