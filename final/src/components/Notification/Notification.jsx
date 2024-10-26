// Notification.jsx
import React, { useEffect } from 'react';
import './Notification.css';
import notificationSound from '../../../assets/notification-sound.mp3'; // 소리 파일 추가

const Notification = ({ message }) => {
  useEffect(() => {
    if (message) {
      // 알림 소리 재생
      const audio = new Audio(notificationSound);
      audio.play();
    }
  }, [message]);

  return (
    <div className={`notification ${message ? 'show' : ''}`}>
      {message}
    </div>
  );
};

export default Notification;
