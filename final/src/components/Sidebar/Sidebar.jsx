import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';
import logo from '../../../assets/SidebarIcons/logo2.png';
import dashboardIcon from '../../../assets/SidebarIcons/dashboardIcon.svg';
import monitoringIcon from '../../../assets/SidebarIcons/moniteringIcon.svg';
import medicineIcon from '../../../assets/SidebarIcons/medicineIcon.svg';
import usersIcon from '../../../assets/SidebarIcons/usersIcon.svg';
import settingsIcon from '../../../assets/SidebarIcons/SettingIcon.svg';
import approveIcon from '../../../assets/SidebarIcons/approveIcon.svg';

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
          <li>
            <NavLink to="/all-tasks" className={({ isActive }) => (isActive ? "active" : "")}>
              <img src={approveIcon} alt="Approve Icon" />
              상세 정보 {/* 경로 추가 */}
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
