import React from "react";
import "./CustomerManagement.css";
import Workspace from "../../components/Workspace/Workspace.jsx";
import Cus1 from "../../assets/icons/cus-1.svg";
import Cus2 from "../../assets/icons/cus-2.svg";
import Cus3 from "../../assets/icons/cus-3.svg";
import Cus4 from "../../assets/icons/cus-4.svg";
import Cus5 from "../../assets/icons/cus-5.svg";
import Cus6 from "../../assets/icons/cus-6.svg";
import CusAdd from "../../assets/icons/cus-add.svg";
import CusDelete from "../../assets/icons/cus-delete.svg";
import CusEdit from "../../assets/icons/cus-edit.svg";
import CusGoto from "../../assets/icons/cus-goto.svg";
import CusDown from "../../assets/icons/cus-down.svg";

const customers = [
  {
    id: 1,
    profile: Cus1,
    name: "박은서",
    userID: "lee678",
    birthDate: "1945. 12. 20",
    address: "경기도 화성시 반송로 92",
    guardianPhone: "010-1234-5678",
    registrationDate: "2024-09-26",
    healthStatus: "경미한 고혈압이 있으며, 정기적인 모니터링 필요",
  },
  {
    id: 2,
    profile: Cus2,
    name: "김영희",
    userID: "kim678",
    birthDate: "1948. 01. 19",
    address: "인천광역시 부평구 부평대로 44",
    guardianPhone: "010-4321-6432",
    registrationDate: "2024-08-12",
    healthStatus: "전반적으로 건강, 특별한 문제가 없음",
  },
  {
    id: 3,
    profile: Cus3,
    name: "박철수",
    userID: "park678",
    birthDate: "1943. 10. 18",
    address: "경기도 안산시 상록구 사3로 90",
    guardianPhone: "010-9876-4566",
    registrationDate: "2024-08-09",
    healthStatus: "관절염 증상으로 인해 때때로 통증 발생",
  },
  {
    id: 4,
    profile: Cus4,
    name: "이순자",
    userID: "lee678",
    birthDate: "1945. 06. 12",
    address: "강원도 춘천시 영서로 105",
    guardianPhone: "010-2467-0987",
    registrationDate: "2024-06-06",
    healthStatus: "수술 후 재활 치료 받고 있으며, 점진적으로 회복 중",
  },
  {
    id: 5,
    profile: Cus5,
    name: "최영식",
    userID: "choi678",
    birthDate: "1956. 03. 11",
    address: "서울특별시 송파구 올림픽로 84",
    guardianPhone: "010-4317-6438",
    registrationDate: "2024-06-05",
    healthStatus: "특정 음식에 알레르기가 있어 주의가 필요",
  },
  {
    id: 6,
    profile: Cus6,
    name: "박영길",
    userID: "park678",
    birthDate: "1959. 12. 20",
    address: "전라북도 전주시 완산구 효자로 33",
    guardianPhone: "010-3472-2457",
    registrationDate: "2024-03-29",
    healthStatus: "기억력 감퇴가 있으나 일상생활에 큰 지장 없음",
  },
];

// 각 버튼의 클릭 이벤트 핸들러
const handleGoTo = (id) => {
  console.log("바로가기 고객 ID:", id);
};

const handleEdit = (id) => {
  console.log("편집할 고객 ID:", id);
};

const handleDelete = (id) => {
  console.log("삭제할 고객 ID:", id);
};

const CustomerManagement = () => {
  return (
    <div className="Customers-container">
      <Workspace pageText="페이지 / 고객 관리" mainText="고객 관리" />
      <div className="Customers-upper-section">
        <div className="inner-container">
          <div className="Customers-table-header">
            <h2>회원 목록</h2>
            <button className="add-button">
              <img src={CusAdd} alt="고객 추가" />
            </button>
          </div>
          <table className="customers-table">
            <thead>
              <tr>
                <th>#</th>
                <th>프로필</th>
                <th>
                  이름{" "}
                  <img src={CusDown} alt="정렬" className="cus-down-icon" />
                </th>
                <th>
                  생년월일{" "}
                  <img src={CusDown} alt="정렬" className="cus-down-icon" />
                </th>
                <th>주소</th>
                <th>보호자 전화번호</th>
                <th>건강상태</th>
                <th>
                  등록날짜{" "}
                  <img src={CusDown} alt="정렬" className="cus-down-icon" />
                </th>
                <th>작업</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id}>
                  <td className="customer-id">{customer.id}</td>
                  <td className="profile-td">
                    <img
                      src={customer.profile}
                      alt={customer.name}
                      className="profile-icon"
                    />
                  </td>
                  <td>
                    <span className="customer-name">{customer.name}</span>
                    <div className="user-id">{customer.userID}</div>
                  </td>
                  <td>{customer.birthDate}</td>
                  <td>{customer.address}</td>
                  <td>{customer.guardianPhone}</td>
                  <td className="health-status">{customer.healthStatus}</td>
                  <td className="registration-date">
                    {customer.registrationDate}
                  </td>
                  <td>
                    <button
                      className="goto-button"
                      onClick={() => handleGoTo(customer.id)}
                    >
                      <img src={CusGoto} alt="바로가기" />
                    </button>
                    <button
                      className="action-button"
                      onClick={() => handleEdit(customer.id)}
                    >
                      <img src={CusEdit} alt="편집" />
                    </button>
                    <button
                      className="action-button"
                      onClick={() => handleDelete(customer.id)}
                    >
                      <img src={CusDelete} alt="삭제" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomerManagement;
