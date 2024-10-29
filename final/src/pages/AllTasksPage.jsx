import React from "react";
<<<<<<< HEAD
import './AllTasksPage.css';
=======
import "./AllTasksPage.css";
>>>>>>> 9c23b9bd1d1076c686a3ee8e3114a30af629d2e1
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
