//var config = require('../config.js');
var dateFormat = require('dateformat');
var request = require('request');

module.exports = function() {

  function getLunchTodayW33() {
    return new Promise(function(resolve, reject) {
      var url = 'https://graph.facebook.com/1409854185958520/posts?access_token=' + process.env.GRAPH_API_ACCESS_TOKEN;
      request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          var currentDate = new Date();
          currentDate = dateFormat(currentDate, 'isoDate');

          body = JSON.parse(body);
          var result = 'W33 ' + dateFormat(currentDate, "fullDate") + ' \n\n';

          var postsCount = body.data.length;
          var lunchFound = false;

          // Loop through all Facebook posts in the first pagination page of the W33 page
          // If a enty matches the current date, add its message to the result 
          for (var i = 0; i < postsCount; i++) {
            var createdTimeTemp = dateFormat(body.data[i].created_time, 'isoDate');

            if (createdTimeTemp === currentDate) {
              lunchFound = true;
              result += body.data[i].message;
              resolve(result);
              break;
            }
          }

          // If no lunch is found in a Facebook post having the same datetime as the current date, add error to result
          if (lunchFound == false) {
            result += 'Ingen lunch hittades, försök igen senare';
            resolve(result);
          }
        }
      
      });
    });
  }

  return {
    getLunchTodayW33: getLunchTodayW33
  };
    
}