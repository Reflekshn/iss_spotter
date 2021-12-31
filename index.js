const { fetchMyIP, fetchCoordsByIP } = require("./iss");

fetchMyIP((error, ip) => {
  if (error) {
    console.log(`Error: ${error}`);
    return;
  }

  console.log('It worked! Returned IP: ', ip);

  fetchCoordsByIP(ip, (error, data) => {
    if (error) {
      console.log(`Error: ${error}`);
      return;
    }

    console.log(`You are located at: ${data.latitude} latitude and ${data.longitude}`);
  });
});
