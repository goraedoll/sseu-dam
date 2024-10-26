import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MiniAlertMessages.css';
import alertIcon1_1 from '../../../assets/alertIcon1_1.png';
import alertIcon1_2 from '../../../assets/alertIcon1_2.png';
import alertIcon1_3 from '../../../assets/alertIcon1_3.png';
import alertIcon2_4 from '../../../assets/alertIcon2_4.png';
import threeDot from '../../../assets/threeDot.svg';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear().toString().slice(-2); 
  const month = ('0' + (date.getMonth() + 1)).slice(-2); 
  const day = ('0' + date.getDate()).slice(-2); 
  const hours = ('0' + date.getHours()).slice(-2); 
  const minutes = ('0' + date.getMinutes()).slice(-2); 

  return `${year}.${month}.${day} ${hours}:${minutes}`;
};

const MiniAlertMessages = () => {
  const [alerts, setAlerts] = useState([]);
  const [dbError, setDbError] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3001/alerts')
      .then(response => {
        setAlerts(response.data);
        setDbError(false);
      })
      .catch(error => {
        console.error('Failed to load data:', error);
        setDbError(true);
      });
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case '낙상 사고':
        return alertIcon1_1;
      case '낙상 주의':
        return alertIcon1_2;
      case '복약 시간':
      case '요청 사항':
        return alertIcon1_3;
      default:
        return alertIcon2_4;
    }
  };

  const recentAlerts = alerts.slice(0, 3);

  return (
    <div className="mini-alert-container">
      {dbError ? (
        <div className="mini-alert-error">데이터베이스에 연결할 수 없습니다.</div>
      ) : (
        <>
          <div className="mini-alert-header">
            <h1 className="mini-h1">실시간 알림 메시지</h1>
            <button className="mini-refresh-button">
              <img src={threeDot} alt="새로고침" />
            </button>
          </div>

          <hr className="mini-divider" />
          
          <table className="mini-table">
            <tbody>
              {recentAlerts.map((alert) => (
                <tr key={alert.id}>
                  <td className="mini-status-cell">
                    <img src={getStatusIcon(alert.status)} alt="alert icon" />
                    <span>{alert.status}</span>
                  </td>
                  <td className="mini-td">{alert.message}</td>
                  <td className="mini-td">{formatDate(alert.date)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mini-bottom-margin"></div>
        </>
      )}
    </div>
  );
};

export default MiniAlertMessages;
