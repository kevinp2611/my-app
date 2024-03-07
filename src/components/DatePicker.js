

import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CustomDatePicker({ label, value, onChange, disabled }) {
  const days = 1;
  var newDate = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
  return (
    <div>
      <h3>{label}</h3>
      <DatePicker
        selected={value}
        onChange={onChange}
        disabled={disabled}
        minDate={newDate}
      />
    </div>
  );
}

export default CustomDatePicker;
