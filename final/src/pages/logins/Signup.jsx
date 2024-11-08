import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../../config.js'; // API_BASE_URL을 직접 import

const Signup = () => {
  const [formData, setFormData] = useState({
    userId: "",
    userName: "",
    email: "",
    password: "",
    birthDate: "",
    addr: "",
    phone: "",
    healthStatus: "",
    emergencyContact: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/signup`, {
        UserID: formData.userId,
        UserName: formData.userName,
        email: formData.email,
        PasswordHash: formData.password,
        BirthDate: formData.birthDate,
        Addr: formData.addr,
        Phone: formData.phone,
        HealthStatus: formData.healthStatus,
        EmergencyContact: formData.emergencyContact,
        JoinedAt: new Date().toISOString()
      });
      setSuccess(response.data.message);
      setError("");
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setError(err.response.data.detail);
      } else {
        setError("회원가입 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-header">
        <h2>회원가입</h2>
        <Link to="/" className="home-button">홈으로 돌아가기</Link>
      </div>
      {success && <p className="success-message">{success}</p>}
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="userId">아이디</label>
        <input type="text" id="userId" name="userId" placeholder="아이디를 입력해주세요." required onChange={handleChange} />

        <label htmlFor="userName">이름</label>
        <input type="text" id="userName" name="userName" placeholder="이름을 입력해주세요." required onChange={handleChange} />

        <label htmlFor="email">이메일</label>
        <input type="email" id="email" name="email" placeholder="이메일을 입력해주세요." required onChange={handleChange} />

        <label htmlFor="password">비밀번호</label>
        <input type="password" id="password" name="password" placeholder="비밀번호를 입력해주세요." required onChange={handleChange} />

        <label htmlFor="birthDate">생년월일</label>
        <input type="date" id="birthDate" name="birthDate" required onChange={handleChange} />

        <label htmlFor="addr">주소</label>
        <input type="text" id="addr" name="addr" placeholder="주소를 입력해주세요." required onChange={handleChange} />

        <label htmlFor="phone">휴대전화번호</label>
        <input type="tel" id="phone" name="phone" placeholder="010-1234-5678 형식으로 입력해주세요." pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}" required onChange={handleChange} />

        <label htmlFor="healthStatus">건강상태</label>
        <textarea id="healthStatus" name="healthStatus" placeholder="건강 상태를 입력해주세요." required onChange={handleChange}></textarea>

        <label htmlFor="emergencyContact">긴급연락망</label>
        <input type="tel" id="emergencyContact" name="emergencyContact" placeholder="010-1234-5678 형식으로 입력해주세요." pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}" required onChange={handleChange} />

        <button type="submit" className="signup-button">회원가입</button>
      </form>
    </div>
  );
};

export default Signup;
