// NursingLog.jsx

import React, { useState } from "react";
import pill1 from "../../assets/icons/nurs-pill1.svg";
import pill2 from "../../assets/icons/nurs-pill2.svg";
import pill3 from "../../assets/icons/nurs-pill3.svg";
import checkedIcon from "../../assets/icons/nurs-medichecked.svg";
import nonCheckIcon from "../../assets/icons/nurs-noncheck.svg";
import mealCheckedIcon from "../../assets/icons/nurs-check.svg"; // 체크된 식사 아이콘
import waterIcon from "../../assets/icons/nurs-water.svg";
import noWaterIcon from "../../assets/icons/nurs-nowater.svg";
import "./NursingLog.css";

const NursingLog = () => {
  const [medications, setMedications] = useState([
    { 이름: "비타민 C", 복용횟수: 1, 아이콘: pill1, 복용상태: [true] },
    { 이름: "유산균", 복용횟수: 1, 아이콘: pill2, 복용상태: [false] },
    {
      이름: "당뇨약",
      복용횟수: 3,
      아이콘: pill3,
      복용상태: [true, false, false],
    },
  ]);

  const [nursingSchedule, setNursingSchedule] = useState({
    식사시간: ["아침", "점심", "저녁"],
    기록: [
      { 항목: "식사", 상태: [true, true, true] },
      { 항목: "소변", 상태: ["화장실", "기저귀", ""] },
      { 항목: "대변", 상태: ["화장실", "기저귀", ""] },
      {
        항목: "수분",
        상태: [true, true, true, false, false, false, false, false],
      },
    ],
  });

  const toggleMedicationStatus = (medIndex, statusIndex) => {
    setMedications((prevMedications) =>
      prevMedications.map((med, index) => {
        if (index === medIndex) {
          const updatedStatus = med.복용상태.map((status, idx) =>
            idx === statusIndex ? !status : status
          );
          return { ...med, 복용상태: updatedStatus };
        }
        return med;
      })
    );
  };

  const toggleNursingStatus = (entryIndex, statusIndex) => {
    setNursingSchedule((prevSchedule) => {
      const updatedRecord = prevSchedule.기록.map((entry, idx) => {
        if (
          idx === entryIndex &&
          typeof entry.상태[statusIndex] === "boolean"
        ) {
          const updatedStatus = entry.상태.map((status, sIdx) =>
            sIdx === statusIndex ? !status : status
          );
          return { ...entry, 상태: updatedStatus };
        }
        return entry;
      });
      return { ...prevSchedule, 기록: updatedRecord };
    });
  };

  return (
    <div className="container">
      <div className="medication">
        <h3>복약</h3>
        {medications.map((med, medIndex) => (
          <div key={medIndex} className="medication-item">
            <img src={med.아이콘} alt={med.이름} className="medication-icon" />
            <div>
              <h4>{med.이름}</h4>
              <p>매일 {med.복용횟수}회</p>
            </div>
            <div className="medication-checks">
              {med.복용상태.map((isTaken, statusIndex) => (
                <img
                  key={statusIndex}
                  src={isTaken ? checkedIcon : nonCheckIcon}
                  alt={isTaken ? "복용 완료" : "복용 안함"}
                  className="circle"
                  onClick={() => toggleMedicationStatus(medIndex, statusIndex)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="nursing">
        <h3>간병 일지</h3>
        <table className="fixed-table">
          <thead>
            <tr>
              <th>항목</th>
              {nursingSchedule.식사시간.map((meal, idx) => (
                <th key={idx}>{meal}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {nursingSchedule.기록.map((entry, entryIndex) => (
              <tr key={entryIndex}>
                <td>{entry.항목}</td>
                {entry.상태.map((value, statusIndex) => (
                  <td key={statusIndex} className="nursing-status">
                    {entry.항목 === "식사" ? (
                      value ? (
                        <img
                          src={mealCheckedIcon}
                          alt="식사 완료"
                          onClick={() =>
                            toggleNursingStatus(entryIndex, statusIndex)
                          }
                          className="check-icon"
                        />
                      ) : (
                        <span
                          onClick={() =>
                            toggleNursingStatus(entryIndex, statusIndex)
                          }
                        >
                          &nbsp;
                        </span>
                      )
                    ) : entry.항목 === "수분" ? (
                      <img
                        src={value ? waterIcon : noWaterIcon}
                        alt={value ? "수분 섭취" : "수분 미섭취"}
                        onClick={() =>
                          toggleNursingStatus(entryIndex, statusIndex)
                        }
                        className="water-icon"
                      />
                    ) : (
                      <span>{value}</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NursingLog;
