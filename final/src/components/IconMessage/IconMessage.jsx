import React, { useEffect, useState } from "react";
import "./IconMessage.css";
import threeDot from "../../assets/icons/alert-threeDot.svg";
import cautionSign from "../../assets/images/state-caution.png";
import goodSign from "../../assets/images/state-good.png";
import noticeSign from "../../assets/images/state-notice.png";
import faker from "../../assets/images/faker.png";

const IconMessage = () => {
  const [alert, setAlert] = useState({});
  const [dbError, setDbError] = useState(false);

  useEffect(() => {
    // WebSocket 설정
    const serverip = import.meta.env.VITE_SERVER_IP;
    const ws = new WebSocket(`ws://${serverip}:1252/main/ws/alert`);

    ws.onopen = () => {
      console.log("WebSocket connection established");
      setDbError(false);
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        // 데이터 매핑
        const mappedAlert = {
          status: data.AlertType,
          message: data.SensingDetails,
        };

        setAlert(mappedAlert);
      } catch (error) {
        console.error("Failed to parse WebSocket message:", error);
        setDbError(true);
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      setDbError(true);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    // 컴포넌트가 언마운트될 때 WebSocket 연결 닫기
    return () => {
      ws.close();
    };
  }, []);

  // AlertType에 따른 이미지 선택 함수
  const getImageForAlertType = (alertType) => {
    if (alertType === "낙상 사고") {
      return noticeSign;
    } else if (alertType === "낙상 주의" || alertType === "욕창 주의") {
      return cautionSign;
    } else if (alertType === "요청 사항" || alertType === "복약 시간") {
      return goodSign;
    } else {
      return faker; // 기본 이미지
    }
  };

  return (
    <div className="icon-message-container">
      <div className="icon-message-title">
        <h1>안내 메세지</h1>
        <button className="mini-refresh-button">
          <img src={threeDot} alt="새로고침" />
        </button>
      </div>
      <div className="icon-message-contents">
        {dbError ? (
          <p>데이터를 불러오는 데 실패했습니다.</p>
        ) : (
          <div className="alert-item">
            <div>
              <img src={getImageForAlertType(alert.status)} alt="Alert Sign" />
            </div>
            <div>
              <h1>{alert.status}</h1>
            </div>
            <div>
              <p>{alert.message}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IconMessage;
