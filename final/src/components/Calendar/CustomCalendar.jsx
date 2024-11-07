import React, { useState } from 'react';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { TextField, Modal, Box } from '@mui/material'; // Modal 컴포넌트 추가
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const CustomCalendar = ({ selectedDate, setSelectedDate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDateChange = (newValue) => {

    console.log("선택한 날짜:", newValue.format('YYYY-MM-DD'));
    console.log(selectedDate)
    setSelectedDate(newValue)
 

    // if (typeof setSelectedDate === "function") { // setSelectedDate가 함수인지 확인
    //   setSelectedDate(newValue);
    //   setIsModalOpen(true);


    //   console.log("선택한 날짜:", newValue.format('YYYY-MM-DD'));
    // } else {
    //   console.error("setSelectedDate가 함수가 아닙니다.");
    // }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticDatePicker
        displayStaticWrapperAs="desktop"
        value={selectedDate}
        onChange={handleDateChange}
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
          marginLeft: '31px',
        }}
      />

      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: '10px',
          }}
        >
          <h2 id="modal-title">선택한 날짜</h2>
          <p id="modal-description">
            {selectedDate ? selectedDate.format('YYYY-MM-DD') : '날짜를 선택하세요'}
          </p>
          <button onClick={handleCloseModal}>닫기</button>
        </Box>
      </Modal>
    </LocalizationProvider>
  );
};

export default CustomCalendar;
