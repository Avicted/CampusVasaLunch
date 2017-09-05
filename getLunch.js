// Restaurant modules
var getLunchJuvenes = require('./getLunchJuvenes.js');
var getLunchW33 = require('./getLunchW33.js');

module.exports = function() {

  var juvenes = getLunchJuvenes(); // move this out to the anon function? and pass it into all methods?
  var W33 = getLunchW33();

  // TODO: all these promises do the same thing, maby use parameters?
  var alere = new Promise(
    function (resolve, reject) {
      var resultAlere = juvenes.getLunchTodayJuvenes(juvenes.restaurants.alere);
      if (resultAlere) {
          resolve(resultAlere); // fulfilled
      } else {
          var reason = new Error('Could not fetch any data for alere');
          reject(reason); // reject
      }
    }
  );

  var serveri = new Promise(
    function (resolve, reject) {
      var resultServeri = juvenes.getLunchTodayJuvenes(juvenes.restaurants.serveri);
      if (resultServeri) {
          resolve(resultServeri); // fulfilled
      } else {
          var reason = new Error('Could not fetch any data for serveri');
          reject(reason); // reject
      }
    }
  );

  var wolffs = new Promise(
    function (resolve, reject) {
      var resultWolffs = juvenes.getLunchTodayJuvenes(juvenes.restaurants.wolffs);
      if (resultWolffs) {
          resolve(resultWolffs); // fulfilled
      } else {
          var reason = new Error('Could not fetch any data for wolffs');
          reject(reason); // reject
      }
    }
  );

  var mathilda = new Promise(
    function (resolve, reject) {
      var resultMathilda = juvenes.getLunchTodayJuvenes(juvenes.restaurants.mathilda);
      if (resultMathilda) {
          resolve(resultMathilda); // fulfilled
      } else {
          var reason = new Error('Could not fetch any data for mathilda');
          reject(reason); // reject
      }
    }
  );

  var W33 = new Promise(
    function (resolve, reject) {
      var resultW33 = W33.getLunchTodayW33();
      if (resultW33) {
          resolve(resultW33); // fulfilled
      } else {
          var reason = new Error('Could not fetch any data for W33');
          reject(reason); // reject
      }
    }
  );

  return {
    alere: alere,
    serveri: serveri,
    wolffs: wolffs,
    mathilda: mathilda,
    W33: W33
  };
}


