import React, { useState } from 'react';
import axios from 'axios';
import "./Login.css";
import logo from "../../assets/images/login-logo.png"; 
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false); 

  const API_BASE_URL = 'http://192.168.20.6:1252/member/login'; // FastAPI URL

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(API_BASE_URL, {
        UserID: username,
        Password: password, // FastAPI에 맞춰 Password 필드로 수정
      });
      if (response.data.message === "로그인 성공") {
        alert("로그인 성공!");
        navigate("/home"); // 홈 페이지로 리다이렉트
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        const errorDetail = err.response.data.detail;
        if (errorDetail === "아이디 틀림") {
          setError("아이디가 틀렸습니다.");
        } else if (errorDetail === "비밀번호 틀림") {
          setError("비밀번호가 틀렸습니다.");
        }
      } else {
        setError("로그인 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <button className="back-button">←ㅤ뒤로 돌아가기</button>
        <h2>로그인</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">아이디</label>
          <input
            type="text"
            id="username"
            required
            placeholder="아이디를 입력해주세요."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            required
            placeholder="비밀번호를 입력해 주세요."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="form-options">
            <div className="left-group">
              <input
                type="checkbox"
                id="remember-me"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <label htmlFor="remember-me">로그인 상태 유지하기</label>
            </div>
            <Link to="/forgot-password" className="forgot-password-link">
              비밀번호 찾기
            </Link>
          </div>

          <button type="submit" className="login-button">
            로그인
          </button>
        </form>
        <p className="signup-prompt">
          아직 회원이 아니신가요? <Link to="/signup">지금 바로 회원가입</Link>
        </p>
      </div>
      <div className="login-image">
        <img src={logo} alt="Logo" className="logo-image" />
        <p className="service-text">돌봄 서비스</p>
        <button className="info-button">
          <p className="first">지금 바로 사용법 배우기</p>
          <p className="second">sseu-dam.com</p>
        </button>
      </div>
    </div>
  );
};

export default Login;