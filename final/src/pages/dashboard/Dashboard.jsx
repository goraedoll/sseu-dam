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
  const [latestAlert, setLatestAlert] = useState("");

  useEffect(() => {
    const fetchLatestAlert = async () => {
      try {
        const response = await axios.get("http://localhost:3001/latest-alert");
        const alertData = response.data;

        if (alertData && alertData.status === "응급 상황") {
          setLatestAlert("응급 상황 발생! 주의하세요.");

          // 일정 시간 후에 알림 초기화
          setTimeout(() => {
            setLatestAlert("");
          }, 5000); // 5초 후에 알림 지우기
        }
      } catch (error) {
        console.error("최신 알림 가져오기 실패:", error);
      }
    };

    const interval = setInterval(fetchLatestAlert, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard-container">
      <Workspace pageText="페이지/모니터링" mainText="메인 대시보드" />
      <div className="upper-section">
        <div className="left-content">
          <VideoStream />
        </div>
        <div className="right-content">
          <AlertMessages />
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
      <Notification message={latestAlert} />{" "}
      {/* Notification 컴포넌트에 latestAlert 전달 */}
    </div>
  );
};

export default Dashboard;
