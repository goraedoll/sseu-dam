import React from "react";
import "./Monitoring.css";
import Workspace from "../../components/Workspace/Workspace";
import MiniVideoStream from "../../components/MiniVideoStream/MiniVideoStream";
import IconMessage from "../../components/IconMessage/IconMessage";
import MiniAlertMessages from "../../components/MiniAlertMessages/MiniAlertMesages";
import WebLink from "../../components/WebLink/WebLink";
import VideoOption from "../../components/VideoOption/VideoOption";
import BedSore from "../../components/BedSore/BedSore"

const Monitoring = () => {
  const video_ip = import.meta.env.VITE_VIDEO_IP_MAIN;
  const completeVideoUrl = `http://${video_ip}:1997`;
  // console.log(video_ip);

  return (
    <div className="monitoring-container">
      <Workspace pageText="페이지 / AI 모니터링" mainText="AI 모니터링" />{" "}
      {/* 맨 위에 위치 */}
      <div className="content-section-monitoring">
        <div className="left-section-monitoring">
          <MiniVideoStream videoStreamUrl={completeVideoUrl} />
          <WebLink />
        </div>
        <div className="right-section-monitoring">
          <IconMessage />
          {/*<MiniAlertMessages />*/}
          <BedSore />
          <VideoOption />
        </div>
      </div>
    </div>
  );
};

export default Monitoring;
