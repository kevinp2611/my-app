import React, { useState } from "react";

const Timing = ({value,onChange}) => {
  const [counter, setCounter] = useState({
    sunday: 0,
    monday: 0,
    tuesday: 0,
    wednesday: 0,
    thursday: 0,
    friday: 0,
    saturday: 0,
  });

  const [selectedTimes, setSelectedTimes] = useState({
    sunday: [],
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
  });

  // const [timingData, setTimingData] = useState({});

  const handleClick = (day) => {
    setCounter({ ...counter, [day]: counter[day] + 1 });
  };

  const handleTimeChange = (day, index, selectedTime, timeType) => {
    const newSelectedTimes = { ...selectedTimes };
    newSelectedTimes[day][index] = { ...newSelectedTimes[day][index], [timeType]: selectedTime };
    setSelectedTimes(newSelectedTimes);
    calculateTimingData();
  };

  const calculateTimingData = () => {
    const newTimingData = {};
    for (const day in selectedTimes) {
      if (selectedTimes[day].length > 0) {
        newTimingData[day] = selectedTimes[day].map((time) => ({
          start: time.start,
          end: time.end,
        }));
      }
    }
    onChange(newTimingData);
  };

  const generateTimeOptions = (startHour, startMinute) => {
    const timeOptions = [];
    for (let h = startHour; h < 24; h++) {
      const mStart = h === startHour ? startMinute : 0;
      for (let m = mStart; m < 60; m += 15) {
        let hour = h % 12;
        hour = hour === 0 ? 12 : hour; // Convert 0 to 12
        const ampm = h < 12 ? "AM" : "PM";
        const formattedHour = String(hour).padStart(2, "0");
        const formattedMinute = String(m).padStart(2, "0");
        const time = `${formattedHour}:${formattedMinute} ${ampm}`;
        timeOptions.push(<option key={time} value={time}>{time}</option>);
      }
    }
    return timeOptions;
  };

  return (
    <div>
      <table style={{ width: "70%" }}>
        <thead>
          <tr>
            {Object.keys(counter).map((day, index) => (
              <th key={index}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {Object.keys(counter).map((day) => (
              <td key={day}>
                {Array.from(Array(counter[day])).map((_, index) => (
                  <div key={index}>
                    <select
                      name={`fromtime-${day}-${index}`}
                      onChange={(e) => handleTimeChange(day, index, e.target.value, "start")}
                    >
                      <option value="" disabled selected>
                        From time
                      </option>
                      {generateTimeOptions(0, 0)}
                    </select>
                    <select
                      name={`totime-${day}-${index}`}
                      onChange={(e) => handleTimeChange(day, index, e.target.value, "end")}
                    >
                      <option value="" disabled selected>
                        To time
                      </option>
                      {generateTimeOptions(selectedTimes[day][index]?.start.slice(0, 2), selectedTimes[day][index]?.start.slice(3, 5))}
                    </select>
                    <br />
                  </div>
                ))}
              </td>
            ))}
          </tr>
          <tr>
            {Object.keys(counter).map((day, index) => (
              <td key={index}>
                <button onClick={() => handleClick(day)}>Add +</button>
              </td>
            ))}
          </tr>
        </tbody>
      </table>

      
    </div>
  );
};

export default Timing;
