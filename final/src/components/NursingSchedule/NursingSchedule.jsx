import React, { useState } from "react";
import "./NursingSchedule.css";
import nursCheck from "../../assets/icons/nurs-check.svg";
import nursWater from "../../assets/icons/nurs-water.svg";
import nursNoWater from "../../assets/icons/nurs-nowater.svg";
import nursWhite from "../../assets/icons/nurs-whitebox.svg";

const NursingSchedule = ({ isEditing }) => {
  const [bathroomData, setBathroomData] = useState({
    소변: { 아침: "화장실", 점심: "기저귀", 저녁: "" },
    대변: { 아침: "화장실", 점심: "", 저녁: "" },
  });

  const [isChecked, setIsChecked] = useState({
    식사_아침: true,
    식사_점심: true,
    식사_저녁: false,
  });

  // 수분 섭취 체크 상태 (8개의 원)
  const [waterIntake, setWaterIntake] = useState([
    true,
    true,
    true,
    false,
    false,
    false,
    false,
    false,
  ]);

  const toggleCheck = (mealTime) => {
    setIsChecked((prev) => ({
      ...prev,
      [mealTime]: !prev[mealTime],
    }));
  };

  const toggleWaterIntake = (index) => {
    setWaterIntake((prev) => {
      const newWaterIntake = [...prev];
      newWaterIntake[index] = !newWaterIntake[index];
      return newWaterIntake;
    });
  };

  const handleInputChange = (e, type, time) => {
    const { value } = e.target;
    setBathroomData((prevData) => ({
      ...prevData,
      [type]: {
        ...prevData[type],
        [time]: value,
      },
    }));
  };

  return (
    <div className="nursing-schedule">
      <h2 style={{ marginRight: "12px" }}>간병 일지</h2>
      <table className="fixed-table">
        <thead>
          <tr>
            <th className="small-cell"></th>
            <th className="header-cell">아침</th>
            <th className="header-cell">점심</th>
            <th className="header-cell">저녁</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="side-cell">식사</td>
            <td className="large-cell" onClick={() => toggleCheck("식사_아침")}>
              <img
                src={isChecked["식사_아침"] ? nursCheck : nursWhite}
                alt="check"
              />
            </td>
            <td className="large-cell" onClick={() => toggleCheck("식사_점심")}>
              <img
                src={isChecked["식사_점심"] ? nursCheck : nursWhite}
                alt="check"
              />
            </td>
            <td className="large-cell" onClick={() => toggleCheck("식사_저녁")}>
              <img
                src={isChecked["식사_저녁"] ? nursCheck : nursWhite}
                alt="check"
              />
            </td>
          </tr>
          <tr>
            <td className="side-cell">소변</td>
            <td className="large-cell">
              {isEditing ? (
                <input
                  type="text"
                  value={bathroomData.소변.아침}
                  onChange={(e) => handleInputChange(e, "소변", "아침")}
                />
              ) : (
                bathroomData.소변.아침
              )}
            </td>
            <td className="large-cell">
              {isEditing ? (
                <input
                  type="text"
                  value={bathroomData.소변.점심}
                  onChange={(e) => handleInputChange(e, "소변", "점심")}
                />
              ) : (
                bathroomData.소변.점심
              )}
            </td>
            <td className="large-cell">
              {isEditing ? (
                <input
                  type="text"
                  value={bathroomData.소변.저녁}
                  onChange={(e) => handleInputChange(e, "소변", "저녁")}
                />
              ) : (
                bathroomData.소변.저녁
              )}
            </td>
          </tr>
          <tr>
            <td className="side-cell">대변</td>
            <td className="large-cell">
              {isEditing ? (
                <input
                  type="text"
                  value={bathroomData.대변.아침}
                  onChange={(e) => handleInputChange(e, "대변", "아침")}
                />
              ) : (
                bathroomData.대변.아침
              )}
            </td>
            <td className="large-cell">
              {isEditing ? (
                <input
                  type="text"
                  value={bathroomData.대변.점심}
                  onChange={(e) => handleInputChange(e, "대변", "점심")}
                />
              ) : (
                bathroomData.대변.점심
              )}
            </td>
            <td className="large-cell">
              {isEditing ? (
                <input
                  type="text"
                  value={bathroomData.대변.저녁}
                  onChange={(e) => handleInputChange(e, "대변", "저녁")}
                />
              ) : (
                bathroomData.대변.저녁
              )}
            </td>
          </tr>
          <tr className="water-intake">
            <td className="side-cell">수분</td>
            <td className="large-cell" colSpan="3">
              <div className="water-intake-container">
                {waterIntake.map((intake, index) => (
                  <img
                    key={index}
                    src={intake ? nursWater : nursNoWater}
                    alt="water intake"
                    onClick={() => toggleWaterIntake(index)}
                  />
                ))}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default NursingSchedule;
