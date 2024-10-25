import React, { useState } from "react";
import notesIcon from "../../assets/notes.svg"; // notes 아이콘
import moreIcon from "../../assets/more_horiz.svg"; // 옵션 아이콘
import checkBoxChecked from "../../assets/check_box.svg"; // 체크된 체크박스
import checkBoxUnchecked from "../../assets/check_box_outline_blank.svg"; // 체크되지 않은 체크박스
import "./TodoList.css";

const TodoList = () => {
  // 할일 목록 상태
  const [tasks, setTasks] = useState([
    { id: 1, text: "오전 인사교 병원 방문", completed: false },
    { id: 2, text: "성인용 중형 기저귀 구매", completed: false },
    { id: 3, text: "오전 요양 보호사 방문", completed: false },
    { id: 4, text: "보험 연장 증빙서류 제출 준비", completed: true },
    { id: 5, text: "엘리스 원무과 진료비 수납", completed: true },
    { id: 6, text: "오전 요양 보호사 방문", completed: false },
  ]);

  // 체크박스 상태를 토글하는 함수
  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
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
          <div className="more-options">
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
                onClick={() => toggleTask(task.id)} // 클릭하면 체크 상태 변경
                style={{ cursor: "pointer" }}
              >
                {/* 체크 상태에 따라 이미지 변경 */}
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
