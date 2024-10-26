import React from 'react';
import './Workspace.css'; // 스타일 파일 import
import HeaderButtons from './HeaderButtons/HeaderButtons'; // HeaderButtons 컴포넌트 import

const Workspace = ({ pageText, mainText }) => { // props로 pageText와 mainText 받기
  return (
    <div className="workspace-container">
      <div className="left-section">
        <p className="page-text">{pageText}</p> {/* page-text를 props로 설정 */}
        <h1 className="main-dashboard">{mainText}</h1> {/* main-dashboard를 props로 설정 */}
      </div>
      <div className="right-section">
        <HeaderButtons /> {/* HeaderButtons 컴포넌트를 right-section에 추가 */}
      </div>
    </div>
  );
};

export default Workspace;
