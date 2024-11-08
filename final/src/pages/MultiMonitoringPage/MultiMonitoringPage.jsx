// src/pages/MultiMonitoringPage/MultiMonitoringPage.jsx

import React from "react";
import "./MultiMonitoringPage.css";
import MultiMonitoring from "../../components/MultiMonitoring/MultiMonitoring";
import Workspace from "../../components/Workspace/Workspace";

const MultiMonitoringPage = () => {
    return (
        <div className="MultiMonitoring-container">
            <Workspace pageText="페이지 / 낙상관리" mainText="낙상 관리" />{" "}
            {/* 맨 위에 위치 */}
            <div className="content-section-multimonitoring">
                <MultiMonitoring />
            </div>
        </div>
    );
};

export default MultiMonitoringPage;
