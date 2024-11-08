import React, { useState } from 'react';
import axios from 'axios';
import './ForgotPassword.css';
import { API_BASE_URL } from '../../config'; // config.js 경로에 맞게 import

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/forgot-password`, {
        UserID: formData.name,
        email: formData.email,
        phone: formData.phone
      });
      setMessage(response.data.message);
      setError("");
    } catch (err) {
      if (err.response && err.response.status === 400) {
        const errorDetail = err.response.data.detail;
        if (errorDetail.includes("폰 번호")) {
          setError("전화번호가 일치하지 않습니다.");
        } else if (errorDetail.includes("이메일")) {
          setError("이메일이 일치하지 않습니다.");
        } else if (errorDetail.includes("아이디")) {
          setError("아이디가 일치하지 않습니다.");
        }
      } else {
        setError("비밀번호 재설정 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>비밀번호 찾기</h2>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">이름</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="이름을 입력해주세요."
          required
          onChange={handleChange}
        />
        
        <label htmlFor="email">이메일</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="이메일을 입력해주세요."
          required
          onChange={handleChange}
        />
        
        <label htmlFor="phone">전화번호</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          placeholder="010-1234-5678 형식으로 입력해주세요."
          pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
          required
          onChange={handleChange}
        />
        
        <button type="submit" className="reset-password-button">비밀번호 재설정</button>
      </form>
      <p className="login-prompt">
        이미 계정이 있으신가요? <a href="/login">로그인</a>
      </p>
    </div>
  );
};

export default ForgotPassword;
