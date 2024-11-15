import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import logo from "../../assets/icons/side-logo.svg";
import dashboardIcon from "../../assets/icons/side-home.svg";
import monitoringIcon from "../../assets/icons/side-monitor.svg";
import medicineIcon from "../../assets/icons/side-pill.svg";
import usersIcon from "../../assets/icons/side-customers.svg";
import settingsIcon from "../../assets/icons/side-setting.svg";
import approveIcon from "../../assets/icons/side-alltask.svg";
import multiMonitorIcon from "../../assets/icons/side-window.svg/"; // 새로운 아이콘 추가

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">
        <NavLink to="/dashboard">
          <img src={logo} alt="Logo" />
        </NavLink>
      </div>

      <hr className="divider" />

      <div className="sidebar-nav">
        <ul>
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <img src={dashboardIcon} alt="Dashboard Icon" />
              대시보드
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/monitoring"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <img src={monitoringIcon} alt="Monitoring Icon" />
              AI 모니터링
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/MultiMonitoringPage"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <img src={multiMonitorIcon} alt="Multi Monitoring Icon" />
              멀티 모니터링
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/medication"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <img src={medicineIcon} alt="Medicine Icon" />
              돌봄 일지
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/all-tasks"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <img src={approveIcon} alt="Approve Icon" />
              할일 목록
            </NavLink>
          </li>
        </ul>

        <hr className="divider" />

        <ul>
          <li>
            <NavLink
              to="/customer-management"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <img src={usersIcon} alt="Customer Management Icon" />
              돌봄 대상자
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/settings"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <img src={settingsIcon} alt="Settings Icon" />
              프로필 관리
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
