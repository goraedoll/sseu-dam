// src/pages/MultiMonitoringPage/MultiMonitoringPage.jsx

import React from "react";
import "./MultiMonitoringPage.css";
import MultiMonitoring from "../../components/MultiMonitoring/MultiMonitoring";
import Workspace from "../../components/Workspace/Workspace";

const MultiMonitoringPage = () => {
  return (
    <div className="MultiMonitoring-container">
      <Workspace pageText="페이지 / 멀티 모니터링" mainText="멀티 모니터링" />{" "}
      {/* 맨 위에 위치 */}
      <div className="content-section-multimonitoring">
        <MultiMonitoring />
      </div>
    </div>
  );
};

export default MultiMonitoringPage;
