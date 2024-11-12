import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AlertMessages.css";
import threeDot from "../../assets/icons/alert-threeDot.svg";
import getStatusIcon from "./utils/iconMapper";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear().toString().slice(-2);
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  const hours = ("0" + date.getHours()).slice(-2);
  const minutes = ("0" + date.getMinutes()).slice(-2);

  return `${year}.${month}.${day} ${hours}:${minutes}`;
};

const AlertMessages = () => {
  const [alerts, setAlerts] = useState([]);
  const [dbError, setDbError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("access_token");
      const serverip = import.meta.env.VITE_SERVER_IP;


      try {
        const response = await axios.get(`http://${serverip}:1252/main/alert`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data;

        // 데이터 형식에 맞춰 필드를 매핑하고 필터링 및 정렬 수행
        const mappedAlerts = data
          .map((alert) => ({
            status: alert.AlertType,
            message: alert.SensingDetails,
            date: alert.SensedAt,
          }))
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 7);

        setAlerts(mappedAlerts);
        setDbError(false);
      } catch (error) {
        console.error("Failed to load data:", error);
        setDbError(true);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="alert-container">
      {dbError ? (
        <div className="alert-error">데이터베이스에 연결할 수 없습니다.</div>
      ) : (
        <>
          <div className="alert-header">
            <h1>알림 현황</h1>
            <button className="refresh-button">
              <img src={threeDot} alt="새로고침" />
            </button>
          </div>
          <table>
            <thead>
              <tr>
                <th>상태</th>
                <th>내용</th>
                <th>날짜</th>
              </tr>
            </thead>

            <tbody>
              {alerts.map((alert, index) => (
                <tr key={index}>
                  <td className="status-cell">
                    <img
                      src={getStatusIcon(alert.status, "status")}
                      alt="alert icon"
                    />
                    <span>{alert.status}</span>
                  </td>
                  <td>
                    <img
                      src={getStatusIcon(alert.message, "message")}
                      alt="alert icon"
                    />
                    <span>{alert.message}</span>
                  </td>
                  <td>{formatDate(alert.date)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="bottomMargin"></div>
        </>
      )}
    </div>
  );
};

export default AlertMessages;
