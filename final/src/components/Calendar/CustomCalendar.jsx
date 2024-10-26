import React, { useState } from 'react';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { TextField, Modal, Box } from '@mui/material'; // Modal 컴포넌트 추가
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';

const CustomCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태

  const handleDateChange = (newValue) => {
    setSelectedDate(newValue);
    setIsModalOpen(true); // 날짜 클릭 시 모달 열림
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // 모달 닫기
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticDatePicker
        displayStaticWrapperAs="desktop"
        value={selectedDate}
        onChange={handleDateChange} // 날짜 변경 시 모달 열기
        // renderInput 제거하고 textField 사용
        slots={{ textField: (params) => <TextField {...params} /> }}
        sx={{
          padding: '0px',
          borderRadius: '20px',
          backgroundColor: '#fff',
          minWidth: '347px',
          maxWidth: '347px',
          minHeight: '346px',
          maxHeight: '346px',
          border: '1px solid rgba(0, 0, 0, 0.1)',
          marginLeft: '31px',  // 왼쪽 마진 추가
        }}
      />

      {/* 모달 구현 */}
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: '10px'
        }}>
          <h2 id="modal-title">선택한 날짜</h2>
          <p id="modal-description">{selectedDate.format('YYYY-MM-DD')}</p>
          <button onClick={handleCloseModal}>닫기</button>
        </Box>
      </Modal>
    </LocalizationProvider>
  );
};

export default CustomCalendar;
