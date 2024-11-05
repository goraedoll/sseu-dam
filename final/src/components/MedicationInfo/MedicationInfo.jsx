import React from "react";
import "./MedicationInfo.css"; // 스타일을 위한 CSS 파일 import
import pill1 from "../../assets/images/경동아스피린장용정.png";
import pill2 from "../../assets/images/글루코파지정.png";
import pill3 from "../../assets/images/노바스크정.png";
import pill4 from "../../assets/images/아마릴정.png";
import pill5 from "../../assets/images/아모잘탄정.png";
import pill6 from "../../assets/images/훼스탈골드.png";

const MedicationInfo = () => {
  return (
    <div className="medication-info-container">
      <h1 className="medication-info-title">개별 약품 정보</h1>

      <table className="medication-info-table">
        <thead>
          <tr>
            <th></th>
            <th>약품 이미지</th>
            <th className="medication-info-left-align">약품명</th>
            <th className="medication-info-left-align">복약 안내</th>
            <th>투약량</th>
            <th>횟수</th>
            <th>일수</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td></td>
            <td className="pill-img">
              <img src={pill1} alt="경동아스피린장용정" />
            </td>
            <td className="pill-name">경동아스피린장용정</td>
            <td className="medication-info-left-align">
              약물 복용 시 위장장애, 출혈 가능성 및 알코올 섭취에 주의가
              필요합니다. 투약 전 담당 의사와 상의하고, 과민증이 있으면 미리
              알리세요.
            </td>
            <td className="pill-count">100mg</td>
            <td className="pill-count">2회</td>
            <td className="pill-count">5일</td>
            <td></td>
          </tr>
          <tr>
            <td></td>

            <td className="pill-img">
              <img src={pill2} alt="글루코파지정500mg" />
            </td>
            <td className="pill-name">글루코파지정</td>
            <td className="medication-info-left-align">
              식사와 함께 또는 식사 직후 복용하세요. 위장장애 및 저혈당 증상 시
              사탕 등을 섭취하세요. 드물게 극심한 증상 발생 시 복용을 중단하고
              전문가와 상담하세요.
            </td>
            <td className="pill-count">500mg</td>
            <td className="pill-count">2회</td>
            <td className="pill-count">5일</td>
            <td></td>
          </tr>
          <tr>
            <td></td>

            <td className="pill-img">
              <img src={pill3} alt="노바스크정2.5mg" />
            </td>
            <td className="pill-name">노바스크정</td>
            <td className="medication-info-left-align">
              증상이 나아져도 전문가와 상의 후 투약 중단하세요. 천천히 일어나며,
              말초 부종이나 두통 시 상담이 필요합니다. 자몽주스는 피하세요.
            </td>
            <td className="pill-count">2.5mg</td>
            <td className="pill-count">2회</td>
            <td className="pill-count">5일</td>
            <td></td>
          </tr>
          <tr>
            <td></td>

            <td className="pill-img">
              <img src={pill4} alt="아마릴정4mg" />
            </td>
            <td className="pill-name">아마릴정4mg</td>
            <td className="medication-info-left-align">
              식전 복용하며, 졸음, 어지러움, 두통이 있을 수 있으므로 운전 등
              위험한 작업 시 주의하세요. 술은 저혈당 위험을 높이므로 피하고,
              저혈당 증상 시 사탕이나 과일주스를 복용합니다.
            </td>
            <td className="pill-count">4mg</td>
            <td className="pill-count">2회</td>
            <td className="pill-count">5일</td>
            <td></td>
          </tr>
          <tr>
            <td></td>

            <td className="pill-img">
              <img src={pill5} alt="아모잘탄정5/50mg" />
            </td>
            <td className="pill-name">아모잘탄정5</td>
            <td className="medication-info-left-align">
              증상이 나아져도 전문가와 상의 없이 중단하지 마세요. 장시간 누운
              후에는 천천히 일어나세요. 투약 중에는 금주하며, 두통 등 부작용이
              있을 수 있습니다.
            </td>
            <td className="pill-count">50mg</td>
            <td className="pill-count">2회</td>
            <td className="pill-count">5일</td>
            <td></td>
          </tr>
          {/* <tr>
            <td></td>
            <td className="pill-img">
              <img src={pill6} alt="훼스탈골드정" />
            </td>
            <td className="pill-name">훼스탈골드정</td>
            <td className="medication-info-left-align">
              2주간 복용해도 증상 개선이 없으면 전문가와 상의하세요. 식사는
              규칙적으로 하며 과식과 카페인, 강한 향신료 섭취는 삼가세요.
            </td>
            <td className="pill-count">500mg</td>
            <td className="pill-count">2회</td>
            <td className="pill-count">5일</td>
            <td></td>
          </tr> */}
          <tr>
            <td></td>

            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>

            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MedicationInfo;
