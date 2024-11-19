import React, { useState } from "react";
import "./VideoStream.css";
import helpIcon from "../../assets/icons/video-help.svg";

const VideoStream = ({ videoStreamUrl }) => {
  // 모드 리스트와 현재 모드를 위한 상태 설정
  const modes = ["일반 모드", "흐림 모드", "비식별화 모드"];
  const [currentModeIndex, setCurrentModeIndex] = useState(0);

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
    const video_ip = import.meta.env.VITE_VIEDEO_IP_MAIN;

    // 해당 모드에 따라 URL 요청 보내기
    let url = "";
    if (nextModeIndex === 0) {
      url = `http://${video_ip}:1997/set_frame_mode/1`;
    } else if (nextModeIndex === 1) {
      url = `http://${video_ip}:1997/set_frame_mode/2`;
    } else if (nextModeIndex === 2) {
      url = `http://${video_ip}:1997/set_frame_mode/3`;
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
        console.error("요청 실패:", error);
      });
  };

  return (
    <div className="video-stream-container">
      {/* 위 구역: 좌측에 디스플레이 제목, 우측에 모드 설명 */}
      <div className="video-stream-header">
        <p className="stream-title">실시간 돌봄 관리</p>
        <div className="mode-container">
          {/* 버튼으로 모드 변경 */}
          <button className="stream-mode" onClick={handleModeChange}>
            {modes[currentModeIndex]} {/* 현재 모드를 표시 */}
          </button>
          <div className="mode-icon-container">
            <img src={helpIcon} alt="모드 아이콘" className="mode-icon" />
            <span className="tooltip">{tooltips[currentModeIndex]}</span>
          </div>
        </div>
      </div>

      {/* 아래 구역: 이미지로 비디오 스트림을 대체 */}
      <div className="video-display">
        {videoStreamUrl ? (
          <img
            src={videoStreamUrl}
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

export default VideoStream;
