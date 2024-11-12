// src/components/AlertMessages/utils/iconMapper.js
import alertIcon1_1 from "../../../assets/icons/alert-bad.svg";
import alertIcon1_2 from "../../../assets/icons/alert-caution.svg";
import alertIcon1_3 from "../../../assets/icons/alert-good.svg";
import alertIcon2_1 from "../../../assets/icons/alert-falling.svg";
import alertIcon2_2 from "../../../assets/icons/alert-pill.svg";
import alertIcon2_3 from "../../../assets/icons/alert-change.svg";
import alertIcon2_4 from "../../../assets/icons/alert-water.svg";

// 첫 번째 맵핑 객체: status-cell 에서 사용할 아이콘 맵핑
const iconMapper1 = {
  "낙상 사고": alertIcon1_1,
  "응급 상황": alertIcon1_1,
  "낙상 주의": alertIcon1_2,
  "복약 시간": alertIcon1_3,
  "요청 사항": alertIcon1_3,
  "욕창 주의": alertIcon1_2,
};

// 두 번째 맵핑 객체: message-cell 에서 사용할 아이콘 맵핑
const iconMapper2 = {
  "낙상을 주의하세요": alertIcon2_1,
  "낙상이 발생했습니다": alertIcon2_1,
  "복약 시간을 지키세요": alertIcon2_2,
  "자세 변경 시간입니다": alertIcon2_3,
  "자세 변경 시간입니다.": alertIcon2_3,
  "물을 요청합니다": alertIcon2_4,
};

// type 에 따라 다른 아이콘을 반환하는 함수
export default function getStatusIcon(status, type = "status") {
  const normalizedStatus = status.trim().toLowerCase(); // 공백 제거 및 소문자 변환

  if (type === "status") {
    // iconMapper1의 키를 소문자로 변환하여 매핑
    const icon1 = Object.keys(iconMapper1).reduce((acc, key) => {
      acc[key.toLowerCase()] = iconMapper1[key];
      return acc;
    }, {});
    return icon1[normalizedStatus] || alertIcon2_4;
  } else if (type === "message") {
    // iconMapper2의 키를 소문자로 변환하여 매핑
    const icon2 = Object.keys(iconMapper2).reduce((acc, key) => {
      acc[key.toLowerCase()] = iconMapper2[key];
      return acc;
    }, {});
    return icon2[normalizedStatus] || alertIcon2_4;
  }
}
