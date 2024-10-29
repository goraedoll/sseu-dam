import React, { useEffect, useState } from "react";
import checkBoxChecked from "../../../assets/check_box.svg";
import checkBoxUnchecked from "../../../assets/check_box_outline_blank.svg";
import './AllTasks.css';

const AllTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 9;

  // DB에서 tasks를 불러오는 함수
  const fetchTasks = () => {
    fetch("http://localhost:3001/api/tasks")
      .then((response) => response.json())
      .then((data) => setTasks(data.reverse())) // 데이터 역순으로 정렬
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
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !completed } : task
    );
    setTasks(updatedTasks);

    try {
      const response = await fetch(`http://localhost:3001/api/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: !completed }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      console.log("Task updated successfully");
      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
      setTasks(tasks);
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
          </tr>
        </thead>
        <tbody className="tasks-tbody">
          {currentTasks.map((task) => (
            <tr key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
              <td className="row-id">{task.id}</td> {/* 데이터베이스의 고유 ID 표시 */}
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
              <td className="row-date">{new Date(task.CreatedAt).toLocaleDateString()}</td>
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
    </div>
  );
};

export default AllTasks;
