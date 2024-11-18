import React, { useEffect, useState } from "react";
import "./IconMessage.css";
import threeDot from "../../assets/icons/alert-threeDot.svg";
import cautionSign from "../../assets/icons/icon-caution.svg";
import checkSign from "../../assets/icons/icon-check.svg";
import clockSign from "../../assets/icons/icon-clock.svg";
import bulbSign from "../../assets/icons/icon-bulb.svg";
import noticeSign from "../../assets/icons/icon-notice.svg";

const IconMessage = () => {
  const [alert, setAlert] = useState({});
  const [dbError, setDbError] = useState(false);

  useEffect(() => {
    // WebSocket 설정
    const serverip = import.meta.env.VITE_SERVER_IP;
    const token = localStorage.getItem("access_token");
    const ws = new WebSocket(
      `ws://${serverip}:1252/main/ws/alert?token=${token}`
    );

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
    switch (alertType) {
      case "낙상 사고":
        return noticeSign;
      case "낙상 주의":
      case "욕창 주의":
        return cautionSign;
      case "요청 사항":
        return bulbSign;
      case "복약 시간":
        return clockSign;
      default:
        return checkSign; // 기본 이미지
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
