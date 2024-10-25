import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import logo from '../../assets/logo2.png';  // 절대 경로 사용 또는 정확한 상대 경로 설정
import dashboardIcon from '../../assets/dashboardIcon.png';
import monitoringIcon from '../../assets/moniteringIcon.png';
import medicineIcon from '../../assets/medicineIcon.png';
import usersIcon from '../../assets/usersIcon.png';
import settingsIcon from '../../assets/SettingIcon.png';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">
        <img src={logo} alt="Logo" /> {/* 이미지 경로 수정 */}
      </div>

      <hr className="divider" />

      <div className="sidebar-nav">
        <ul>
          <li>
            <Link to="/dashboard" className="active">
              <img src={dashboardIcon} alt="Dashboard Icon" />
              대시보드
            </Link>
          </li>
          <li>
            <Link to="/monitoring">
              <img src={monitoringIcon} alt="Monitoring Icon" />
              낙상 관리
            </Link>
          </li>
          <li>
            <Link to="/medication">
              <img src={medicineIcon} alt="Medicine Icon" />
              복약 안내
            </Link>
          </li>
        </ul>

        <hr className="divider" />

        <ul>
          <li>
            <Link to="/customer-management">
              <img src={usersIcon} alt="Customer Management Icon" />
              고객 관리
            </Link>
          </li>
          <li>
            <Link to="/settings">
              <img src={settingsIcon} alt="Settings Icon" />
              설정
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
