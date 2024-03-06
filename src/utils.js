import Book from "./Book";

const calculateEndDate = (selectedBooks, timings, startDate) => {
  var time = [];
  const Timetaken = selectedBooks.map((item) => {
    return item.chapters_id.map((ite) => {
      return time.push(Book[item.book_id - 1].chapters[ite - 1].no_of_words);
    });
  });

  var sum = time.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);

  function toHoursAndMinutes(totalMinutes) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return { hours, minutes };
  }

  const totaltime = toHoursAndMinutes(sum);

  let totalDuration = { hours: "", minutes: "" };
  const parseTime = (timeString) => {
    const match = timeString.match(/(\d{1,2}):(\d{2})\s?(AM|PM)/i);
    if (!match) {
      console.error(`Invalid time format for ${timeString}`);
      return null;
    }
    let [_, hours, minutes, period] = match;
    hours = parseInt(hours);
    minutes = parseInt(minutes);
    if (isNaN(hours) || isNaN(minutes)) {
      console.error(`Invalid time format for ${timeString}`);
      return null;
    }
    if (period.toUpperCase() === "PM" && hours !== 12) {
      hours += 12;
    } else if (period.toUpperCase() === "AM" && hours === 12) {
      hours = 0;
    }
    return { hours, minutes };
  };

  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let noofDay = 0;

  for (const day in timings) {
    console.log(day);
    if (timings.hasOwnProperty(day)) {
      timings[day].forEach(({ start, end }) => {
        const startTime = parseTime(start);
        const endTime = parseTime(end);

        if (startTime && endTime) {
          console.log("hiii");
          if (
            startTime.minutes < endTime.minutes &&
            startTime.hours < endTime.hours
          ) {
            totalDuration.minutes += endTime.minutes - startTime.minutes;
            totalDuration.hours += endTime.hours - startTime.hours;
          }
          if (
            startTime.minutes > endTime.minutes &&
            startTime.hours > endTime.hours
          ) {
            totalDuration.minutes += startTime.minutes - endTime.minutes;
            totalDuration.hours += startTime.hours - endTime.hours;
          }
          // totalDuration = totalDuration + (endTime - startTime);
          // noofDay = noofDay + 1;
          console.log(totalDuration);
        }
      });
    }
  }
  console.log(totalDuration);
  console.log(totaltime);

  const Totaltimeinminutes = totaltime.hours * 60 + totaltime.minutes;
  const Totaldurationinminutes =
    Number(totalDuration.hours) * 60 + Number(totalDuration.minutes);

  var totalweek = Math.floor(Totaltimeinminutes / Totaldurationinminutes);

  console.log(totalweek);

  let copytotalduration = totalDuration;

  for (let i = 0; i < totalweek; i++)
    for (const day in weekday) {
      if (copytotalduration.hours < totaltime.hours) {
        noofDay = noofDay + 1;
      }
      if (timings.hasOwnProperty(day)) {
        timings[day].forEach(({ start, end }) => {
          const startTime = parseTime(start);
          const endTime = parseTime(end);
          if (
            startTime &&
            endTime &&
            copytotalduration.hours < totaltime.hours
          ) {
            if (
              startTime.minutes < endTime.minutes &&
              startTime.hours < endTime.hours
            ) {
              copytotalduration.minutes += endTime.minutes - startTime.minutes;
              copytotalduration.hours += endTime.hours - startTime.hours;
            }
            if (
              startTime.minutes > endTime.minutes &&
              startTime.hours > endTime.hours
            ) {
              copytotalduration.minutes += startTime.minutes - endTime.minutes;
              copytotalduration.hours += startTime.hours - endTime.hours;
            }
          }
        });
      }
    }

  console.log(noofDay);
  const d = new Date(startDate.getTime());
  let day = d.getDay() + 1;
  console.log("day", day);

  var newDate = new Date(
    startDate.getTime() + (noofDay - day) * 24 * 60 * 60 * 1000
  );

  return newDate;
};

export default calculateEndDate;
