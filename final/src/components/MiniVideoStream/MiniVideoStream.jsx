import React from 'react';
import './MiniVideoStream.css'; // 새로운 스타일 파일 import
import dashboardIcon from '../../../assets/helpIcon.png';

const MiniVideoStream = ({ videoStreamUrl }) => {
  return (
    <div className="mini-video-stream-container">
      <div className="video-stream-header">
        <p className="stream-title">실시간 돌봄 관리</p>
        <div className="mode-container">
            <img src={dashboardIcon} alt="모든 아이콘" className='mode-icon' />
            <p className='stream-mode'>흐림모드</p>
        </div>
      </div>

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

export default MiniVideoStream;
