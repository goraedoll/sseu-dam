import React from "react";
import "./Medication.css";
import Workspace from "../../components/Workspace/Workspace";
import CustomCalendar from "../../components/Calendar/CustomCalendar";
import TodoList from "../../components/TodoList/TodoList";
import MedicationInfo from "../../components/MedicationInfo/MedicationInfo";
import NursingLog from "../../components/NursingLog/NursingLog";
import Precautions from "../../components/Precautions/Precautions";

const Medication = () => {
  return (
    <div className="medication-container">
      <Workspace pageText="페이지 / 복약 안내" mainText="복약 안내" />
      <div className="medication-upper-section">
        <div>
          <h1 className="medication-upper-section-title">간편 일지 관리</h1>
        </div>
        <div className="medication-content-section">
          <CustomCalendar />
          <NursingLog />
          <TodoList />
        </div>
      </div>
      <div className="medication-lower-section">
        <MedicationInfo />
        <Precautions />
      </div>
    </div>
  );
};

export default Medication;
