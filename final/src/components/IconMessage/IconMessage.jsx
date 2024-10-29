import React from "react";
import './IconMessage.css';
import threeDot from '../../../assets/AlertMessages/threeDot.svg'
import cautionSign from '../../../assets/Caution Sign.png'; // 이미지를 import로 명시적으로 가져옴

const IconMessage = () => {
    return (
        <div className="icon-message-container">
            <div className="icon-message-title">
                <h1>안내 메세지</h1>
                <button className="mini-refresh-button">
                    <img src={threeDot} alt="새로고침" />
                </button>
            </div>
            <div className="icon-message-contents">
                <div>
                    <img src={cautionSign} alt="Caution Sign" />
                </div>
                <div>
                    <h1>낙상 발생</h1>
                </div>
                <div>
                    <p>보호 대상자에게 낙상이 감지되었습니다.</p>
                </div>
            </div>
        </div>
    );
}

export default IconMessage;
