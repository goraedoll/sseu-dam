import React, { useState } from 'react';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    UserID: '',
    email: '',
    Phone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://192.168.20.6:1252/member/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        if (data.message) {
          window.location.href = data.message; // 응답받은 message의 value로 페이지 이동
        } else {
          alert('비밀번호 재설정 링크를 받을 수 없습니다. 다시 시도해주세요.');
        }
      } else {
        alert('비밀번호 재설정 요청에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('에러 발생:', error);
      alert('비밀번호 재설정 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="signup-container">
      <h2>비밀번호 재설정</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="UserID">아이디</label>
        <input
          type="text"
          id="UserID"
          name="UserID"
          placeholder="아이디을 입력해주세요."
          required
          value={formData.UserID}
          onChange={handleChange}
        />

        <label htmlFor="email">이메일</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="이메일을 입력해주세요."
          required
          value={formData.email}
          onChange={handleChange}
        />

        <label htmlFor="Phone">전화번호</label>
        <input
          type="tel"
          id="Phone"
          name="Phone"
          placeholder="010-1234-5678 형식으로 입력해주세요."
          pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
          required
          value={formData.Phone}
          onChange={handleChange}
        />

        <button type="submit" className="signup-button">확인</button>
      </form>
      <p className="login-prompt">
        이미 계정이 있으신가요? <a href="/login">로그인</a>
      </p>
    </div>
  );
};

export default ForgotPassword;