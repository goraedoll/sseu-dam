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
  const [latestAlert, setLatestAlert] = useState(""); // 알림 상태
  const [selectedDate, setSelectedDate] = useState(dayjs()); // 선택한 날짜
  const video_ip = import.meta.env.VITE_VIDEO_IP_MAIN; // 환경 변수에서 가져온 비디오 IP
  console.log(video_ip);
  const completeVideoUrl = `http://${video_ip}:1997/video_feed`; // 비디오 URL

  useEffect(() => {
    const fetchLatestAlert = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        console.error("토큰이 없습니다. 로그인이 필요합니다.");
        return;
      }

      try {
        const serverip = import.meta.env.VITE_SERVER_IP;
        const response = await axios.get(`http://${serverip}:1252/main/alert`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // 서버 응답 데이터 확인
        const alertDataArray = response.data;
        console.log("서버에서 반환된 알림 데이터:", alertDataArray);

        if (Array.isArray(alertDataArray) && alertDataArray.length > 0) {
          // 가장 최근 데이터 가져오기
          const latestAlertData = alertDataArray.sort(
            (a, b) => new Date(b.SensedAt) - new Date(a.SensedAt)
          )[0]; // 최신 데이터 한 건 선택

          if (latestAlertData && latestAlertData.AlertType === "낙상 사고") {
            console.log("가장 최근의 낙상 사고 알림 데이터:", latestAlertData);
            setLatestAlert(latestAlertData.SensingDetails);

            // 일정 시간 후 알림 숨기기
            setTimeout(() => {
              setLatestAlert(""); // 알림 초기화
            }, 5000);
          } else {
            console.log("최근 알림은 낙상 사고가 아닙니다.");
            setLatestAlert(""); // 낙상 사고가 아니면 알림 초기화
          }
        }
      } catch (error) {
        console.error("최신 알림 가져오기 실패:", error);
      }
    };

    // 5초 간격으로 알림 가져오기
    const interval = setInterval(fetchLatestAlert, 5000);
    return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 제거
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
          <TodoList selectedDate={selectedDate} />
        </div>
      </div>
      <Notification message={latestAlert} />
    </div>
  );
};

export default Dashboard;
