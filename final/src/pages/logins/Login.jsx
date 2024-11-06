import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Login.css";
import logo from "../../assets/images/login-logo.png";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const payload = {
      UserID: username,
      Password: password,
    };

    try {
      const response = await fetch("http://192.168.20.6:1252/member/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("access_token", data.access_token); // 토큰 저장
        alert(data.message); // 성공 메시지 출력
        navigate("/dashboard"); // 대시보드로 이동
      } else {
        const errorData = await response.json();
        setError(errorData.detail || "로그인 실패");
      }
    } catch (error) {
      console.error("로그인 중 오류 발생:", error);
      setError("서버와의 통신 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <button className="back-button">←ㅤ뒤로 돌아가기</button>
        <h2>로그인</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin}>
          <label htmlFor="username">아이디</label>
          <input
            type="text"
            id="username"
            name="username"
            required
            placeholder="아이디를 입력해주세요."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            name="password"
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
                onChange={(e) => setRememberMe(e.target.checked)} 
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
