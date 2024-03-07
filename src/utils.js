
import Book from "./Book";

const calculateEndDate = (selectedBooks, timings, startDate) => {
  const totalWords = selectedBooks.reduce((total, item) => {
    return total + item.chapters_id.reduce((sum, ite) => {
      return sum + Book[item.book_id - 1].chapters[ite - 1].no_of_words;
    }, 0);
  }, 0);

  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return { hours, minutes };
  }

  const totaltime = toHoursAndMinutes(totalWords);

  let totalDuration = { hours: 0, minutes: 0 };

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

  for (const day in timings) {
    if (timings.hasOwnProperty(day)) {
      timings[day].forEach(({ start, end }) => {
        const startTime = parseTime(start);
        const endTime = parseTime(end);

        if (startTime && endTime) {
          let interval = (endTime.hours * 60 + endTime.minutes) - (startTime.hours * 60 + startTime.minutes);

          if (interval < 0) {
            interval += 24 * 60; // Add 24 hours for overnight period
          }

          totalDuration.hours += Math.floor(interval / 60);
          totalDuration.minutes += interval % 60;
        }
      });
    }
  }

  const totaltimeInMinutes = totaltime.hours * 60 + totaltime.minutes;
  const totalDurationInMinutes = totalDuration.hours * 60 + totalDuration.minutes;

  const totalWeeks = Math.floor(totaltimeInMinutes / totalDurationInMinutes);

  let noofDay = 0;
  let copyTotalDuration = { ...totalDuration };

  for (let i = 0; i < totalWeeks; i++) {
    for (const day of weekday) {
      if (copyTotalDuration.hours < totaltime.hours) {
        noofDay++;
      }
      if (timings.hasOwnProperty(day)) {
        timings[day].forEach(({ start, end }) => {
          const startTime = parseTime(start);
          const endTime = parseTime(end);
          if (startTime && endTime && copyTotalDuration.hours < totaltime.hours) {
            copyTotalDuration.minutes += endTime.minutes - startTime.minutes;
            copyTotalDuration.hours += endTime.hours - startTime.hours;
          }
        });
      }
    }
  }
console.log(totalDuration)
console.log(totaltime)
console.log(totalWeeks)
console.log(noofDay)
  const d = new Date(startDate.getTime());
  const day = d.getDay() + 1;

  const newDate = new Date(startDate.getTime() + (noofDay - day) * 24 * 60 * 60 * 1000);

  return newDate;
};

export default calculateEndDate;
