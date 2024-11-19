import React, { useState, useEffect } from "react";
import modeOn from "../../assets/icons/bed-on.svg";
import modeOff from "../../assets/icons/bed-off.svg";
import playButton from "../../assets/icons/bed-play.svg";
import resetButton from "../../assets/icons/bed-reset.svg";
import "./BedSore.css";

const BedSore = () => {
  const [isAIMode, setIsAIMode] = useState(false);
  const [timer, setTimer] = useState(83 * 60 + 26); // 2시간 = 7200초
  const [isRunning, setIsRunning] = useState(false);

  const totalDuration = 7200; // 총 타이머 시간 (2시간)

  // 타이머 동작
  useEffect(() => {
    let interval;
    if (isAIMode || isRunning) {
      interval = setInterval(() => {
        setTimer((prev) => (prev <= 0 ? totalDuration : prev - 1));
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isAIMode, isRunning]);

  // 타이머 초기화
  const resetTimer = () => {
    setTimer(totalDuration);
    setIsRunning(false);
  };

  // 남은 시간을 비율로 계산
  const circumference = 2 * Math.PI * 76; // 반지름 70의 원 둘레
  const timerProgress = (timer / totalDuration) * 100;

  // 시간 형식 변환 (초 -> "MM:SS")
  const formatTime = (time) => {
    const minutes = String(Math.floor(time / 60)).padStart(2, "0");
    const seconds = String(time % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="bedsore-container">
      <header className="bedsore-header">
        <h2>욕창 관리</h2>
        <img
          src={isAIMode ? modeOn : modeOff}
          alt="AI Mode Toggle"
          className="bedsore-toggle-icon"
          onClick={() => setIsAIMode((prev) => !prev)}
        />
      </header>

      <div
        className={`bedsore-timer-container ${
          isAIMode ? "ai-mode" : "manual-mode"
        }`}
      >
        {/* 타이머 */}
        <div className="bedsore-progress">
          <svg className="bedsore-progress-ring" width="176" height="176">
            <circle
              className="bedsore-progress-ring-bg"
              cx="88"
              cy="88"
              r="76" /* 반지름을 76px로 설정하여 176px 원 크기 */
            />
            <circle
              className="bedsore-progress-ring-fill"
              cx="88"
              cy="88"
              r="76" /* 반지름을 76px로 설정 */
              strokeDasharray={`${circumference}`} /* 원 둘레 */
              strokeDashoffset={`${
                circumference - (circumference * timerProgress) / 100
              }`} /* 진행 비율 */
            />
          </svg>
          <div className="bedsore-timer-text">
            <span>자세 변경 까지</span>
            <h1>{formatTime(timer)}</h1>
          </div>
        </div>

        {/* 버튼 그룹 */}
        {!isAIMode && (
          <div className="bedsore-controls">
            <button
              onClick={() => setIsRunning((prev) => !prev)}
              className="bedsore-button"
            >
              <img src={playButton} alt="Play/Pause" />
              <span>{isRunning ? "일시정지" : "재생"}</span>
            </button>
            <button onClick={resetTimer} className="bedsore-button">
              <img src={resetButton} alt="Reset Timer" />
              <span>타이머 초기화</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BedSore;