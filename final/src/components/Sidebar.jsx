import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';
import logo from '../../assets/logo2.png';
import dashboardIcon from '../../assets/dashboardIcon.png';
import monitoringIcon from '../../assets/moniteringIcon.png';
import medicineIcon from '../../assets/medicineIcon.png';
import usersIcon from '../../assets/usersIcon.png';
import settingsIcon from '../../assets/SettingIcon.png';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>

      <hr className="divider" />

      <div className="sidebar-nav">
        <ul>
          <li>
            <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "active" : "")}>
              <img src={dashboardIcon} alt="Dashboard Icon" />
              대시보드
            </NavLink>
          </li>
          <li>
            <NavLink to="/monitoring" className={({ isActive }) => (isActive ? "active" : "")}>
              <img src={monitoringIcon} alt="Monitoring Icon" />
              낙상 관리
            </NavLink>
          </li>
          <li>
            <NavLink to="/medication" className={({ isActive }) => (isActive ? "active" : "")}>
              <img src={medicineIcon} alt="Medicine Icon" />
              복약 안내
            </NavLink>
          </li>
        </ul>

        <hr className="divider" />

        <ul>
          <li>
            <NavLink to="/customer-management" className={({ isActive }) => (isActive ? "active" : "")}>
              <img src={usersIcon} alt="Customer Management Icon" />
              고객 관리
            </NavLink>
          </li>
          <li>
            <NavLink to="/settings" className={({ isActive }) => (isActive ? "active" : "")}>
              <img src={settingsIcon} alt="Settings Icon" />
              설정
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
