import React from 'react';
import './VideoStream.css';
import dashboardIcon from '../../assets/helpIcon.png';

const VideoStream = ({ videoStreamUrl }) => {
  return (
    <div className="video-stream-container">
      {/* 위 구역: 좌측에 디스플레이 제목, 우측에 모드 설명 */}
      <div className="video-stream-header">
        <p className="stream-title">실시간 돌봄 관리</p>
        <div className="mode-container">
            <img src={dashboardIcon} alt="모든 아이콘" className='mode-icon' />
            <p className='stream-mode'>흐림모드</p>
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
