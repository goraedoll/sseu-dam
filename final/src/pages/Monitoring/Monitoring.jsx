import React from "react";
import "./Monitoring.css";
import Workspace from "../../components/Workspace/Workspace";
import MiniVideoStream from "../../components/MiniVideoStream/MiniVideoStream";
import IconMessage from "../../components/IconMessage/IconMessage";
import MiniAlertMessages from "../../components/MiniAlertMessages/MiniAlertMesages";
import WebLink from "../../components/WebLink/WebLink";
import VideoOption from "../../components/VideoOption/VideoOption";

const Monitoring = () => {
  return (
    <div className="monitoring-container">
      <Workspace pageText="페이지 / 낙상관리" mainText="낙상 관리" />{" "}
      {/* 맨 위에 위치 */}
      <div className="content-section-monitoring">
        <div className="left-section-monitoring">
          <MiniVideoStream />
          <WebLink />
        </div>
        <div className="right-section-monitoring">
          <IconMessage />
          <MiniAlertMessages />
          <VideoOption />
        </div>
      </div>
    </div>
  );
};

export default Monitoring;
