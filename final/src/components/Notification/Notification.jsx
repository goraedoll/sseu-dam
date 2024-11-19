import React, { useState, useEffect, useRef } from "react";
import "./Notification.css";
import notificationSound from "../../assets/sounds/notification-sound.mp3";

const Notification = ({ message, duration = 5000 }) => {
  const [visible, setVisible] = useState(false);
  const [isInteractionAllowed, setIsInteractionAllowed] = useState(false);
  const audioRef = useRef(new Audio(notificationSound));

  // 사용자 상호작용 감지
  useEffect(() => {
    const handleInteraction = () => {
      setIsInteractionAllowed(true); // 상호작용이 발생하면 재생 허용
      document.removeEventListener("click", handleInteraction); // 이벤트 제거
    };

    document.addEventListener("click", handleInteraction);

    return () => {
      document.removeEventListener("click", handleInteraction);
    };
  }, []);

  useEffect(() => {
    if (message) {
      // 알림 표시
      setVisible(true);

      // 사운드 재생 (사용자 상호작용 이후에만 재생 허용)
      if (isInteractionAllowed) {
        audioRef.current.play().catch((err) => console.error("Audio error:", err));
      }

      // 일정 시간 후 알림 숨기기
      const timer = setTimeout(() => setVisible(false), duration);

      return () => clearTimeout(timer);
    }
  }, [message, duration, isInteractionAllowed]);

  return (
    <div className={`notification ${visible ? "show" : ""}`}>{message}</div>
  );
};

export default Notification;
