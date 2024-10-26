import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import Workspace from '../components/Workspace';
import VideoStream from '../components/VideoStream';
import AlertMessages from '../components/AlertMessages';
import TodoList from '../components/TodoList';
import CustomCalendar from '../components/Calendar/CustomCalendar';
import axios from 'axios'; // axios로 API 호출

const Dashboard = ({ showNotification }) => {
  const [latestAlert, setLatestAlert] = useState(null);

  useEffect(() => {
    // 주기적으로 최신 알림을 가져오는 함수
    const fetchLatestAlert = async () => {
      try {
        const response = await axios.get('http://localhost:3001/latest-alert'); // 최신 알림 가져오기
        const alertData = response.data;

        // 알림의 상태가 '응급 상황'이면 알림을 표시
        if (alertData && alertData.status === '응급 상황') {
          showNotification('응급 상황 발생! 주의하세요.');
        } else {
          showNotification(''); // 다른 상태면 알림을 제거
        }

        setLatestAlert(alertData);
      } catch (error) {
        console.error('최신 알림 가져오기 실패:', error);
      }
    };

    // 5초마다 최신 알림을 가져오는 주기 설정
    const interval = setInterval(fetchLatestAlert, 5000);

    // 컴포넌트가 unmount될 때 interval 정리
    return () => clearInterval(interval);
  }, [showNotification]);

  return (
    <div className="dashboard-container">
      <Workspace pageText="페이지/모니터링" mainText="모니터링 대시보드" />
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
          <h1 className='lower-section-title'>간편 일지 관리</h1>
        </div>
        <div className="content-section">
          <CustomCalendar />
          <TodoList />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
