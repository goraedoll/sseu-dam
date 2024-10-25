import React, { useState } from 'react';
import Calendar from 'react-calendar';
import './Calendar.css';  // Your custom styles here

const CustomCalendar = () => {
  const [value, setValue] = useState(new Date());

  const progressData = {
    '2024-10-05': 'high',
    '2024-10-06': 'medium',
    '2024-10-07': 'low',
    '2024-10-08': 'low',
    '2024-10-09': 'high',
  };

  const getTileClass = ({ date, view }) => {
    if (view === 'month') {
      const dateString = date.toISOString().split('T')[0];
      if (progressData[dateString]) {
        return `progress-${progressData[dateString]}`;
      }
    }
    return null;
  };

  return (
    <div className="calendar-container">
      <Calendar
        onChange={setValue}
        value={value}
        tileClassName={getTileClass}
        calendarType="ISO 8601" // This makes Monday the first day of the week like in the image
      />
    </div>
  );
};

export default Calendar;
