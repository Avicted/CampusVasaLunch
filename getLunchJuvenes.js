var dateFormat = require('dateformat');
var request = require('request');

module.exports = function() {

  // Global restaurant ids
  var restaurants = {
    alere: {id: 45, name: 'Alere', menuTypeId: 60},
    serveri: {id: 35, name: 'Serveri', menuTypeId: 60},
    wolffs: {id: 350047, name: 'Wolffs', menuTypeId: 23},
    mathilda: {id: 34, name: 'Mathilda', menuTypeId: 60}
  }

  // Global lunch items arrays TODO can these please be local? :/
  var lunchItemsSE = [];

  function getLunchTodayJuvenes(restaurant) {
    // TODO - restore date
    //var currentDate = new Date('2017-9-4');
    var currentDate = new Date();
    var weekNumber = dateFormat(currentDate, "W");
    var dayNumber = currentDate.getDay();
    var restaurantURL = 'http://www.juvenes.fi/DesktopModules/Talents.LunchMenu/LunchMenuServices.asmx/GetMenuByWeekday?KitchenId=' + restaurant.id + '&MenuTypeId=' + restaurant.menuTypeId + '&Week=' + weekNumber + '&Weekday=' + dayNumber + '&lang=%27sv-SE%27&format=json';

    return new Promise(function(resolve, reject) {
      request(restaurantURL, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          
          var body = jsonClean(body);

          // Parse the json and find all the lunch items
          traverse(body, process);
          result = '';

          if (lunchItemsSE.length >= 1) {
            result += restaurant.name + ' ' + dateFormat(currentDate, "fullDate") + ' \n\n';
            for (let i = 0; i < lunchItemsSE.length; i++) {
              result += lunchItemsSE[i] + '\n';
            }
      
            resolve(result);
          }
          else {
            result += restaurant.name + ' ' + dateFormat(currentDate, "fullDate") + ' \n\n';
            result += 'Det finns ingen lunch data för tillfället';

            resolve(result);
          }
        
          // Empty the array so that it does not accumulate results for the unlucky next user who will get the result * (number of requests that ever happend)
          lunchItemsSE = [];
        }
      })
    });
    
  }

  function jsonClean(dirty) {
    // remove  ({"d":" from the beginning
    var dirty = dirty.substr(7);
    // remove  "}); from the end
    var dirty = dirty.substr(0, dirty.length - 4);
    // replace all \ -> empty
    var dirty = dirty.replace(/\\/g, '');
    // convert back to valid json
    var cleanJson = JSON.parse(dirty);

    return cleanJson;
  }


  //called with every property and its value
  function process(key, value) {
    // Find all occurances of the swedish lunch items that do not begin with LOUNAS ?! and are not empty ...
    if (key == 'Name_SV' && value.includes('LOUNAS') == false && value !== '') {
      lunchItemsSE.push(value);
      //console.log(key + " : "+ value);
    }
  }

  function traverse(o, func) {
    for (var i in o) {
      func.apply(this,[i,o[i]]);  
      if (o[i] !== null && typeof(o[i]) == "object") {
          //going one step down in the object tree!!
          traverse(o[i], func);
      }
    }
  }

  return {
    getLunchTodayJuvenes: getLunchTodayJuvenes,
    restaurants: restaurants
  };
  
}






