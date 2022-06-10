// const { nextISSTimesForMyLocation } = require('./iss');
const { fetchMyIP } = require('/.iss_promised.js');

fetchMyIP()
.then(body => console.log(body));

// /** 
//  * Input: 
//  *   Array of data objects defining the next fly-overs of the ISS.
//  *   [ { risetime: <number>, duration: <number> }, ... ]
//  * Returns: 
//  *   undefined
//  * Sideffect: 
//  *   Console log messages to make that data more human readable.
//  *   Example output:
//  *   Next pass at Mon Jun 10 2019 20:11:44 GMT-0700 (Pacific Daylight Time) for 468 seconds!
//  */

// nextISSTimesForMyLocation((error, passTimes) => {
//   if (error) {
//     return console.log("It didn't work!", error);
//   }
//   //success, print out everthang!
//   // console.log(passTimes.response);
//   // console.log('-----------------');
//   outputISSTimesForMyLocation(passTimes.response);
// });

// const outputISSTimesForMyLocation = function(passTimes) {
//   for (const pass of passTimes) {
//     const datetime = new Date(0); //datetime is an obj
//     // console.log(typeof datetime);
//     // console.log(pass.risetime);
//     // let temp = Object.assign({},{name:"Cal"});
//     // console.log(temp);
//     // console.log(typeof temp);
//     datetime.setUTCSeconds(1655151412);
//     // console.log(typeof datetime);
//     const duration = pass.duration;
//     console.log(`Next pass at ${datetime} for ${duration} seconds!`);
//  }
// };

// /*
// [
//   { risetime: 1654997606, duration: 484 },
//   { risetime: 1655034006, duration: 544 },
//   { risetime: 1655070406, duration: 472 },
//   { risetime: 1655106806, duration: 625 },
//   { risetime: 1655143206, duration: 625 }
// ]

// */



