import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import notesIcon from "../../assets/icons/todo-note.svg";
import moreIcon from "../../assets/icons/todo-threedot.svg";
import checkBoxChecked from "../../assets/icons/todo-check.svg";
import checkBoxUnchecked from "../../assets/icons/todo-noncheck.svg";
import "./TodoList.css";

const TodoList = ({ selectedDate }) => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  // 서버에서 tasks 데이터를 가져옴
  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem("access_token");
      // console.log(selectedDate)
      const formatDate = (date) => {
        if (!date) return '';
        return date.format('YYYY-MM-DD');
      };

      try {
        
        const queryDate = encodeURIComponent(formatDate(selectedDate));
        const response = await fetch(`http://192.168.20.6:1252/to_do_list/?date=${queryDate}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }

        const data = await response.json();
        const sortedTasks = data.sort((a, b) => b.id - a.id);
        setTasks(sortedTasks.slice(0, 6)); // 최근 6개의 데이터만 가져오기
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [selectedDate]);

  // Task 완료 상태를 토글하는 함수
  const toggleTask = async (id, completed) => {
    const token = localStorage.getItem("access_token");

    // 임시로 상태 업데이트
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !completed } : task
    );
    setTasks(updatedTasks);

    // 서버에 업데이트 요청 보내기
    try {
      
      const response = await fetch("http://192.168.20.6:1252/to_do_list/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({id: id, completed: !completed }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Task updated successfully:", data);
    } catch (error) {
      console.error("Error updating task:", error);
      setTasks(tasks); // 오류 발생 시 상태 롤백
    }
  };

  // 'more-options' 클릭 시 페이지 이동
  const goToAllTasks = () => {
    navigate("/all-tasks");
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
          <div className="more-options" onClick={goToAllTasks}>
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