import React from "react";
import "./AllTasksPage.css";
import Workspace from "../components/Workspace.jsx";
import AllTasks from "../components/AllTasks/AllTasks.jsx";

const AllTaskPage = () => {
  return (
    <div className="alltaskspage-container">
      <Workspace pageText="페이지/전체 할일" mainText="전체 할일" />
      <div className="alltaskspage-upper-section">
        <AllTasks />
      </div>
    </div>
  );
};

export default AllTaskPage;
