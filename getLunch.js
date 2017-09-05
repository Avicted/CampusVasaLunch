// Restaurant modules
var getLunchJuvenes = require('./getLunchJuvenes.js');

module.exports = function() {

  // TODO: all these promises do the same thing, maby use parameters?
  var alere = new Promise(
    function (resolve, reject) {
      var juvenes = getLunchJuvenes(); // move this out to the anon function? and pass it into all methods?
      var result = juvenes.getLunchTodayJuvenes(juvenes.restaurants.alere);

      if (result) {
          resolve(result); // fulfilled
      } else {
          var reason = new Error('Could not fetch any data for alere');
          reject(reason); // reject
      }
    }
  );

  var serveri = new Promise(
    function (resolve, reject) {
      var juvenes = getLunchJuvenes(); // move this out to the anon function? and pass it into all methods?
      var result = juvenes.getLunchTodayJuvenes(juvenes.restaurants.serveri);

      if (result) {
          resolve(result); // fulfilled
      } else {
          var reason = new Error('Could not fetch any data for serveri');
          reject(reason); // reject
      }
    }
  );

  var wolffs = new Promise(
    function (resolve, reject) {
      var juvenes = getLunchJuvenes(); // move this out to the anon function? and pass it into all methods?
      var result = juvenes.getLunchTodayJuvenes(juvenes.restaurants.wolffs);

      if (result) {
          resolve(result); // fulfilled
      } else {
          var reason = new Error('Could not fetch any data for wolffs');
          reject(reason); // reject
      }
    }
  );

  var mathilda = new Promise(
    function (resolve, reject) {
      var juvenes = getLunchJuvenes(); // move this out to the anon function? and pass it into all methods?
      var result = juvenes.getLunchTodayJuvenes(juvenes.restaurants.mathilda);

      if (result) {
          resolve(result); // fulfilled
      } else {
          var reason = new Error('Could not fetch any data for mathilda');
          reject(reason); // reject
      }
    }
  );

  return {
    alere: alere,
    serveri: serveri,
    wolffs: wolffs,
    mathilda: mathilda
  };
}


