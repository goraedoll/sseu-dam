import React, { useState , useEffect} from "react";
import axios from "axios";
import "./NursingSchedule.css";
import nursCheck from "../../assets/icons/nurs-check.svg";
import nursWater from "../../assets/icons/nurs-water.svg";
import nursNoWater from "../../assets/icons/nurs-nowater.svg";
import nursWhite from "../../assets/icons/nurs-whitebox.svg";

const NursingSchedule = ({ isEditing, selectedDate}) => {
  const serverip = import.meta.env.VITE_SERVER_IP;

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
  const formatDate = (date) => {
    if (!date) return '';
    return date.format('YYYY-MM-DD');
  };
  const getdate=formatDate(selectedDate.selectedDate)
  console.log(getdate)
  // API 호출 및 데이터 가져오기 - 추가
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("access_token"); // 로컬 저장소에서 토큰 가져오기
        const response = await axios.get(`http://${serverip}:1252/NurseSchedule/`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-date" : getdate, // 날짜를 헤더로 추가
          },
        });

        const data = response.data;

        // API로부터 가져온 데이터로 상태 업데이트 - 추가
        setBathroomData({
          소변: data.Urination,
          대변: data.Defecation,
        });

        setIsChecked({
          식사_아침: data.Meal_Morning,
          식사_점심: data.Meal_Afternoon,
          식사_저녁: data.Meal_Evening,
        });

        setWaterIntake(data.WaterIntake);
      } catch (error) {
        console.error("데이터를 가져오는 중 오류 발생:", error);
      }
    };

    fetchData();
  }, [selectedDate]);

  useEffect(() => {
    if (!isEditing) {
      const saveChanges = async () => {
        try {
          const token = localStorage.getItem("access_token");
          await axios.put(
            `http://${serverip}:1252/NurseSchedule/UD`,
            {
              Urination: bathroomData.소변, // 소변 데이터
              Defecation: bathroomData.대변, // 대변 데이터
            },
            {
              headers: {
                Authorization: `Bearer ${token}`, // 인증 토큰 추가
                "x-date":getdate,
              },
            }
          );
          console.log("변경 사항이 성공적으로 저장되었습니다.");
        } catch (error) {
          console.error("변경 사항 저장 중 오류 발생:", error);
        }
      };
  
      saveChanges(); // 변경 사항 저장 함수 호출
    }
  }, [isEditing]);

  
  

  const toggleCheck = async (mealTime) => {
    const newCheckState = !isChecked[mealTime];
    setIsChecked((prev) => ({
      ...prev,
      [mealTime]: newCheckState,
    }));

    // 바로 요청 보내기
    try {
      const token = localStorage.getItem("access_token");
      await axios.put(
        `http://${serverip}:1252/NurseSchedule/meal`,
        {
          MealTime: mealTime,
          Status: newCheckState,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-date": getdate,
          },
        }
      );
      console.log(`${mealTime} 업데이트 성공`);
    } catch (error) {
      console.error(`${mealTime} 업데이트 중 오류 발생:`, error);
    }
  };

  const toggleWaterIntake = async (index) => {
    // 수분 섭취 상태 업데이트
    const newWaterIntake = [...waterIntake];
    newWaterIntake[index] = !newWaterIntake[index];
    setWaterIntake(newWaterIntake);
  
    // 서버에 변경된 수분 섭취 상태 전송
    try {
      const token = localStorage.getItem("access_token");
      await axios.put(
        `http://${serverip}:1252/NurseSchedule/water`,
        { // 날짜 정보
          WaterIntake: newWaterIntake, // 변경된 수분 섭취 상태
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // 인증 토큰 추가
            "x-date": getdate,
          },
        }
      );
      console.log("수분 섭취 상태가 성공적으로 업데이트되었습니다.");
    } catch (error) {
      console.error("수분 섭취 상태 업데이트 중 오류 발생:", error);
    }
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
