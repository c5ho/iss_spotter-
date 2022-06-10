const { nextISSTimesForMyLocation } = require('./iss_promised.js');

//Call 
nextISSTimesForMyLocation()
  .then((flyOverTimes) => {
  printFlyOverTimes(flyOverTimes.response);
})
.catch((error) => {
  console.log("It didn't work!", error);
})

const printFlyOverTimes = function(riseTimeDuration) {
  for (const eachPass of riseTimeDuration) {
    const datetime = new Date(0); //datetime is an obj
    datetime.setUTCSeconds(eachPass.risetime);
    const duration = eachPass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
 }
};


