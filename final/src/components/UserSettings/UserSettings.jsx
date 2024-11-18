import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios
import "./UserSettings.css";
// import Cus1 from "../../assets/icons/cus-1.svg"; // Default profile image
import profile_image from "../../assets/icons/set-profile.svg"; // Default profile image

const serverip = import.meta.env.VITE_SERVER_IP;
const BASE_URL = `http://${serverip}:1252`; // Replace with your actual API URL

const UserSettings = () => {
  const [formData, setFormData] = useState({
    UserID: "",
    UserName: "",
    email: "",
    password: "",
    BirthDate: "",
    Addr: "",
    Phone: "",
    EmergencyContact: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [profileImage, setProfileImage] = useState(null); // Profile image state
  const navigate = useNavigate();

  // Fetch user info from the API
  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem("access_token");
      try {
        const response = await axios.get(`${BASE_URL}/user_info/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFormData({
          UserID: response.data.UserID,
          UserName: response.data.UserName,
          email: response.data.email,
          password: response.data.password,
          BirthDate: response.data.BirthDate,
          Addr: response.data.Addr,
          Phone: response.data.Phone,
          EmergencyContact: response.data.EmergencyContact,
        });
      } catch (error) {
        console.error("Error fetching user info:", error);
        setError("사용자 정보를 가져오는데 실패했습니다.");
      }
    };

    fetchUserInfo();
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("access_token");

    try {
      const response = await axios.put(
        `${BASE_URL}/user_info/update`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.message === "수정 완료") {
        alert("수정 완료");
        setSuccess("사용자 정보가 성공적으로 수정되었습니다.");
      } else {
        setError("수정 중 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("Error updating user info:", error);
      setError("사용자 정보를 수정하는 데 실패했습니다.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token"); // Remove token from local storage
    navigate("/"); // Redirect to login page
  };

  return (
    <div className="user-settings">
      <div className="user-settings-left">
        <div className="profile-image-container">
          <div className="profile-image-wrapper">
            <img
              src={profileImage || profile_image} // Set default profile image
              alt="Profile"
              className="profile-image"
            />
          </div>
          <div className="upload-button-wrapper">
            <label htmlFor="fileUpload" className="upload-button">
              프로필 이미지 업로드
            </label>
            <input
              type="file"
              id="fileUpload"
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />
          </div>
        </div>
        <h2 className="user-name">{formData.UserName}</h2>
        <h3 className="user-id">@{formData.UserID}</h3>

        {/* 로그아웃 버튼 추가 */}
        <button className="logout-button" onClick={handleLogout}>
          로그아웃
        </button>
      </div>

      <div className="user-settings-right">
        <h2>회원 정보 수정</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="UserName">이름</label>
          <input
            type="text"
            id="UserName"
            name="UserName"
            value={formData.UserName}
            onChange={handleChange}
          />

          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="변경할 비밀번호를 입력해주세요."
            onChange={handleChange}
          />

          <label htmlFor="BirthDate">생년월일</label>
          <input
            type="date"
            id="BirthDate"
            name="BirthDate"
            value={formData.BirthDate}
            onChange={handleChange}
          />

          <label htmlFor="Addr">주소</label>
          <input
            type="text"
            id="Addr"
            name="Addr"
            value={formData.Addr}
            onChange={handleChange}
          />

          <label htmlFor="Phone">휴대전화</label>
          <input
            type="tel"
            id="Phone"
            name="Phone"
            value={formData.Phone}
            onChange={handleChange}
          />

          <label htmlFor="EmergencyContact">긴급연락망</label>
          <input
            type="tel"
            id="EmergencyContact"
            name="EmergencyContact"
            value={formData.EmergencyContact}
            onChange={handleChange}
          />

          <button type="submit" className="save-button">
            수정하기
          </button>
          {success && <p className="success-message">{success}</p>}
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default UserSettings;
