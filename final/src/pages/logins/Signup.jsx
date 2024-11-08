import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    UserID: "",
    UserName: "",
    email: "",
    password: "",
    BirthDate: "",
    Addr: "",
    phone: "",
    EmergencyContact: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://192.168.20.6:1252/member/signup', {
        UserID: formData.UserID,
        UserName: formData.UserName,
        email: formData.email,
        password: formData.password,
        BirthDate: formData.BirthDate,
        Addr: formData.Addr,
        Phone: formData.phone,

        EmergencyContact: formData.EmergencyContact
      });
      setSuccess(response.data.message);
      setError("");
      alert(response.data.message); // 성공 메시지 alert로 출력
      navigate('/'); // /dashboard로 페이지 이동
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
        <label htmlFor="UserID">아이디</label>
        <input
          type="text"
          id="UserID"
          name="UserID"
          placeholder="아이디를 입력해주세요."
          required
          onChange={handleChange}
        />

        <label htmlFor="UserName">이름</label>
        <input
          type="text"
          id="UserName"
          name="UserName"
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

        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="비밀번호를 입력해주세요."
          required
          onChange={handleChange}
        />

        <label htmlFor="BirthDate">생년월일</label>
        <input
          type="date"
          id="BirthDate"
          name="BirthDate"
          required
          onChange={handleChange}
        />

        <label htmlFor="Addr">주소</label>
        <input
          type="text"
          id="Addr"
          name="Addr"
          placeholder="주소를 입력해주세요."
          required
          onChange={handleChange}
        />

        <label htmlFor="phone">휴대전화번호</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          placeholder="010-1234-5678 형식으로 입력해주세요."
          pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
          required
          onChange={handleChange}
        />



        <label htmlFor="EmergencyContact">긴급연락망</label>
        <input
          type="tel"
          id="EmergencyContact"
          name="EmergencyContact"
          placeholder="010-1234-5678 형식으로 입력해주세요."
          pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
          required
          onChange={handleChange}
        />

        <button type="submit" className="signup-button">회원가입</button>
      </form>
    </div>
  );
};

export default Signup;
