import React from 'react';
import './MedicationInfo.css'; // 스타일을 위한 CSS 파일 import

const MedicationInfo = () => {
  return (
    <div className="medication-info-container">
      <h1 className="medication-info-title">개별 약품 정보</h1>

      <table className="medication-info-table">
        <thead>
          <tr>
            <th>약품 이미지</th>
            <th className="medication-info-left-align">약품명/성분</th>
            <th className="medication-info-left-align">복약 안내</th>
            <th>투약량</th>
            <th>횟수</th>
            <th>일수</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><img src="https://via.placeholder.com/50" alt="약품 이미지" /></td>
            <td className="medication-info-left-align">타이레놀/아세트아미노펜</td>
            <td className="medication-info-left-align">식사 후 30분 내 복용</td>
            <td>500mg</td>
            <td>2회</td>
            <td>5일</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MedicationInfo;
