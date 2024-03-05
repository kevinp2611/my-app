import { useState } from "react";

const Datepiker = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const minDate = () => {
    const today = new Date().toISOString().split("T")[0];
    return today;
  };
  return (
    <input
      type="date"
      value={selectedDate}
      min={minDate()}
      onChange={(e) => setSelectedDate(e.target.value)}
    />
  );
};
export default Datepiker;
