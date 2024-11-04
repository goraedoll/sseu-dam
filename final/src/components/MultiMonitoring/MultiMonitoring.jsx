// src/components/MultiMonitoring/MultiMonitoring.jsx

import React, { useState } from "react";
import "./multiMonitoring.css";
import placeholderImage from "../../assets/images/login-cloud.png"; // 대체 이미지 파일 추가

const MultiMonitoring = () => {
    const videoSources = [
        "http://192.168.21.205:1997/video_feed", // 첫 번째 모니터 URL
        "http://192.168.21.205:1997/video_feed", // 두 번째 모니터 URL
        "http://192.168.21.205:1997/video_feed", // 세 번째 모니터 URL
        "http://192.168.21.205:1997/video_feed", // 네 번째 모니터 URL
    ];

    // 큰 모니터에 표시할 비디오의 URL을 저장하는 상태
    const [selectedVideo, setSelectedVideo] = useState(videoSources[0]);

    // 모니터를 클릭할 때 호출되는 함수
    const handleMonitorClick = (src) => {
        setSelectedVideo(src);
    };

    return (
        <div className="multi-monitoring-wrapper">
            {/* 작은 모니터 4개 */}
            <div className="multi-monitoring-container">
                {videoSources.map((src, index) => (
                    <div key={index} className="monitor" onClick={() => handleMonitorClick(src)}>
                        <img 
                            src={src}
                            alt={`Monitor ${index + 1}`}
                            className="monitor-video"
                            onError={(e) => e.target.src = placeholderImage} // 대체 이미지로 변경
                        />
                    </div>
                ))}
            </div>

            {/* 큰 모니터 */}
            <div className="large-monitor">
                <img 
                    src={selectedVideo}
                    alt="Selected Monitor"
                    className="large-monitor-video"
                    onError={(e) => e.target.src = placeholderImage} // 대체 이미지로 변경
                />
            </div>
        </div>
    );
};

export default MultiMonitoring;
