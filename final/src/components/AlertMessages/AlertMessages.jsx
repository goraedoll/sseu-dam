// src/components/AlertMessages/AlertMessages.jsx
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
    axios
      .get("http://localhost:3001/alerts")
      .then((response) => {
        const data = response.data;

        const filteredAlerts = data
          .filter((alert) => alert.is_deleted === 0)
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 7);

        setAlerts(filteredAlerts);
        setDbError(false);
      })
      .catch((error) => {
        console.error("Failed to load data:", error);
        setDbError(true);
      });
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
              {alerts.map((alert) => (
                <tr key={alert.id}>
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
