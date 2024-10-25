import React from 'react';
<<<<<<< HEAD
import { NavLink } from 'react-router-dom';
=======
import { NavLink } from 'react-router-dom'; // Link 대신 NavLink 사용
>>>>>>> 876d9b8e031bb048e07b448d9615e15cfad86ed0
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
<<<<<<< HEAD
            <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "active" : "")}>
=======
            <NavLink to="/dashboard" activeClassName="active">
>>>>>>> 876d9b8e031bb048e07b448d9615e15cfad86ed0
              <img src={dashboardIcon} alt="Dashboard Icon" />
              대시보드
            </NavLink>
          </li>
          <li>
<<<<<<< HEAD
            <NavLink to="/monitoring" className={({ isActive }) => (isActive ? "active" : "")}>
=======
            <NavLink to="/monitoring" activeClassName="active">
>>>>>>> 876d9b8e031bb048e07b448d9615e15cfad86ed0
              <img src={monitoringIcon} alt="Monitoring Icon" />
              낙상 관리
            </NavLink>
          </li>
          <li>
<<<<<<< HEAD
            <NavLink to="/medication" className={({ isActive }) => (isActive ? "active" : "")}>
=======
            <NavLink to="/medication" activeClassName="active">
>>>>>>> 876d9b8e031bb048e07b448d9615e15cfad86ed0
              <img src={medicineIcon} alt="Medicine Icon" />
              복약 안내
            </NavLink>
          </li>
        </ul>

        <hr className="divider" />

        <ul>
          <li>
<<<<<<< HEAD
            <NavLink to="/customer-management" className={({ isActive }) => (isActive ? "active" : "")}>
=======
            <NavLink to="/customer-management" activeClassName="active">
>>>>>>> 876d9b8e031bb048e07b448d9615e15cfad86ed0
              <img src={usersIcon} alt="Customer Management Icon" />
              고객 관리
            </NavLink>
          </li>
          <li>
<<<<<<< HEAD
            <NavLink to="/settings" className={({ isActive }) => (isActive ? "active" : "")}>
=======
            <NavLink to="/settings" activeClassName="active">
>>>>>>> 876d9b8e031bb048e07b448d9615e15cfad86ed0
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
