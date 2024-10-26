import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 useNavigate import
import notesIcon from "../../assets/notes.svg";
import moreIcon from "../../assets/more_horiz.svg";
import checkBoxChecked from "../../assets/check_box.svg";
import checkBoxUnchecked from "../../assets/check_box_outline_blank.svg";
import "./TodoList.css";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 사용

  // 서버에서 tasks 데이터를 가져옴
  useEffect(() => {
    fetch("http://localhost:3001/api/tasks")
      .then((response) => response.json())
      .then((data) => {
        // 가장 최근 8개의 데이터를 가져오기 위해 slice 사용
        const recentTasks = data.slice(-6); // 배열의 마지막 8개 요소 선택
        setTasks(recentTasks);
      })
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  // Task 완료 상태를 토글하는 함수
  const toggleTask = (id, completed) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !completed } : task
    );
    setTasks(updatedTasks);

    // 서버에 업데이트 요청 보내기
    fetch(`http://localhost:3001/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: !completed }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Task updated successfully:", data);
      })
      .catch((error) => {
        console.error("Error updating task:", error);
        setTasks(tasks); // 오류 발생 시 상태 롤백
      });
  };

  // 'more-options' 클릭 시 페이지 이동
  const goToAllTasks = () => {
    navigate("/all-tasks"); // 모든 할일 페이지로 이동
  };

  return (
    <div className="todo-list">
      <div className="todo-items">
        {/* Header 부분 */}
        <div className="todo-header">
          <div className="header-group">
            <img
              src={notesIcon}
              alt="오늘의 기록 아이콘"
              width="24"
              height="24"
              className="header-icon"
            />
            <h2>오늘의 기록</h2>
          </div>
          <div className="more-options" onClick={goToAllTasks}> {/* 클릭 이벤트 추가 */}
            <img
              src={moreIcon}
              alt="더보기 아이콘"
              width="24"
              height="24"
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>

        {/* 할일 목록 */}
        <ul>
          {tasks.map((task) => (
            <li key={task.id} className={task.completed ? "completed" : ""}>
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
              <span>{task.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
