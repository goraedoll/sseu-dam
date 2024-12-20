import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import "./Medication.css";
import Workspace from "../../components/Workspace/Workspace";
import CustomCalendar from "../../components/Calendar/CustomCalendar";
import TodoList from "../../components/TodoList/TodoList";
import MedicationInfo from "../../components/MedicationInfo/MedicationInfo";
import NursingLog from "../../components/NursingLog/NursingLog";
import Precautions from "../../components/Precautions/Precautions";

const Medication = () => {
  // selectedDate와 setSelectedDate를 useState로 정의
  const [selectedDate, setSelectedDate] = useState(dayjs());

  return (
    <div className="medication-container">
      <Workspace pageText="페이지 / 돌봄 일지" mainText="돌봄 일지" />
      <div className="medication-upper-section">
        <div>
          <h1 className="medication-upper-section-title">간편 일지 관리</h1>
        </div>
        <div className="medication-content-section">
          {/* CustomCalendar에 selectedDate와 setSelectedDate를 props로 전달 */}
          <CustomCalendar
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
          <NursingLog selectedDate={selectedDate} />
          <TodoList selectedDate={selectedDate} />
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
