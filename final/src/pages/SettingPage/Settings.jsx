import React from 'react';
import "./Settings.css"
import Workspace from '../../components/Workspace/Workspace';
import UserSettings from '../../components/UserSettings/UserSettings';

const Settings = () => {
  return (
    <div className="settings-container">
      <Workspace pageText="페이지 / 유저 설정" mainText="유저 설정"/>{" "}
      {/* 맨 위에 위치 */}
      <div>
        <UserSettings />
      </div>
    </div>
  );
};

export default Settings;
