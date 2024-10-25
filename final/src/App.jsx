import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Login from './pages/logins/Login';
import Signup from './pages/logins/Signup';
import ForgotPassword from './pages/logins/ForgotPassword';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Monitoring from './pages/Monitoring';
import Medication from './pages/Medication';
import CustomerManagement from './pages/CustomerManagement';
import Settings from './pages/Settings';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          {/* 로그인, 회원가입, 비밀번호 찾기 경로 */}
          {/* 커밋용 수정 문구 */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* 사이드바가 포함된 모든 페이지 */}
          <Route path="/dashboard" element={
            <div className="layout">
              <Sidebar /> {/* 사이드바 */}
              <div className="content">
                <Dashboard /> {/* 대시보드 콘텐츠 */}
              </div>
            </div>
          } />

          <Route path="/monitoring" element={
            <div className="layout">
              <Sidebar /> {/* 사이드바 */}
              <div className="content">
                <Monitoring /> {/* 모니터링 콘텐츠 */}
              </div>
            </div>
          } />

          <Route path="/medication" element={
            <div className="layout">
              <Sidebar /> {/* 사이드바 */}
              <div className="content">
                <Medication /> {/* 복약 안내 콘텐츠 */}
              </div>
            </div>
          } />

          <Route path="/customer-management" element={
            <div className="layout">
              <Sidebar /> {/* 사이드바 */}
              <div className="content">
                <CustomerManagement /> {/* 고객 관리 콘텐츠 */}
              </div>
            </div>
          } />

          <Route path="/settings" element={
            <div className="layout">
              <Sidebar /> {/* 사이드바 */}
              <div className="content">
                <Settings /> {/* 설정 콘텐츠 */}
              </div>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
