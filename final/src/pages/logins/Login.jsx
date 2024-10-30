import React from "react";
import "./Login.css";
import logo from "../../assets/images/login-logo.png"; // logo.png를 import
import { Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false); // 로그인 상태 유지 상태 추가

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
        UserID: username,
        PasswordHash: password,
      });
      if (response.data.message === "로그인 성공") {
        alert("로그인 성공!");
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        const errorDetail = err.response.data.detail;
        if (errorDetail.includes("아이디")) {
          setError("아이디가 틀렸습니다.");
        } else if (errorDetail.includes("비밀번호")) {
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
            name="username"
            required
            placeholder="아이디를 입력해주세요."
          />

          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            placeholder="비밀번호를 입력해 주세요."
          />

          <div className="form-options">
            <div className="left-group">
              <input type="checkbox" id="remember-me" />
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
