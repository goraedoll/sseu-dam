import React, { useState, useEffect } from "react";
import "./Medications.css";
import medicheckedIcon from "../../assets/icons/nurs-medichecked.svg";
import noncheckIcon from "../../assets/icons/nurs-noncheck.svg";
import pill1Icon from "../../assets/icons/nurs-pill1.svg";
import pill2Icon from "../../assets/icons/nurs-pill2.svg";
import pill3Icon from "../../assets/icons/nurs-pill3.svg";

const medicationsData = [
  {
    id: 1,
    name: "고지혈증약",
    frequency: "매일 1회",
    icon: pill1Icon,
    checked: true,
  },
  {
    id: 2,
    name: "혈압약",
    frequency: "매일 1회",
    icon: pill2Icon,
    checked: false,
  },
  {
    id: 3,
    name: "당뇨약",
    frequency: "매일 3회",
    icon: pill3Icon,
    checked: [true, false, false],
  },
];

const Medications = (selectedDate) => {
  const [medications, setMedications] = useState(medicationsData);
  const serverip = import.meta.env.VITE_SERVER_IP;

  // console.log(selectedDate.selectedDate)
  const formatDate = (date) => {
    if (!date) return '';
    return date.format('YYYY-MM-DD');
  };

  useEffect(() => {
    const fetchMedications = async () => {
      const token = localStorage.getItem("access_token");
      console.log(selectedDate.selectedDate.selectedDate)
      const getdate=formatDate(selectedDate.selectedDate.selectedDate)
      

      

      try {
        // GET 요청을 보내는 부분: selectedDate를 URL의 쿼리 파라미터로 사용
        const response = await fetch(`http://${serverip}:1252/nurselog/?date=${getdate}`, {
          headers: {
            Authorization: `Bearer ${token}`, // 인증 토큰 헤더 추가
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch medications data");
        }
////이게맞나...
        const data = await response.json();
        setMedications((prevMedications) =>
          prevMedications.map((medication, index) => ({
            ...medication,
            checked: data[index].checked,
          }))
        );
        // 응답받은 데이터 콘솔에 출력
      } catch (error) {
        console.error("Error fetching medications data:", error);
      }
    };

    fetchMedications();
  }, [selectedDate]); // selectedDate가 변경될 때마다 GET 요청을 다시 보냄
  // console.log(medicationsData)
  //

  const toggleCheck = async (medicationId, index) => {
    // 업데이트된 체크 상태 설정
    const updatedMedications = medications.map((medication) =>
      medication.id === medicationId
        ? {
            ...medication,
            checked: Array.isArray(medication.checked)
              ? medication.checked.map((val, i) => (i === index ? !val : val))
              : !medication.checked,
          }
        : medication
    );
  
    // 업데이트된 상태를 즉시 적용
    setMedications(updatedMedications);
  
    // PUT 요청을 보내는 부분
    const token = localStorage.getItem("access_token");
    const getdate=formatDate(selectedDate.selectedDate.selectedDate)
  
    try {
      const updatedMedication = updatedMedications.find(med => med.id === medicationId);
  
      const response = await fetch(`http://${serverip}:1252/nurselog/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // 인증 토큰 헤더 추가
          "x-date": getdate
        },
        body: JSON.stringify({
          id: updatedMedication.id, // id 추가
          checked: updatedMedication.checked // checked 상태
        }),
      });
      console.log(updatedMedication.id, updatedMedication.checked)
      console.log(getdate)
  
      if (!response.ok) {
        throw new Error("Failed to update medication status");
      }
  
      // 요청 성공 시 추가 작업(필요한 경우)
      console.log("Medication status updated successfully");
    } catch (error) {
      console.error("Error updating medication status:", error);
    }
  };
  

  return (
    <div className="medications-container">
      <h2>복약</h2>
      {medications.map((med) => (
        <div className="medication-item" key={med.id}>
          <img src={med.icon} alt={med.name} className="medication-icon" />
          <div className="medication-info">
            <span className="medication-name">{med.name}</span>
            <span className="medication-frequency">{med.frequency}</span>
          </div>
          <div className="medication-checks">
            {Array.isArray(med.checked) ? (
              med.checked.map((isChecked, index) => (
                <img
                  key={index}
                  src={isChecked ? medicheckedIcon : noncheckIcon}
                  alt={isChecked ? "checked" : "unchecked"}
                  className="medication-check-icon"
                  onClick={() => toggleCheck(med.id, index)}
                />
              ))
            ) : (
              <img
                src={med.checked ? medicheckedIcon : noncheckIcon}
                alt={med.checked ? "checked" : "unchecked"}
                className="medication-check-icon"
                onClick={() => toggleCheck(med.id)}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Medications; 