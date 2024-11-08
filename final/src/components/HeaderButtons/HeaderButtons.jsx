import React from "react";
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
        <img src={searchIcon} alt="Search Icon" className="header-icon header-search-icon" />
        <input type="text" placeholder="Search" className="header-search-input" />
      </div>
      <div className="header-icon-group">
        <img src={alarmIcon} alt="Alarm Icon" className="header-icon" />
        <img src={darkModeIcon} alt="Dark Mode Icon" className="header-icon" />
        <img src={infoIcon} alt="Info Icon" className="header-icon" />
        <img src={profileIcon} alt="Profile Icon" className="header-profile-icon" />
      </div>
    </div>
  );
};

export default HeaderButtons;
