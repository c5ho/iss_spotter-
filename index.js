const { nextISSTimesForMyLocation } = require('./iss');

/** 
 * Input: 
 *   Array of data objects defining the next fly-overs of the ISS.
 *   [ { risetime: <number>, duration: <number> }, ... ]
 * Returns: 
 *   undefined
 * Sideffect: 
 *   Console log messages to make that data more human readable.
 *   Example output:
 *   Next pass at Mon Jun 10 2019 20:11:44 GMT-0700 (Pacific Daylight Time) for 468 seconds!
 */

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  //success, print out everthang!
  //console.log(passTimes.response);
  // console.log('-----------------');
  outputISSTimesForMyLocation(passTimes.response);
});

const outputISSTimesForMyLocation = function(passTimes) {
  let datetime = new Date(0);
  console.log(datetime);
  //console.log(pass.risetime);
  console.log(passTimes[0].risetime);
  
  console.log(datetime.setUTCSeconds(passTimes[0].risetime));
  datetime = new Date(0);
  console.log(datetime.setUTCSeconds(1654898651));
  
  
  console.log(datetime);
  console.log(`${datetime}`);
  
  
  // for (const pass of passTimes) {
  //   const datetime = new Date(0);
  //   console.log(datetime);
  //   console.log(pass.risetime);

  //   datetime.setUTCSeconds(pass.risetime);
  //   const duration = pass.duration;
  //   console.log(`Next pass at ${datetime} for ${duration} seconds!`);
 // }
};









