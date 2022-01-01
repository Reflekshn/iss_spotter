const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require("./iss");

// Async call to fetch the user's current IP address
fetchMyIP((error, ip) => {
  if (error) {
    console.log(`Error: ${error}`);
    return;
  }

  // Ouput the IP address to the console
  console.log('It worked! Returned IP: ', ip);

  // Async call to fetch the user's latitude and longitude from their IP address
  fetchCoordsByIP(ip, (error, coords) => {
    if (error) {
      console.log(`Error: ${error}`);
      return;
    }

    // Output the user's current coordinates
    console.log(`You are located at: ${coords.latitude} latitude and ${coords.longitude}`);

    // Async call to fetch the next 5 ISS Fly Over Times in relation the user's location coordinates
    fetchISSFlyOverTimes(coords, (error, issFlyOverData) => {
      if (error) {
        console.log(`Error: ${error}`);
        return;
      }

      // Output the next 5 fly over times to the console
      for (const element of issFlyOverData) {
        console.log(`The next 5 ISS Fly Over Times are: ${element.risetime} for ${element.duration}ms`);
      }
    });
  });
});