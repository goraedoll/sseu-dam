import React from "react";
import "./AllTasksPage.css";
import Workspace from "../../components/Workspace/Workspace.jsx";
import AllTasks from "../../components/AllTasks/AllTasks.jsx";

const AllTaskPage = () => {
  return (
    <div className="alltaskspage-container">
      <Workspace pageText="페이지 / 할일 목록" mainText="할일 목록" />
      <div className="alltaskspage-upper-section">
        <AllTasks />
      </div>
    </div>
  );
};

export default AllTaskPage;
