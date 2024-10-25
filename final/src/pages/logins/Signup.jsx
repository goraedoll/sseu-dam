import React from 'react';
import { Link } from 'react-router-dom';  // Link 컴포넌트 추가
import './Signup.css';

const Signup = () => {
  return (
    <div className="signup-container">
      <div className="signup-header">
        <h2>회원가입</h2>
        <Link to="/" className="home-button">홈으로 돌아가기</Link>
      </div>
      <form>
        <label htmlFor="userId">아이디</label>
        <input type="text" id="userId" name="userId" placeholder="아이디를 입력해주세요." required />

        <label htmlFor="userName">이름</label>
        <input type="text" id="userName" name="userName" placeholder="이름을 입력해주세요." required />

        <label htmlFor="email">이메일</label>
        <input type="email" id="email" name="email" placeholder="이메일을 입력해주세요." required />

        <label htmlFor="password">비밀번호</label>
        <input type="password" id="password" name="password" placeholder="비밀번호를 입력해주세요." required />

        <label htmlFor="birthDate">생년월일</label>
        <input type="date" id="birthDate" name="birthDate" required />

        <label htmlFor="addr">주소</label>
        <input type="text" id="addr" name="addr" placeholder="주소를 입력해주세요." required />

        <label htmlFor="phone">휴대전화번호</label>
        <input type="tel" id="phone" name="phone" placeholder="010-1234-5678 형식으로 입력해주세요." pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}" required />

        <label htmlFor="healthStatus">건강상태</label>
        <textarea id="healthStatus" name="healthStatus" placeholder="건강 상태를 입력해주세요." required></textarea>

        <label htmlFor="emergencyContact">긴급연락망</label>
        <input type="tel" id="emergencyContact" name="emergencyContact" placeholder="010-1234-5678 형식으로 입력해주세요." pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}" required />

        <button type="submit" className="signup-button">회원가입</button>
      </form>
    </div>
  );
};

export default Signup;
