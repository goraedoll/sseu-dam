import React from "react";
import "./WebLink.css"; // Assuming you'll create a CSS file for styling
import image1 from "../../assets/images/web-image1.png";
import image2 from "../../assets/images/web-image2.png";
import image3 from "../../assets/images/web-image3.png";

const WebLink = () => {
  return (
    <div className="web-link-container">
      <a href="src/assets/WebLink/guide.pdf" target="_blank" rel="noopener noreferrer" className="card-button">
        <img className="web-image" src={image1} alt="낙상 안전 관리 지침" />
        <h1>낙상 안전 관리 지침</h1>
        <h4>낙상을 예방하기 위한 필수 안전 수칙을 확인하세요.</h4>
      </a>
      <a href="src/assets/WebLink/exercise.pdf" target="_blank" rel="noopener noreferrer" className="card-button">
        <img className="web-image" src={image2} alt="낙상 예방 운동 가이드" />
        <h1>낙상 예방 운동 가이드</h1>
        <h4>일상에서 따라할 수 있는 낙상 예방운동을 소개합니다.</h4>
      </a>
      <a href="src/assets/WebLink/emergency.pdf" target="_blank" rel="noopener noreferrer" className="card-button">
        <img className="web-image" src={image3} alt="응급 상황 대응 요령" />
        <h1>응급 상황 대응 요령</h1>
        <h4>낙상 발생 시 신속하고 정확한 대처 방법을 배워보세요.</h4>
      </a>
    </div>
  );
};

export default WebLink;
