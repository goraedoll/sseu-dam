import React, { useState } from "react";
import "./NursingLog.css";
import Medications from "../Medications/Medications";
import NursingSchedule from "../NursingSchedule/NursingSchedule";
import editIcon from "../../assets/icons/nurs-edit.svg";
import doneIcon from "../../assets/icons/nurs-done.svg";

const NursingLog = () => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing(!isEditing);

  return (
    <div className="nursing-log">
      <div className="nursing-header">
        <h2 className="nursing-log-date">2024/10/15 목요일</h2>
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
        <Medications />
        {/* isEditing 상태를 NursingSchedule에 전달 */}
        <NursingSchedule isEditing={isEditing} />
      </div>
    </div>
  );
};

export default NursingLog;
