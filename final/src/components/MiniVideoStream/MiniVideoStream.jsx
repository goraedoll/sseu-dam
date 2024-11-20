import React, { useState } from "react";
import "./MiniVideoStream.css"; // 새로운 스타일 파일 import
import dashboardIcon from "../../assets/icons/video-help.svg";

const MiniVideoStream = ({ videoStreamUrl }) => {
  // 모드 리스트와 현재 모드를 위한 상태 설정
  const modes = ["일반 모드", "흐림 모드", "비식별화 모드"];
  const [currentModeIndex, setCurrentModeIndex] = useState(0);
  const videoStreamUrl_Mini = `${videoStreamUrl}/video_feed`;
  console.log(videoStreamUrl_Mini);
  

  const tooltips = [
    "일반모드입니다.",
    "흐림모드입니다. 돌봄 대상자가 흐리게 보입니다.",
    "비식별화모드입니다. 돌봄 대상자의 사생활을 보호합니다.",
  ];

  // 모드 변경 함수
  const handleModeChange = () => {
    // 다음 모드로 변경 (현재 모드 인덱스를 1 증가)
    const nextModeIndex = (currentModeIndex + 1) % modes.length;
    setCurrentModeIndex(nextModeIndex);

    // 해당 모드에 따라 URL 요청 보내기
    let url = "";
    if (nextModeIndex === 0) {
      url = `${videoStreamUrl}/set_frame_mode/1`;
    } else if (nextModeIndex === 1) {
      url = `${videoStreamUrl}/set_frame_mode/2`;
    } else if (nextModeIndex === 2) {
      url = `${videoStreamUrl}/set_frame_mode/3`;
    }

    // 요청 보내기
    fetch(url, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("요청 성공:", data);
      })
      .catch((error) => {
        console.log(url)
        console.error("요청 실패:", error);
      });
  };

  return (
    <div className="mini-video-stream-container">
      <div className="video-stream-header">
        <p className="stream-title">실시간 돌봄 관리</p>
        <div className="mode-container">
          <button className="stream-mode" onClick={handleModeChange}>
            {modes[currentModeIndex]}
          </button>
          <div className="mode-icon-container">
            <img src={dashboardIcon} alt="모드 아이콘" className="mode-icon" />
            <span className="tooltip">{tooltips[currentModeIndex]}</span>
          </div>
        </div>
      </div>

      <div className="video-display">
        {videoStreamUrl ? (
          <img
            src={videoStreamUrl_Mini}
            alt="Video Stream"
            className="video-image"
          />
        ) : (
          <div className="no-signal">
            <p>신호 없음</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MiniVideoStream;
