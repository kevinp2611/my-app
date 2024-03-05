import { useState } from "react";

const Timing = () => {
  const [counter, setCounter] = useState({
    sunday: 0,
    monday: 0,
    tuesday: 0,
    wednesday: 0,
    thirsday: 0,
    friday: 0,
    saturday: 0,
  });

  const handleClick = (day) => {
    setCounter({ ...counter, [day]: counter[day] + 1 });
    console.log(counter);
  };
  return (
    <>
      <table style={{ width: "70%" }}>
        <thead>
          <tr>
            {Object.keys(counter).map((day, index) => {
              return <th> {day}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          <tr>
            {Object.keys(counter).map((item) => {
              return (
                <td>
                  {Array.from(Array(counter[item])).map((c, index) => {
                    return (
                      <>
                        <select>
                          <option>hi</option>
                        </select>
                        <br />
                      </>
                    );
                  })}
                </td>
              );
            })}
          </tr>

          <tr>
            {Object.keys(counter).map((day, index) => {
              return (
                <td>
                  <button
                    key={day}
                    onClick={() => {
                      handleClick(day);
                    }}
                  >
                    Add +
                  </button>
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    </>
  );
};
export default Timing;
