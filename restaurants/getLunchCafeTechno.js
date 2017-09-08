var dateFormat = require('dateformat');
var request = require('request');
var cheerio = require('cheerio');

module.exports = function() {

  function getLunchTodayCafeTechno() {
    return new Promise(function(resolve, reject) {
      var url = 'http://www.cafetechno.fi/meny/';
      request(url, function (error, response, html) {
        if (!error && response.statusCode == 200) {
          var currentDate = new Date();
          currentDate = dateFormat(currentDate, 'isoDate');
          var currentWeekNumber = dateFormat(currentDate, "W");
          var currentDayNumber = dateFormat(currentDate, "N");
          var result = 'CafeTechno ' + dateFormat(currentDate, "fullDate") + ' \n\n';
  
          // Get data from the website
          var $ = cheerio.load(html,{
            decodeEntities: false
          });
  
          $weekNumber = $('.menu-title2').html();
  
          var dishesPerDay = [];
          $('.menu-description2').children('p').each(function(i, elem) {
            dishesPerDay[i] = $(this).text();
          });
          
          var weekNumberEnd = $weekNumber.substr($weekNumber.length - 2); // Lunchmeny v.36 -> 36
  
          // Find the paragraph with the correct weekday name
          var dishesFound = false;
          
          if (currentWeekNumber === weekNumberEnd) {
            
            if (currentDayNumber == 1) {
              dishesPerDay.forEach(function(element) {
                if (element.includes("MÅNDAG") || element.includes("måndag") || element.includes("Måndag")) {
                  result += element.toLowerCase();
                }
              }, this);
            }
  
            if (currentDayNumber == 2) {
              dishesPerDay.forEach(function(element) {
                if (element.includes("TISDAG") || element.includes("tisdag") || element.includes("Tisdag")) {
                  result += element.toLowerCase();
                }
              }, this);
            }
  
            if (currentDayNumber == 3) {
              dishesPerDay.forEach(function(element) {
                if (element.includes("ONSDAG") || element.includes("onsdag") || element.includes("Onsdag")) {
                  result += element.toLowerCase();
                }
              }, this);
            }
  
            if (currentDayNumber == 4) {
              dishesPerDay.forEach(function(element) {
                if (element.includes("TORSDAG") || element.includes("torsdag") || element.includes("Torsdag")) {
                  result += element.toLowerCase();
                }
              }, this);
            }
  
            if (currentDayNumber == 5) {
              dishesPerDay.forEach(function(element) {
                if (element.includes("FREDAG") || element.includes("fredag") || element.includes("Fredag")) {
                  result += element.toLowerCase();
                }
              }, this);
            }
  
          }  
            // Send the result
            resolve(result);
        }
  
      });
    });
  }

  return {
    getLunchTodayCafeTechno: getLunchTodayCafeTechno
  };
    
}