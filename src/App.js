import React, { useState } from "react";
import "./App.css";

import Timing from "./components/Timing";

import BookSelect from "./components/BookSelect";
import TitleInput from "./components/TitleInput";
import SaveButton from "./components/SaveButton";
import DatePicker from "./components/DatePicker";
import calculateEndDate  from "./utils";

function App() {


  const [title, setTitle] = useState('');
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
    localStorage.setItem('planData', JSON.stringify(data));
  };

  // function calculateEndDate(startDate, timings) {
  //   // Calculate end date based on start date and selected timings
  //   // Logic to calculate end date goes here
  //   return startDate; // Placeholder, replace with actual calculation
  // }

  const handleStartDateChange = (date) => {
    setStartDate(date);
    // Calculate end date based on start date and selected timings
    const calculatedEndDate = calculateEndDate(date, timings,50);
    setEndDate(calculatedEndDate);
  };

console.log(timings)
return(
  <div className="App">
  <h1>Study Management</h1>
  <TitleInput value={title} onChange={setTitle} />
  <BookSelect value={selectedBooks} onChange={setSelectedBooks} />
  <Timing value={timings} onChange={setTimings} />
  <DatePicker label="Start Date" value={startDate} onChange={handleStartDateChange} />
  <DatePicker label="End Date" value={endDate} disabled />
  <SaveButton onClick={saveData} />
</div>
)





















  // const [counter, setCounter] = useState(0);
  // // const [selectedBooks, setSelectedBooks] = useState([]);

  // const handleAddBook = () => {
  //   setCounter(counter + 1);
  // };
  // const handleBook = () => {
  //   setCounter(counter + 1);
  // };

  // const handleBookChange = (e) => {
  //   const bookName = e.target.value;
  //   setSelectedBooks((prevSelectedBooks) => [...prevSelectedBooks, bookName]);
  // };

  // return (
  //   <div className="App">
  //     <h1>Study Management</h1>
  //     <h2>Create New Plan</h2>
  //     <hr />

  //     <div>
  //       <h3>Title of Your Plan</h3>
  //       <input name="title" />
  //     </div>

  //     <div>
  //       <hr />
  //       <h3>Select Books</h3>

  //       {[...Array(counter)].map((_, index) => (
  //         <div key={index}>
  //           <label>Name: </label>
  //           <select name="selectedbook" onChange={handleBookChange}>
  //             {Object.values(Book).map((book) => (
  //               <option key={book.name} value={book.name}>
  //                 {book.name}
  //               </option>
  //             ))}
  //           </select>
  //           <label>Chapter: </label>
  //           <MultipleSelect selectedbook={selectedBooks} onChange={handleBook}/>
  //           <br />
  //         </div>
  //       ))}
  //       <button onClick={handleAddBook}>Add +</button>
  //     </div>

  //     <hr />

  //     <div>
  //       <h3>Select Timing</h3>
  //       <Timing />
  //     </div>

  //     <hr />

  //     <div>
  //       <h3>Duration</h3>
  //       <label>Start Date:</label>
  //       <Datepiker />
  //       <label>End Date:</label>
  //       <Datepiker />
  //     </div>

  //     <hr />

  //     <div>
  //       <button>Save</button>
  //     </div>
  //   </div>
  // );
}

export default App;

