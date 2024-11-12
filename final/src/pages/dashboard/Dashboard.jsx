import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import Workspace from "../../components/Workspace/Workspace";
import VideoStream from "../../components/VideoStream/VideoStream";
import AlertMessages from "../../components/AlertMessages/AlertMessages";
import TodoList from "../../components/TodoList/TodoList";
import CustomCalendar from "../../components/Calendar/CustomCalendar";
import Notification from "../../components/Notification/Notification";
import NursingLog from "../../components/NursingLog/NursingLog";
import axios from "axios";
import dayjs from "dayjs";

const Dashboard = () => {
  const [latestAlert, setLatestAlert] = useState("");
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const videoip = import.meta.env.VITE_VIDEO_IP_MAIN;
  const completeVideoUrl = `http://${videoip}/video_feed`;

  useEffect(() => {
    const fetchLatestAlert = async () => {
      const token = localStorage.getItem("access_token");
      

      try {
        const serverip = import.meta.env.VITE_SERVER_IP;
        const response = await axios.get(`http://${serverip}:1252/main/alert`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
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
      <Workspace pageText="페이지 / 모니터링" mainText="메인 대시보드" />
      <div className="upper-section">
        <div className="left-content">
          <VideoStream videoStreamUrl={completeVideoUrl} />
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
        <CustomCalendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        <NursingLog selectedDate={selectedDate} />
          <TodoList selectedDate={selectedDate}/>
        </div>
      </div>
      <Notification message={latestAlert} />{" "}
      {/* Notification 컴포넌트에 latestAlert 전달 */}
    </div>
  );
};

export default Dashboard;
