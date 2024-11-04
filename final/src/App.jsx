import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Logins/Login";
import Signup from "./pages/Logins/Signup";
import ForgotPassword from "./pages/Logins/ForgotPassword";
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./pages/dashboard/Dashboard";
import Monitoring from "./pages/Monitoring/Monitoring";
import Medication from "./pages/Medication/Medication";
import CustomerManagement from "./pages/CustomerManagement/CustomerManagement";
import Settings from "./pages/SettingPage/Settings";
import AllTasks from "./pages/AllTasksPage/AllTasksPage";
import MultiMonitoringPage from "./pages/MultiMonitoringPage/MultiMonitoringPage";
import Notification from "./components/Notification/Notification"; // 알림 컴포넌트 import
import "./App.css";

function App() {
  const [notification, setNotification] = useState("");

  // 알림 표시 함수
  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(""); // 10초 후 알림 자동 사라짐
    }, 10000);
  };

  return (
    <Router>
      <div className="app-container">
        {/* 알림 컴포넌트는 항상 화면에 렌더링 */}
        <Notification message={notification} />

        <Routes>
          {/* 로그인, 회원가입, 비밀번호 찾기 경로 */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* 사이드바가 포함된 모든 페이지 */}
          <Route
            path="/dashboard"
            element={
              <div className="layout">
                <Sidebar />
                <div className="content">
                  <Dashboard showNotification={showNotification} />
                </div>
              </div>
            }
          />

          <Route
            path="/monitoring"
            element={
              <div className="layout">
                <Sidebar />
                <div className="content">
                  <Monitoring showNotification={showNotification} />
                </div>
              </div>
            }
          />

          <Route
            path="/medication"
            element={
              <div className="layout">
                <Sidebar />
                <div className="content">
                  <Medication showNotification={showNotification} />
                </div>
              </div>
            }
          />

          <Route
            path="/customer-management"
            element={
              <div className="layout">
                <Sidebar />
                <div className="content">
                  <CustomerManagement showNotification={showNotification} />
                </div>
              </div>
            }
          />

          <Route
            path="/settings"
            element={
              <div className="layout">
                <Sidebar />
                <div className="content">
                  <Settings showNotification={showNotification} />
                </div>
              </div>
            }
          />

          <Route
            path="/all-tasks"
            element={
              <div className="layout">
                <Sidebar />
                <div className="content">
                  <AllTasks showNotification={showNotification} />
                </div>
              </div>
            }
          />

          <Route
            path="/MultiMonitoringPage"
            element={
              <div className="layout">
                <Sidebar />
                <div className="content">
                  <MultiMonitoringPage showNotification={showNotification} />
                </div>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
