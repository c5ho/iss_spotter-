const { nextISSTimesForMyLocation } = require('./iss_promised.js');

//Call
nextISSTimesForMyLocation()
  .then((flyOverTimes) => {
  //since the whole object was returned, need to get
  //down to next level for "response" is an array
  //of objects of the actual times and durations
    printFlyOverTimes(flyOverTimes.response);
  })
  .catch((error) => {
    console.log("It didn't work!", error);
  });

const printFlyOverTimes = function(riseTimeDuration) {
  for (const eachPass of riseTimeDuration) {
    const datetime = new Date(0); //datetime is an obj
    datetime.setUTCSeconds(eachPass.risetime);
    const duration = eachPass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};


