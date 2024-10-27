import React, { useEffect, useState } from "react";
import Workspace from "../components/Workspace";
import './AllTasks.css'

const AllTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/tasks")
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  return (
    <div className="alltasks-container">
      <Workspace pageText="상세 정보/모든 정보" mainText="상세 정보" />
      <ul className="tasks-list">
        {tasks.map((task) => (
          <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
            {task.text} - <span>{task.completed ? "완료됨" : "미완료"}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllTasks;
