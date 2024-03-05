import { useState } from "react";
import TimePicker from "react-bootstrap-time-picker";

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

  let arr = Array.from(
    {
      length: (24 * 60) / 5,
    },
    (v, i) => {
      let h = Math.floor((i * 5) / 60);
      let m = i * 5 - h * 60;
      //convert to 12 hours time
      //pad zero to minute
      if (m < 10) {
        m = "0" + m;
      }
      let label = "AM";
      if (h > 12) {
        label = "PM";
        h -= 12;
      }
      if (h === 0) {
        h = 12;
      }
      return h + ":" + m + " " + label;
    }
  );

  console.log(arr);

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
                          <option value="" disabled selected>
                            From time
                          </option>
                          {arr.map((t) => {
                            return <option>{t}</option>;
                          })}
                        </select>
                        <select>
                          <option value="" disabled selected>
                            To time
                          </option>
                          {arr.map((t) => {
                            return <option>{t}</option>;
                          })}
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
