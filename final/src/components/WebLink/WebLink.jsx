import React from "react";
import "./WebLink.css"; // Assuming you'll create a CSS file for styling
import image1 from "../../assets/images/web-first.png";
import image2 from "../../assets/images/web-second.png";
import image3 from "../../assets/images/web-third.png";

const WebLink = () => {
  return (
    <div className="web-link-container">
      <a href="/assets/WebLink/guide.pdf" download className="card-button">
        <img src={image1} alt="낙상 안전 관리 지침" />
        <h1>낙상 안전 관리 지침</h1>
        <h4>낙상을 예방하기 위한 필수 안전 수칙을 확인하세요.</h4>
      </a>
      <a href="/assets/WebLink/exercise.pdf" download className="card-button">
        <img src={image2} alt="낙상 예방 운동 가이드" />
        <h1>낙상 예방 운동 가이드</h1>
        <h4>일상에서 따라할 수 있는 낙상 예방운동을 소개합니다.</h4>
      </a>
      <a href="/assets/WebLink/emergency.pdf" download className="card-button">
        <img src={image3} alt="응급 상황 대응 요령" />
        <h1>응급 상황 대응 요령</h1>
        <h4>낙상 발생 시 신속하고 정확한 대처 방법을 배워보세요.</h4>
      </a>
    </div>
  );
};

export default WebLink;
