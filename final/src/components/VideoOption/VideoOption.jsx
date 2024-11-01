import React from "react";
import "./VideoOption.css"; // CSS 파일을 따로 관리하는 경우
import ClapperBoardIcon from "../../assets/icons/voption-video.svg"; // 클래퍼보드 아이콘
import BackupIcon from "../../assets/icons/voption-backup.svg"; // 백업 아이콘
import HospitalIcon from "../../assets/icons/voption-hospital.svg"; // 병원 아이콘
import PhoneIcon from "../../assets/icons/voption-call.svg"; // 긴급 연락망 아이콘

// 개별 옵션 항목을 표시하는 컴포넌트
const VideoOptionItem = ({ text, subText, icon, isEmergency }) => (
  <div className={`option-item ${isEmergency ? "emergency" : ""}`}>
    {/* 영상 백업과 마지막 백업만 text-content로 묶음 */}
    {subText ? (
      <div className="text-content">
        <h3>{text}</h3>
        <p>{subText}</p>
      </div>
    ) : (
      <h3>{text}</h3> // 다른 항목은 h3만 사용
    )}
    <div className="icon-content">
      <img src={icon} alt={text} />
    </div>
  </div>
);

// 여러 개의 옵션 항목을 포함하는 컴포넌트
const VideoOption = () => {
  return (
    <div className="option-container">
      <div className="video-options">
        {/* 이전 녹화 영상 보기 */}
        <VideoOptionItem text="이전 녹화 영상 보기" icon={ClapperBoardIcon} />

        {/* 영상 백업 - 마지막 백업 날짜 포함 */}
        <VideoOptionItem
          text="영상 백업"
          subText="마지막 백업 2024.10.10 14:28"
          icon={BackupIcon}
        />

        {/* 가까운 병원 찾기 */}
        <VideoOptionItem text="가까운 병원 찾기" icon={HospitalIcon} />

        {/* 긴급 연락망 - 긴급 상황 시 표시되는 스타일 적용 */}
        <VideoOptionItem
          text="긴급 연락망"
          icon={PhoneIcon}
          isEmergency={true} // 긴급 상황일 때 스타일 변경
        />
      </div>
    </div>
  );
};

export default VideoOption;
