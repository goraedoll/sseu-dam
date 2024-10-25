import React from 'react';
import './Workspace.css'; // 스타일 파일 import
import HeaderButtons from './HeaderButtons'; // HeaderButtons 컴포넌트 import

const Workspace = () => {
  return (
    <div className="workspace-container">
      <div className="left-section">
        <p className="page-text">페이지/대시보드</p>
        <h1 className="main-dashboard">메인 대시보드</h1>
      </div>
      <div className="right-section">
        <HeaderButtons /> {/* HeaderButtons 컴포넌트를 right-section에 추가 */}
      </div>
    </div>
  );
};

export default Workspace;
