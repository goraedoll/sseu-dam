import React from 'react';
import './ForgotPassword.css';

const ForgotPassword = () => {
  return (
    <div className="forgot-password-container">
      <h2>비밀번호 찾기</h2>
      <form>
        <label htmlFor="name">이름</label>
        <input type="text" id="name" name="name" placeholder="이름을 입력해주세요." required />
        
        <label htmlFor="email">이메일</label>
        <input type="email" id="email" name="email" placeholder="이메일을 입력해주세요." required />
        
        <label htmlFor="phone">전화번호</label>
        <input type="tel" id="phone" name="phone" placeholder="010-1234-5678 형식으로 입력해주세요." pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}" required />
        
        <button type="submit" className="reset-password-button">비밀번호 재설정</button>
      </form>
      <p className="login-prompt">
        이미 계정이 있으신가요? <a href="/login">로그인</a>
      </p>
    </div>
  );
};

export default ForgotPassword;
