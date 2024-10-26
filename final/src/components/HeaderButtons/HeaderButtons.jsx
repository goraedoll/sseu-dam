import React from 'react';
import './HeaderButtons.css';
import searchIcon from '../../../assets/buttonIcon0.png'; // 검색 아이콘 경로
import alarmIcon from '../../../assets/buttonIcon1.png'; // 알람 아이콘 경로
import darkModeIcon from '../../../assets/buttonIcon2.png'; // 다크모드 아이콘 경로
import infoIcon from '../../../assets/buttonIcon3.png'; // 정보 아이콘 경로
import profileIcon from '../../../assets/Avatar1.png'; // 프로필 이미지 경로

const HeaderButtons = () => {
  return (
    <div className="header-buttons-container">
      <input
        type="text"
        className="search-bar"
        placeholder="Search"
        style={{ backgroundImage: `url(${searchIcon})` }}
      />
      <button className="icon-button">
        <img src={alarmIcon} alt="Alarm Icon" />
      </button>
      <button className="icon-button dark-mode-icon"> {/* dark-mode-icon 클래스 추가 */}
        <img src={darkModeIcon} alt="Dark Mode Icon" />
      </button>
      <button className="icon-button">
        <img src={infoIcon} alt="Info Icon" />
      </button>
      <button className="profile-button">
        <img src={profileIcon} alt="Profile Icon" />
      </button>
    </div>
  );
};

export default HeaderButtons;
