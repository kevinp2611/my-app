// components/DatePicker.js

import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function CustomDatePicker({ label, value, onChange, disabled }) {
  return (
    <div>
      <h3>{label}</h3>
      <DatePicker selected={value} onChange={onChange} disabled={disabled} />
    </div>
  );
}

export default CustomDatePicker;
