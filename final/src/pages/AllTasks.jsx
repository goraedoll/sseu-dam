import React, { useEffect, useState } from "react";

const AllTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/tasks")
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  return (
    <div>
      <h1>모든 할일 목록</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.text} - {task.completed ? "완료됨" : "미완료"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllTasks;
