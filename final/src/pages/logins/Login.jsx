import React from 'react';
import './Login.css';
import logo from '../../../assets/logo.png'; // logo.png를 import
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-form">
        <button className="back-button">
          <span className="back-arrow">←</span> 뒤로 돌아가기
        </button>
        <h2>로그인</h2>
        <form>
          <label htmlFor="username">아이디</label>
          <input type="text" id="username" name="username" required placeholder="아이디를 입력해주세요." />
          
          <label htmlFor="password">비밀번호</label>
          <input type="password" id="password" name="password" required placeholder="비밀번호를 입력해 주세요." />
          
          <div className="form-options">
            <div className="left-group">
                <input type="checkbox" id="remember-me" />
                <label htmlFor="remember-me">로그인 상태 유지하기</label>
            </div>
            <a href="/forgot-password">비밀번호 찾기</a>
          </div>
          
          <button type="submit" className="login-button">로그인</button>
        </form>
        <p className="signup-prompt">
          아직 회원이 아니신가요? <Link to="/signup">지금 바로 회원가입</Link>
        </p>
      </div>
      <div className="login-image">
        <img src={logo} alt="Logo" className="logo-image" />    
        <p className="service-text">돌봄 서비스</p>
        <button className="info-button">
            <p className='first'>지금 바로 사용법 배우기</p>
            <p className='second'>sseu-dam.com</p>
        </button>
      </div>
    </div>
  );
};

export default Login;
