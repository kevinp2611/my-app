const calculateEndDate = (startDate, timings, readingSpeed) => {
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
  
    for (const day in timings) {
      if (timings.hasOwnProperty(day)) {
        timings[day].forEach(({ start, end }) => {
          const startTime = parseTime(start, startDate, daysInMilliseconds[day]);
          const endTime = parseTime(end, startDate, daysInMilliseconds[day]);
          if (startTime && endTime) {
            totalDuration += endTime - startTime;
          }
        });
      }
    }
  
    // Adjust the end date based on reading speed
    const totalMinutes = totalDuration / (1000 * 60); // Convert milliseconds to minutes
    const wordsRead = totalMinutes * readingSpeed;
    const estimatedReadingTimeInMilliseconds = (wordsRead / 50) * 60 * 1000; // Convert words to minutes and then to milliseconds
    const adjustedEndDate = new Date(startDate.getTime() + estimatedReadingTimeInMilliseconds);
  
    return adjustedEndDate;
  };
  
  const parseTime = (timeString, startDate, dayOffset) => {
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
  
    if (period.toUpperCase() === 'PM' && hours !== 12) {
      hours += 12;
    } else if (period.toUpperCase() === 'AM' && hours === 12) {
      hours = 0;
    }
  
    const time = new Date(startDate);
    time.setDate(time.getDate() + dayOffset);
    time.setHours(hours, minutes, 0, 0);
    return time;
  };
  
  export default calculateEndDate;
