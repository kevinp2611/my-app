// import React, {useState} from "react";
// import "./App.css";

// import Timing from "./components/Timing";

// import BookSelect from "./components/BookSelect";
// import TitleInput from "./components/TitleInput";
// import SaveButton from "./components/SaveButton";
// import DatePicker from "./components/DatePicker";
// import calculateEndDate from "./utils";

// function App() {
//   const [title, setTitle] = useState("");
//   const [selectedBooks, setSelectedBooks] = useState([]);
//   const [timings, setTimings] = useState({});
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);

//   const saveData = () => {
//     // Construct data object
//     const data = {
//       title,
//       selectedBooks,
//       timings,
//       startDate: startDate ? startDate.toISOString() : null,
//       endDate: endDate ? endDate.toISOString() : null,
//     };

//     // Save data to localStorage
//     localStorage.setItem("planData", JSON.stringify(data));
//   };

//   const handleStartDateChange = (date) => {
//     // setStartDate(date);

//     setStartDate(date, () => {
//       // Calculate end date based on start date and selected timings
//       const end = calculateEndDate(selectedBooks, timings, startDate);
//       setEndDate(end);
//     });
//     // Calculate end date based on start date and selected timings
//   };

//   console.log(timings);
//   return (
//     <div className="App">
//       <h1>Study Management</h1>
//       <TitleInput value={title} onChange={setTitle} />
//       <BookSelect value={selectedBooks} onChange={setSelectedBooks} />
//       <Timing value={timings} onChange={setTimings} />
//       <DatePicker
//         label="Start Date"
//         value={startDate}
//         onChange={handleStartDateChange}
//       />
//       <DatePicker label="End Date" value={endDate} disabled />
//       <SaveButton onClick={saveData} />
//       {/* <button onClick={calculatedEndDate}>calculate</button> */}
//     </div>
//   );
// }

// export default App;



import React, { useState, useEffect } from "react";
import "./App.css";

import Timing from "./components/Timing";
import BookSelect from "./components/BookSelect";
import TitleInput from "./components/TitleInput";
import SaveButton from "./components/SaveButton";
import DatePicker from "./components/DatePicker";
import calculateEndDate from "./utils";

function App() {
  const [title, setTitle] = useState("");
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [timings, setTimings] = useState({});
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const saveData = () => {
    // Construct data object
    const data = {
      title,
      selectedBooks,
      timings,
      startDate: startDate ? startDate.toISOString() : null,
      endDate: endDate ? endDate.toISOString() : null,
    };

    // Save data to localStorage
    localStorage.setItem("planData", JSON.stringify(data));
  };

  useEffect(() => {
    // Calculate end date based on start date and selected timings
    if (startDate) {
      const end = calculateEndDate(selectedBooks, timings, startDate);
      setEndDate(end);
    }
  }, [selectedBooks, timings, startDate]);

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  console.log(timings);
  return (
    <div className="App">
      <h1>Study Management</h1>
      <TitleInput value={title} onChange={setTitle} />
      <BookSelect value={selectedBooks} onChange={setSelectedBooks} />
      <Timing value={timings} onChange={setTimings} />
      <DatePicker
        label="Start Date"
        value={startDate}
        onChange={handleStartDateChange}
      />
      <DatePicker label="End Date" value={endDate} disabled />
      <SaveButton onClick={saveData} />
    </div>
  );
}

export default App;
