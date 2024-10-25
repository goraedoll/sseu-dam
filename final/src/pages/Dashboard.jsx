import React from 'react';
import './Dashboard.css';
import Workspace from '../components/Workspace';
import VideoStream from '../components/VideoStream';
import AlertMessages from '../components/AlertMessages'; // AlertMessages 컴포넌트 import

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Workspace />
      <div className="upper-section">
        <div className="left-content">
          {/* 좌측 구역에 추가할 컴포넌트 */}
          <VideoStream />
        </div>
        <div className="right-content">
          {/* 우측 구역에 추가할 AlertMessages 컴포넌트 */}
          <AlertMessages />
        </div>
      </div>
      <div className="lower-section">
        <h1>하단 구역</h1>
        {/* 하단 구역에 추가할 컴포넌트 */}
      </div>
    </div>
  );
};

export default Dashboard;
