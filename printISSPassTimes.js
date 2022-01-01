// Output the passed in Fly Over Times to the console
const printISSPassTimes = function(flyOverTimes) {
  for (const time of flyOverTimes) {
    const dateAndTime = new Date(0);
    dateAndTime.setUTCSeconds(time.risetime); // Convert to UTC time
    const duration = time.duration;
    console.log(`Next pass at ${dateAndTime} for ${duration} seconds!`);
  }
};

module.exports = { printISSPassTimes };