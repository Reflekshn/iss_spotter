const { nextISSTimesForMyLocation } = require("./iss");

// Function to make several API calls to locate the user's current location and return the next 5 fly over times of the ISS
nextISSTimesForMyLocation((error, flyOverTimes) => {
  // Check for an error, output to the console, and quit the program
  if (error) {
    console.log(`Error: ${error}`);
    return;
  }

  // Output the retrieved Fly Over Times to the console
  for (const time of flyOverTimes) {
    const dateAndTime = new Date(0);
    dateAndTime.setUTCSeconds(time.risetime); // Convert to UTC time
    const duration = time.duration;
    console.log(`Next pass at ${dateAndTime} for ${duration} seconds!`);
  }
});