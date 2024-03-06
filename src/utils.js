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

  const totaltime = toHoursAndMinutes(100);

  const daysInMilliseconds = {
    sunday: 0,
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
  };

  let totalDuration = 0;
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

    const titolmin = minutes + hours * 60;
    return Math.floor(titolmin / 60);
  };

  // const startTime = parseTime("1:45AM");

  for (const day in timings) {
    if (timings.hasOwnProperty(day)) {
      timings[day].forEach(({ start, end }) => {
        const startTime = parseTime(start, startDate, daysInMilliseconds[day]);
        const endTime = parseTime(end, startDate, daysInMilliseconds[day]);
        if (startTime && endTime) {
          console.log(startTime, endTime);
          totalDuration = totalDuration + endTime - startTime;
        }
      });
    }
  }

  console.log(totalDuration);
  // });
  // const newArray = Book.filter((item) => {
  //   return time.includes(String(item.id));
  // });
  // const total = Book[selectedBooks.book_id]?.chapters.map((item) => {
  //   return console.log(item);
  // });
  // Book.filter
  //  item.id.includes(time)
  //   const daysInMilliseconds = {
  //     sunday: 0,
  //     monday: 1,
  //     tuesday: 2,
  //     wednesday: 3,
  //     thursday: 4,
  //     friday: 5,
  //     saturday: 6,
  //   };
  //   let totalDuration = 0;
  //   for (const day in timings) {
  //     if (timings.hasOwnProperty(day)) {
  //       timings[day].forEach(({ start, end }) => {
  //         const startTime = parseTime(start, startDate, daysInMilliseconds[day]);
  //         const endTime = parseTime(end, startDate, daysInMilliseconds[day]);
  //         if (startTime && endTime) {
  //           totalDuration =totalDuration + endTime - startTime;
  //         }
  //       });
  //     }
  //   }
  //   // Adjust the end date based on reading speed
  //   const totalMinutes = totalDuration / (1000 * 60); // Convert milliseconds to minutes
  //   const wordsRead = totalMinutes * readingSpeed;
  //   const estimatedReadingTimeInMilliseconds = (wordsRead / 50) * 60 * 1000; // Convert words to minutes and then to milliseconds
  //   const adjustedEndDate = new Date(startDate.getTime() + estimatedReadingTimeInMilliseconds);
  //   return adjustedEndDate;
  // };
  // const parseTime = (timeString, startDate, dayOffset) => {
  //   const match = timeString.match(/(\d{1,2}):(\d{2})\s?(AM|PM)/i);
  //   if (!match) {
  //     console.error(`Invalid time format for ${timeString}`);
  //     return null;
  //   }
  //   let [_, hours, minutes, period] = match;
  //   hours = parseInt(hours);
  //   minutes = parseInt(minutes);
  //   if (isNaN(hours) || isNaN(minutes)) {
  //     console.error(`Invalid time format for ${timeString}`);
  //     return null;
  //   }
  //   if (period.toUpperCase() === 'PM' && hours !== 12) {
  //     hours += 12;
  //   } else if (period.toUpperCase() === 'AM' && hours === 12) {
  //     hours = 0;
  //   }
  //   const time = new Date(startDate);
  //   time.setDate(time.getDate() + dayOffset);
  //   time.setHours(hours, minutes, 0, 0);
  //   return time;
};

export default calculateEndDate;
