import React, { useState } from 'react';
import './UserSettings.css';
import Cus1 from "../../assets/icons/cus-1.svg"; // Default profile image

const UserSettings = () => {
  const [formData, setFormData] = useState({
    userId: "sampleUserID",
    userName: "sampleUserName",
    email: "sample@example.com",
    password: "",
    birthDate: "1990-01-01",
    addr: "Sample Address",
    phone: "010-1234-5678",
    healthStatus: "Healthy",
    emergencyContact: "010-8765-4321"
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [profileImage, setProfileImage] = useState(null); // Profile image state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file)); // Local preview
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess("사용자 정보가 성공적으로 수정되었습니다.");
    setError("");
  };

  return (
    <div className="user-settings">
      <div className="user-settings-left">
        <div className="profile-image-container">
          <div className="profile-image-wrapper">
            <img
              src={profileImage || Cus1} // Set default profile image
              alt="Profile"
              className="profile-image"
            />
          </div>
          <div className="upload-button-wrapper">
            <label htmlFor="fileUpload" className="upload-button">프로필 이미지 업로드</label>
            <input type="file" id="fileUpload" onChange={handleImageUpload} style={{ display: 'none' }} />
          </div>
        </div>
        <h3>{formData.userId}</h3>
        <p>{formData.userName}</p>

        {/* 로그아웃 버튼 추가 */}
  <button className="logout-button" onClick={() => console.log("로그아웃")}>로그아웃</button>
      </div>

      <div className="user-settings-right">
        <h2>회원 정보 수정</h2>
        {success && <p className="success-message">{success}</p>}
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="userName">이름</label>
          <input type="text" id="userName" name="userName" value={formData.userName} onChange={handleChange} />

          <label htmlFor="email">이메일</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />

          <label htmlFor="password">비밀번호</label>
          <input type="password" id="password" name="password" placeholder="변경할 비밀번호를 입력해주세요." onChange={handleChange} />

          <label htmlFor="birthDate">생년월일</label>
          <input type="date" id="birthDate" name="birthDate" value={formData.birthDate} onChange={handleChange} />

          <label htmlFor="addr">주소</label>
          <input type="text" id="addr" name="addr" value={formData.addr} onChange={handleChange} />

          <label htmlFor="phone">휴대전화번호</label>
          <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} />

          <label htmlFor="healthStatus">건강상태</label>
          <textarea id="healthStatus" name="healthStatus" value={formData.healthStatus} onChange={handleChange}></textarea>

          <label htmlFor="emergencyContact">긴급연락망</label>
          <input type="tel" id="emergencyContact" name="emergencyContact" value={formData.emergencyContact} onChange={handleChange} />

          <button type="submit" className="save-button">수정하기</button>
        </form>
      </div>
    </div>
  );
};

export default UserSettings;
