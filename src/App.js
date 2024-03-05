import "./App.css";
import { useState } from "react";
import MultipleSelect from "./components/MultipleSelect";
import Book from "./Book";

function App() {
  const [inputValues, setInputValues] = useState({});
  const [counter, setCounter] = useState(0);
  const [selectedbook, setBoook] = useState();

  const handleClick = () => {
    setCounter(counter + 1);
    console.log(counter);
  };

  const handleOnChange = (e) => {
    const abc = {};
    abc[e.target.className] = e.target.value;
    setInputValues({ ...inputValues, ...abc });
  };

  // console.log(Book[0].name);

  return (
    <>
      {console.log(selectedbook)}
      <div className="App">Study Management</div>
      <h1> Create New Plan</h1>
      <div>
        <h3> Title of Your Plan</h3>
        <input name="title" />
      </div>

      <div>
        {/* <hr /> */}
        <h3> Select Books</h3>

        {Object.keys(inputValues).map((c) => {
          return (
            <>
              <p>{inputValues[c]}</p>
            </>
          );
        })}

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
        <button onClick={handleClick}>+</button>
      </div>
    </>
  );
}

export default App;
