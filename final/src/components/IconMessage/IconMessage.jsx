import React, { useEffect, useState } from "react";
import "./IconMessage.css";
import threeDot from "../../assets/icons/alert-threeDot.svg";
import cautionSign from "../../assets/icons/icon-caution.svg";
import checkSign from "../../assets/icons/icon-check.svg";
import clockSign from "../../assets/icons/icon-clock.svg";
import bulbSign from "../../assets/icons/icon-bulb.svg";
import noticeSign from "../../assets/icons/icon-notice.svg";

const IconMessage = () => {
  const [alert, setAlert] = useState({}); // WebSocket 메시지 상태
  const [dbError, setDbError] = useState(false); // 데이터 오류 여부
  const [wsConnected, setWsConnected] = useState(false); // WebSocket 연결 상태

  useEffect(() => {
    const serverip = import.meta.env.VITE_SERVER_IP; // 환경 변수에서 WebSocket 서버 IP 가져오기
    const token = localStorage.getItem("access_token"); // LocalStorage에서 토큰 가져오기
    let ws; // WebSocket 인스턴스 선언
    let reconnectInterval; // 재연결을 위한 Interval 변수

    const connectWebSocket = () => {
      ws = new WebSocket(`ws://${serverip}:1252/main/ws/alert?token=${token}`);

      ws.onopen = () => {
        console.log("WebSocket connection established");
        setDbError(false); // 데이터 오류 상태 초기화
        setWsConnected(true); // WebSocket 연결 상태 업데이트
        clearInterval(reconnectInterval); // 재연결 Interval 중지
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data); // 수신된 WebSocket 메시지 파싱
          console.log("WebSocket message received:", data); // 수신 데이터 확인

          // 데이터 매핑
          const mappedAlert = {
            status: data.AlertType || "Unknown", // AlertType 기본값 설정
            message: data.SensingDetails || "No details available", // SensingDetails 기본값 설정
          };

          setAlert(mappedAlert); // 상태 업데이트
        } catch (error) {
          console.error("Failed to parse WebSocket message:", error);
          setDbError(true); // 데이터 오류 상태 설정
        }
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error); // WebSocket 오류 로그
        setDbError(true); // 데이터 오류 상태 설정
        setWsConnected(false); // WebSocket 연결 상태 업데이트
      };

      // ws.onclose = () => {
      //   console.log("WebSocket connection closed");
      //   setWsConnected(false); // WebSocket 연결 상태 업데이트

      //   // WebSocket이 닫힌 경우 5초 후 재연결 시도
      //   reconnectInterval = setInterval(() => {
      //     console.log("Attempting to reconnect WebSocket...");
      //     connectWebSocket();
      //   }, 5000);
      // };
    };

    connectWebSocket(); // WebSocket 연결 시작

    // 컴포넌트가 언마운트될 때 WebSocket 연결 닫기
    return () => {
      ws?.close(); // WebSocket 연결 닫기
      clearInterval(reconnectInterval); // 재연결 Interval 제거
    };
  }, []); // 빈 의존성 배열로 설정하여 마운트 시에만 실행

  // 상태 업데이트 감지 및 디버깅
  useEffect(() => {
    console.log("Alert state updated:", alert); // 상태 업데이트 확인
  }, [alert]);

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
              {/* 상태가 비어있을 때 기본 이미지와 기본 문구 표시 */}
              {alert.status ? (
                <img src={getImageForAlertType(alert.status)} alt="Alert Sign" />
              ) : (
                <img src={checkSign} alt="Default Alert Sign" />
              )}
            </div>
            <div>
              <h1>{alert.status || "AI 감지 중"}</h1> {/* 상태가 없으면 기본 메시지 표시 */}
            </div>
            <div>
              <p>
                {alert.message || "실시간 감지를 대기중입니다"}{" "}
                {/* 세부 메시지가 없으면 기본 메시지 표시 */}
              </p>
            </div>
          </div>
        )}
        <p
          className={`connection-status ${
            wsConnected ? "connected" : "disconnected"
          }`}
        >
          {wsConnected ? "WebSocket 연결됨" : "WebSocket 연결 끊김"}
        </p>
      </div>
    </div>
  );
};

export default IconMessage;
