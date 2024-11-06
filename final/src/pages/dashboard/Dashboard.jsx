import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import Workspace from "../../components/Workspace/Workspace";
import VideoStream from "../../components/VideoStream/VideoStream";
import AlertMessages from "../../components/AlertMessages/AlertMessages";
import TodoList from "../../components/TodoList/TodoList";
import CustomCalendar from "../../components/Calendar/CustomCalendar";
import Notification from "../../components/Notification/Notification";
import axios from "axios";

const Dashboard = () => {
  const [latestAlerts, setLatestAlerts] = useState([]);
  const [latestAlertMessage, setLatestAlertMessage] = useState("");

  useEffect(() => {
    const fetchLatestAlerts = async () => {
      try {
        // JWT 토큰을 localStorage에서 가져오기
        const token = localStorage.getItem("access_token");
        
        // 서버로 인증 요청 보내기
        const response = await axios.get("http://192.168.20.6:1252/main/alert", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        const alertData = response.data;

        // 최신 알림 데이터가 '응급 상황'인지 확인하여 메시지 설정
        if (alertData && alertData.length > 0 && alertData[0].AlertType === "응급 상황") {
          setLatestAlertMessage("응급 상황 발생! 주의하세요.");

          // 일정 시간 후에 알림 초기화
          setTimeout(() => {
            setLatestAlertMessage("");
          }, 5000); // 5초 후에 알림 지우기
        }

        setLatestAlerts(alertData);
      } catch (error) {
        console.error("최신 알림 가져오기 실패:", error);
      }
    };

    // 5초마다 최신 알림 가져오기
    const interval = setInterval(fetchLatestAlerts, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard-container">
      <Workspace pageText="페이지 / 모니터링" mainText="메인 대시보드" />
      <div className="upper-section">
        <div className="left-content">
          <VideoStream />
        </div>
        <div className="right-content">
          {/* AlertMessages 컴포넌트에 최신 알림 데이터 전달 */}
          <AlertMessages alerts={latestAlerts} />
        </div>
      </div>
      <div className="lower-section">
        <div>
          <h1 className="lower-section-title">간편 일지 관리</h1>
        </div>
        <div className="content-section">
          <CustomCalendar />
          <TodoList />
        </div>
      </div>
      <Notification message={latestAlertMessage} />{" "}
      {/* Notification 컴포넌트에 최신 알림 메시지 전달 */}
    </div>
  );
};

export default Dashboard;
