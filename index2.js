const { nextISSTimesForMyLocation } = require('./iss_promised');
const { printISSPassTimes } = require('./printISSPassTimes');

// Function to make several API calls to locate the user's current location and return the next 5 fly over times of the ISS
nextISSTimesForMyLocation()
  .then((flyOverTimes) => {
    printISSPassTimes(flyOverTimes);
  });