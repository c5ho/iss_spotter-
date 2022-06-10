const { fetchMyIP, fetchCoordsByIP } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
//   console.log('It worked! Returned IP:' , ip);
// });

const ipAddy = '172.83.47.142'

fetchCoordsByIP(ipAddy, (error, coordinates) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  console.log('It worked! Coordinates:' , coordinates);
}); 