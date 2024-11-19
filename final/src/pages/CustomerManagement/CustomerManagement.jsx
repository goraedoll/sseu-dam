import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
const serverip = import.meta.env.VITE_SERVER_IP;
const BASE_URL = `http://${serverip}:1252`;

const CustomerManagement = () => {
  const [patients, setPatients] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [editPatient, setEditPatient] = useState({});
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const navigate = useNavigate();

  const profiles = [Cus1, Cus2, Cus3, Cus4, Cus5, Cus6];

  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const itemsPerPage = 6; // 한 페이지에 표시할 항목 수

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPatients = patients.slice(startIndex, endIndex);

  const totalPages = Math.ceil(patients.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // 편집 모드를 시작하는 함수
  const startEditing = (id) => {
    const patient = patients.find((p) => p.id === id);
    setEditMode(id);
    setEditPatient({
      id: patient.id,
      address: patient.address,
      phone: patient.phone,
      HealthStatus: patient.HealthStatus,
    });
  };

  // 입력 필드 변경 시 호출되는 함수
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditPatient((prev) => ({ ...prev, [name]: value }));
  };

  // 편집한 내용을 저장하는 함수
  const editTask = async () => {
    const token = localStorage.getItem("access_token");

    try {
      await axios.put(`${BASE_URL}/patient/update`, editPatient, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setPatients((prev) =>
        prev.map((patient) =>
          patient.id === editMode ? { ...patient, ...editPatient } : patient
        )
      );
      setEditMode(null);
    } catch (error) {
      console.error("Error editing patient:", error);
    }
  };

  // 환자 데이터를 가져오는 함수
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          throw new Error("Token not found");
        }

        const response = await axios.get(`${BASE_URL}/patient/get`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data.map((patient, index) => ({
          ...patient,
          profile: profiles[index % profiles.length],
          birthDate: patient.BirthDate.replace(/-/g, ". "),
          registrationDate: patient.createdAt
            .substring(0, 10)
            .replace(/-/g, ". "),
        }));
        setPatients(data);
      } catch (error) {
        console.error("Failed to fetch patients", error);
      }
    };

    fetchPatients();
  }, []);

  const handleGoTo = (id) => {
    navigate("/dashboard");
  };

  // 삭제 확인 모달을 열기 위한 함수
  const confirmDelete = (id) => {
    setDeleteConfirm(id);
  };

  // 삭제 요청을 보내는 함수
  const handleDelete = async (id) => {
    const token = localStorage.getItem("access_token");

    try {
      await axios.delete(`${BASE_URL}/patient/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // 삭제 성공 시 상태 업데이트
      setPatients((prev) => prev.filter((patient) => patient.id !== id));
      setDeleteConfirm(null); // 모달 닫기
      console.log(`삭제된 고객 ID: ${id}`);
    } catch (error) {
      console.error("Error deleting patient:", error);
    }
  };

  return (
    <div className="Customers-container">
      <Workspace pageText="페이지 / 돌봄 대상자" mainText="돌봄 대상자" />
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
                <th className="id-column">#</th>
                <th className="profile-column">프로필</th>
                <th className="name-column">
                  이름{" "}
                  <img src={CusDown} alt="정렬" className="cus-down-icon" />
                </th>
                <th className="dob-column">
                  생년월일{" "}
                  <img src={CusDown} alt="정렬" className="cus-down-icon" />
                </th>
                <th className="address-column">주소</th>
                <th className="phone-column">전화번호</th>
                <th className="health-column">건강상태</th>
                <th className="registration-column">
                  등록날짜{" "}
                  <img src={CusDown} alt="정렬" className="cus-down-icon" />
                </th>
                <th className="action-column">작업</th>
              </tr>
            </thead>
            <tbody>
              {currentPatients.map((patient) => (
                <tr key={patient.id}>
                  <td className="customer-id">{patient.id}</td>
                  <td className="profile-td">
                    <img
                      src={patient.profile}
                      alt={patient.name}
                      className="profile-icon"
                    />
                  </td>
                  <td>{patient.name}</td>
                  <td>{patient.birthDate}</td>
                  <td>
                    {editMode === patient.id ? (
                      <input
                        name="address"
                        value={editPatient.address}
                        onChange={handleChange}
                        className="edit-input"
                      />
                    ) : (
                      patient.address
                    )}
                  </td>
                  <td>
                    {editMode === patient.id ? (
                      <input
                        name="phone"
                        value={editPatient.phone}
                        onChange={handleChange}
                        className="edit-input"
                      />
                    ) : (
                      patient.phone
                    )}
                  </td>
                  <td>
                    {editMode === patient.id ? (
                      <input
                        name="HealthStatus"
                        value={editPatient.HealthStatus}
                        onChange={handleChange}
                        className="edit-input"
                      />
                    ) : (
                      <span className="health-status">
                        {patient.HealthStatus}
                      </span>
                    )}
                  </td>
                  <td className="registration-date">
                    {patient.registrationDate}
                  </td>
                  <td className="action-cell">
                    <button
                      className="goto-button"
                      onClick={() => handleGoTo(patient.id)}
                    >
                      <img src={CusGoto} alt="바로가기" />
                    </button>
                    {editMode === patient.id ? (
                      <button onClick={editTask}>저장</button>
                    ) : (
                      <button
                        className="action-button"
                        onClick={() => startEditing(patient.id)}
                      >
                        <img src={CusEdit} alt="편집" />
                      </button>
                    )}
                    <button
                      className="action-button"
                      onClick={() => confirmDelete(patient.id)}
                    >
                      <img src={CusDelete} alt="삭제" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* 페이지네이션 버튼 */}
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                className={currentPage === index + 1 ? "active" : ""}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 삭제 확인 모달 */}
      {deleteConfirm && (
        <div className="my-custom-modal-overlay">
          <div className="my-custom-modal">
            <h3>정말 삭제하시겠습니까?</h3>
            <div className="confirm-buttons">
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="confirm-button"
              >
                확인
              </button>
              <button
                onClick={() => setDeleteConfirm(null)}
                className="cancel-button"
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default CustomerManagement;
