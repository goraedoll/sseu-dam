import React from "react";
import "./Precautions.css";
import PreMore from "../../assets/icons/pre-more.svg";

const Precautions = () => {
  return (
    <div className="precautions-container">
      <div className="precautions-header">
        <h2 className="precautions-title">주의할 영양소와 음식 안내</h2>
        <img src={PreMore} alt="더보기 아이콘" className="precautions-icon" />
      </div>
      <ul className="precautions-list">
        <li>
          알코올, 매운 음식, 산성 음식은 위장 장애와 출혈 위험을 높일 수 있으니
          주의하세요.
        </li>
        <li>
          당뇨약 복용 시 고당분 음식과 알코올은 혈당에 영향을 줄 수 있어
          제한하세요.
        </li>
        <li>
          고혈압 약 복용 시 고염분 음식, 칼륨이 많은 음식, 알코올 섭취에
          주의하세요.
        </li>
        <li>진통제 복용 시 알코올, 카페인, 자극적인 음식은 피하세요.</li>
        <li>녹차와 고지방 음식은 약물 흡수를 방해할 수 있으니 주의하세요.</li>
      </ul>
    </div>
  );
};

export default Precautions;
