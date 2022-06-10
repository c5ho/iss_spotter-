const request = require('request');
/**fetchMyIP
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const fetchMyIP = function(callback) {
  const URL = 'https://api.ipify.org?format=json';
  // use request to fetch IP address from JSON API
  request(URL, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const ipAddy = JSON.parse(body).ip;
    return callback(null, ipAddy);  //don't necessarily need return here since last case
  });
};

/**fetchCoordsByIP
 * Makes a single API request to retrieve the lat/lng for a given IPv4 address.
 * Input:
 *   - The ip (ipv4) address (string)
 *   - A callback (to pass back an error or the lat/lng object)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The lat and lng as an object (null if error). Example:
 *     { latitude: '49.27670', longitude: '-123.13000' }
 */

const fetchCoordsByIP = function(ip, callback) {
  const URL = 'https://api.ipbase.com/v2/info?apikey=3lvCcz2NlLfuCYQh90DNMHxBtCYtlcwr5P7zpxlV&language=en&ip=' + ip;

  // use request to fetch longitude/latitude with IP
  request(URL, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const geoInfo = JSON.parse(body);
    const latLong = {
      latitude: geoInfo.data.location.latitude,
      longitude: geoInfo.data.location.longitude,
    };
    return callback(null, latLong);
  });
};

/**fetchISSFlyOverTimes
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
*/
const fetchISSFlyOverTimes = function(coords, callback) {
  const URL = `https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;

  request(URL, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code $response.StatusCode} when fetching flyover times. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const flyOverTimes = JSON.parse(body);
    //console.log(flyOverTimes);
    return callback(null, flyOverTimes);
  });
};

/**nextISSTimesForMyLocation
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results. 
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);;
    }

    fetchCoordsByIP(ip, (error, coordinates) => {
      if (error) {
        return callback(error, null);;
      }
     
      fetchISSFlyOverTimes(coordinates, (error, flyOverTimes) => {
        if (error) {
          return callback(error, null);;
        }
        return callback(null, flyOverTimes);
      });
    });
  });
}


module.exports = { nextISSTimesForMyLocation };

