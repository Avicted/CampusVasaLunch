//var config = require('../config.js');
var dateFormat = require('dateformat');
var request = require('request');

module.exports = function() {

  function getLunchTodayCafeTechno() {
    return new Promise(function(resolve, reject) {
      var url = 'https://graph.facebook.com/344803872307929/posts?access_token=' + process.env.GRAPH_API_ACCESS_TOKEN;
      request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          var currentDate = new Date();
          currentDate = dateFormat(currentDate, 'isoDate');
          var currentWeekNumber = dateFormat(currentDate, "W");

          body = JSON.parse(body);
          var result = 'CafeTechno ' + dateFormat(currentDate, "fullDate") + ' \n\n';

          var postsCount = body.data.length;
          var lunchFound = false;

          // Fetch the newest post from their Facebook page, to this day (5.9.2017) they have only posted relevant info that we can use
          if (body.data[0].message !== null) {
            result += body.data[0].message;
            resolve(result);
          }
          else {
            result += 'Ingen lunch hittades, försök igen senare';
            resolve(result);
          }
        }
      
      });
    });
  }

  return {
    getLunchTodayCafeTechno: getLunchTodayCafeTechno
  };
    
}