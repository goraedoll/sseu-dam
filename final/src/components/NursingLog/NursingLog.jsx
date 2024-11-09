import React, { useState } from "react";
import "./NursingLog.css";
import Medications from "../Medications/Medications";
import NursingSchedule from "../NursingSchedule/NursingSchedule";
import editIcon from "../../assets/icons/nurs-edit.svg";
import doneIcon from "../../assets/icons/nurs-done.svg";

const NursingLog = (selectedDate) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing(!isEditing);
  const formatDate = (date) => {
    if (!date) return '';
    return date.format('YYYY년 MM월 DD일');
  };

  return (
    <div className="nursing-log">
      <div className="nursing-header">
        <h2 className="nursing-log-date">{formatDate(selectedDate.selectedDate)}</h2>
        <button
          onClick={toggleEdit}
          className="edit-button"
          style={{
            backgroundImage: `url(${isEditing ? doneIcon : editIcon})`,
          }}
          aria-label={isEditing ? "완료" : "편집"}
        />
      </div>
      <div className="components-container">
        <Medications selectedDate={selectedDate}/>
        {/* isEditing 상태를 NursingSchedule에 전달 */}
        <NursingSchedule isEditing={isEditing} />
      </div>
    </div>
  );
};

export default NursingLog;
