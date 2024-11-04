import React, { useState } from "react";
import "./Medications.css";
import medicheckedIcon from "../../assets/icons/nurs-medichecked.svg";
import noncheckIcon from "../../assets/icons/nurs-noncheck.svg";
import pill1Icon from "../../assets/icons/nurs-pill1.svg";
import pill2Icon from "../../assets/icons/nurs-pill2.svg";
import pill3Icon from "../../assets/icons/nurs-pill3.svg";

const medicationsData = [
  {
    id: 1,
    name: "비타민 C",
    frequency: "매일 1회",
    icon: pill1Icon,
    checked: true,
  },
  {
    id: 2,
    name: "유산균",
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

const Medications = () => {
  const [medications, setMedications] = useState(medicationsData);

  const toggleCheck = (medicationId, index) => {
    setMedications((prevMedications) =>
      prevMedications.map((medication) =>
        medication.id === medicationId
          ? {
              ...medication,
              checked: Array.isArray(medication.checked)
                ? medication.checked.map((val, i) => (i === index ? !val : val))
                : !medication.checked,
            }
          : medication
      )
    );
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
