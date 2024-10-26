import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AlertMessages.css';
import alertIcon1_1 from '../../assets/alertIcon1_1.png'; 
import alertIcon1_2 from '../../assets/alertIcon1_2.png';
import alertIcon1_3 from '../../assets/alertIcon1_3.png';
import alertIcon2_1 from '../../assets/alertIcon2_1.png';
import alertIcon2_2 from '../../assets/alertIcon2_2.png';
import alertIcon2_3 from '../../assets/alertIcon2_3.png';
import alertIcon2_4 from '../../assets/alertIcon2_4.png';
import threeDot from '../../assets/threeDot.svg';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear().toString().slice(-2); 
  const month = ('0' + (date.getMonth() + 1)).slice(-2); 
  const day = ('0' + date.getDate()).slice(-2); 
  const hours = ('0' + date.getHours()).slice(-2); 
  const minutes = ('0' + date.getMinutes()).slice(-2); 

  return `${year}.${month}.${day} ${hours}:${minutes}`;
};

const AlertMessages = () => {
  const [alerts, setAlerts] = useState([]);
  const [dbError, setDbError] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3001/alerts')
      .then(response => {
        const data = response.data;

        // 'is_deleted'가 0인 항목만 필터링하고 최신 순으로 정렬
        const filteredAlerts = data
          .filter(alert => alert.is_deleted === 0) // 삭제되지 않은 항목만
          .sort((a, b) => new Date(b.date) - new Date(a.date)) // 날짜 내림차순 정렬
          .slice(0, 7); // 상위 7개만 가져오기

        setAlerts(filteredAlerts);
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

  return (
    <div className="alert-container">
      {dbError ? (
        <div className="alert-error">데이터베이스에 연결할 수 없습니다.</div>
      ) : (
        <>
          <div className="alert-header">
            <h1>실시간 알림 메시지</h1>
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
                    <img src={getStatusIcon(alert.status)} alt="alert icon" />
                    <span>{alert.status}</span>
                  </td>
                  <td>{alert.message}</td>
                  <td>{formatDate(alert.date)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className='bottomMargin'></div>
        </>
      )}
    </div>
  );
};

export default AlertMessages;
