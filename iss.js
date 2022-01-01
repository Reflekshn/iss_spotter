const request = require("request");

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
      return callback(error, null);
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};

/*
 * Makes a single API request to retrieve latitude and longitude coordinates given an ip address
 * Input:
 *   - A string containing an IP address
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The corresponding coordinates as an object (null if error). Example:
 *     { latitude: 134564234, longitude: 600 }
 * */
const fetchCoordsByIP = function(ip, callback) {
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const coords = {
      latitude: JSON.parse(body).latitude,
      longitude: JSON.parse(body).longitude
    };

    callback(null, coords);
  });
};

/*
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 * */
const fetchISSFlyOverTimes = function(coords, callback) {
  request(`https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching ISS fly over times. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const issFlyOverData = JSON.parse(body).response;
    callback(null, issFlyOverData);
  });
};

// iss.js

/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results.
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */
const nextISSTimesForMyLocation = function(callback) {
  // Async call to fetch the user's current IP address
  fetchMyIP((error, ip) => {
    if (error) {
      console.log(`Error: ${error}`);
      return;
    }

    // Async call to fetch the user's latitude and longitude from their IP address
    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        console.log(`Error: ${error}`);
        return;
      }

      // Async call to fetch the next 5 ISS Fly Over Times in relation the user's location coordinates
      fetchISSFlyOverTimes(coords, (error, issFlyOverData) => {
        if (error) {
          console.log(`Error: ${error}`);
          return;
        }

        callback(null, issFlyOverData);
      });
    });
  });
};

module.exports = { nextISSTimesForMyLocation };