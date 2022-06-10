const request = require('request');
/**
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


const fetchCoordsByIP = function(ip, callback) {
  
  const URL = 'https://api.ipbase.com/v2/info?apikey=3lvCcz2NlLfuCYQh90DNMHxBtCYtlcwr5P7zpxlV&language=en&ip='+ip;

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

module.exports = { fetchMyIP, fetchCoordsByIP };

