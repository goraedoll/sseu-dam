// src/components/AlertMessages/utils/iconMapper.js
import alertIcon1_1 from "../../../assets/icons/alert-bad.svg";
import alertIcon1_2 from "../../../assets/icons/alert-caution.svg";
import alertIcon1_3 from "../../../assets/icons/alert-good.svg";
import alertIcon2_1 from "../../../assets/icons/alert-falling.svg";
import alertIcon2_2 from "../../../assets/icons/alert-pill.svg";
import alertIcon2_3 from "../../../assets/icons/alert-change.svg";
import alertIcon2_4 from "../../../assets/icons/alert-water.svg";

const iconMapper = {
  "낙상 사고": alertIcon1_1,
  "응급 상황": alertIcon1_1,
  "낙상 주의": alertIcon1_2,
  "복약 시간": alertIcon1_3,
  "요청 사항": alertIcon1_3,
  "목욕 주의": alertIcon1_3,
  "낙상을 주의하세요": alertIcon2_1,
  "낙상이 발생했습니다": alertIcon2_1,
  "복약 시간입니다": alertIcon2_2,
  "자세 변경 시간입니다": alertIcon2_3,
  "물을 요청합니다": alertIcon2_4,
};

export default function getStatusIcon(status) {
  return iconMapper[status] || alertIcon2_4; // 기본 아이콘
}
