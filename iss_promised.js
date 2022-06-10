const request = require('request-promise-native');
// The request-promise-native library is promised-based. 
//This means that it returns a promise for each async 
//network request. By "chaining" these promises 
//together, we were able to refactor our code and avoid 
//nested callbacks or "callback hell".

/*
 * Requests user's ip address from https://www.ipify.org/
 * Input: None
 * Returns: Promise of request for ip data, returned as JSON string
 */
const fetchMyIP = function() {
  const url = 'https://api.ipify.org?format=json';
  //each return is a promise
  return request(url, (error, response, body) => { 
  });
}
/* 
 * Makes a request to freegeoip.app using the provided IP address, to get its geographical information (latitude/longitude)
 * Input: JSON string containing the IP address
 * Returns: Promise of request for lat/lon
 */
const fetchCoordsByIP = function(body) {
  const ipAddy = JSON.parse(body).ip;
  const url = 'https://api.ipbase.com/v2/info?apikey=3lvCcz2NlLfuCYQh90DNMHxBtCYtlcwr5P7zpxlV&language=en&ip=' + ipAddy;
  return request(url, (error, response, body) => {
  });
};
/*
 * Requests data from api.open-notify.org using provided lat/long data
 * Input: JSON body containing geo data response from freegeoip.app
 * Returns: Promise of request for fly over data, returned as JSON string
 */  
const fetchISSFlyOverTimes = function(body) {
  const geoInfo = JSON.parse(body);
  const latitude = geoInfo.data.location.latitude;
  const longitude = geoInfo.data.location.longitude;
  const url = `https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`;
  return request(url, (error, response, body) => {
  });
};
/* 
 * Input: None
 * Returns: Promise for fly over data for users location
 */
const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((body) => { 
      const flyOverTimes = JSON.parse(body);
      //Can also destructure the object and only 
      //return the response portion of the data
      // const { response } = JSON.parse(body);
      // return {response };
      return flyOverTimes;
    }); 
}

module.exports = { nextISSTimesForMyLocation };

