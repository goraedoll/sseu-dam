import React, { useEffect } from "react";
import "./Notification.css";
import notificationSound from "../../assets/sounds/notification-sound.mp3";

const Notification = ({ message }) => {
  useEffect(() => {
    if (message) {
      const audio = new Audio(notificationSound);
      audio.play();

      // 일정 시간 후 알림 제거
      const timer = setTimeout(() => {
        document.querySelector(".notification").classList.remove("show");
      }, 5000); // 5초 후에 알림 숨기기

      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className={`notification ${message ? "show" : ""}`}>{message}</div>
  );
};

export default Notification;
