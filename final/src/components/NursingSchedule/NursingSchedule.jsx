import React, { useState } from "react";
import "./NursingSchedule.css";
import nursCheck from "../../assets/icons/nurs-check.svg";
import nursWater from "../../assets/icons/nurs-water.svg";
import nursNoWater from "../../assets/icons/nurs-nowater.svg";

const NursingSchedule = ({ isEditing }) => {
  const [bathroomData, setBathroomData] = useState({
    소변: { 아침: "화장실", 점심: "기저귀", 저녁: "" },
    대변: { 아침: "화장실", 점심: "기저귀", 저녁: "" },
  });

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
            <td className="large-cell">
              <img src={nursCheck} alt="check" />
            </td>
            <td className="large-cell">
              <img src={nursCheck} alt="check" />
            </td>
            <td className="large-cell">
              <img src={nursCheck} alt="check" />
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
              <img src={nursWater} alt="water intake" />
              <img src={nursWater} alt="water intake" />
              <img src={nursWater} alt="water intake" />
              <img src={nursWater} alt="water intake" />
              <img src={nursNoWater} alt="no water intake" />
              <img src={nursNoWater} alt="no water intake" />
              <img src={nursNoWater} alt="no water intake" />
              <img src={nursNoWater} alt="no water intake" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default NursingSchedule;
