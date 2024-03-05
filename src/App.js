import "./App.css";
import { useState } from "react";
import MultipleSelect from "./components/MultipleSelect";
import Book from "./Book";
import Timing from "./components/Timing";

function App() {
  // const [inputValues, setInputValues] = useState({});
  const [counter, setCounter] = useState(0);
  const [selectedbook, setBoook] = useState();

  const handleClick = () => {
    setCounter(counter + 1);
    console.log(counter);
  };

  return (
    <>
      {console.log(selectedbook)}
      <div className="App">
        {" "}
        <h1> Study Management</h1>
      </div>
      <h2> Create New Plan</h2>

      <hr />

      <div>
        <h3> Title of Your Plan</h3>
        <input name="title" />
      </div>

      <div>
        <hr />
        <h3> Select Books</h3>

        {Array.from(Array(counter)).map((c, index) => {
          return (
            <>
              name:{" "}
              <select
                name="selectedbook"
                onChange={(e) => {
                  setBoook(e.target.value);
                }}
              >
                {Object.keys(Book).map((item) => (
                  <option key={item} value={Book[item]?.name}>
                    {Book[item]?.name}
                  </option>
                ))}
              </select>
              Chapter: <MultipleSelect selectedbook={selectedbook} />
              <br />
            </>
          );
        })}

        <button onClick={handleClick}>Add +</button>
      </div>
      <hr />
      <div>
        <h3> Select Timing</h3>

        <Timing />
      </div>
      <hr />
    </>
  );
}

export default App;
