import React from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 추가
import "./HeaderButtons.css";
import searchIcon from "../../assets/icons/header-search.svg";
import alarmIcon from "../../assets/icons/header-alarm.svg";
import darkModeIcon from "../../assets/icons/header-dark.svg";
import infoIcon from "../../assets/icons/header-info.svg";
import profileIcon from "../../assets/images/header-profile.png";

const HeaderButtons = () => {
  return (
    <div className="header-buttons">
      <div className="header-search-bar">
        <img
          src={searchIcon}
          alt="Search Icon"
          className="header-icon header-search-icon"
        />
        <input
          type="text"
          placeholder="Search"
          className="header-search-input"
        />
      </div>
      <div className="header-icon-group">
        <img src={alarmIcon} alt="Alarm Icon" className="header-icon" />
        <img src={darkModeIcon} alt="Dark Mode Icon" className="header-icon" />
        <a
          href="https://hill-hose-a0d.notion.site/14475dc105c78070b4bdde4e5c7ba283"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={infoIcon} alt="Info Icon" className="header-icon" />
        </a>
        <img
          src={profileIcon}
          alt="Profile Icon"
          className="header-profile-icon"
        />
      </div>
    </div>
  );
};

export default HeaderButtons;
