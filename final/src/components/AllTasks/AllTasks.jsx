import React, { useEffect, useState } from "react";
import checkBoxChecked from "../../../assets/check_box.svg";
import checkBoxUnchecked from "../../../assets/check_box_outline_blank.svg";
import correctionIcon from "../../../assets/AllTasks/correctionIcon.svg"; // 수정 및 저장 아이콘
import deleteIcon from "../../../assets/AllTasks/deleteIcon.svg"; // 삭제 아이콘
import './AllTasks.css';

const AllTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [editMode, setEditMode] = useState(null); // 현재 수정 중인 항목의 ID
  const [editText, setEditText] = useState(''); // 수정할 텍스트 저장
  const [deleteConfirm, setDeleteConfirm] = useState(null); // 삭제 확인 모달 상태
  const tasksPerPage = 9;

  const fetchTasks = () => {
    fetch("http://localhost:3001/api/tasks")
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Error fetching tasks:", error));
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
      setEditText('');
      fetchTasks();
    } catch (error) {
      console.error("Error editing task:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await fetch(`http://localhost:3001/api/tasks/${id}`, {
        method: "DELETE",
      });
      setDeleteConfirm(null); // 삭제 확인 모달 닫기
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
            <tr key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
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
                  task.text
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
              <td className="row-date">{new Date(task.CreatedAt).toLocaleDateString()}</td>
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
                      onClick={() => startEditing(task.id, task.text)}
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
            className={currentPage === index + 1 ? 'active' : ''}
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
