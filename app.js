// Campus Vasa lunch API  - Victor Anderssén 2017

// TODO add all the different MenuTypeIds

// Includes
var config = require('./config.js');
var express = require('express');
var cors = require('cors');
var request = require('request');
var bodyParser = require('body-parser')
var prettyjson = require('prettyjson');
var dateFormat = require('dateformat');
var app = express();


// Settings
app.use(bodyParser.json());
app.use(cors());


// Global restaurant ids
var restaurants = {
  alere: {id: 45, name: 'Alere', menuTypeId: 60},
  serveri: {id: 35, name: 'Serveri', menuTypeId: 60},
  wolffs: {id: 350047, name: 'Wolffs', menuTypeId: 23},
  mathilda: {id: 34, name: 'Mathilda', menuTypeId: 60}
};


// Global lunch items arrays TODO can these please be local? :/
var lunchItemsSE = [];


// Routes / API endpoints TODO: make this a reusable general function? maby the KitchenIds could exist on an object / array?
app.get('/alere', function(req, res){
  getLunchTodayJuvenes(req, res, restaurants.alere);
});

app.get('/serveri', function(req, res){
  getLunchTodayJuvenes(req, res, restaurants.serveri);
});

app.get('/wolffs', function(req, res){
  getLunchTodayJuvenes(req, res, restaurants.wolffs);
});

app.get('/mathilda', function(req, res){
  getLunchTodayJuvenes(req, res, restaurants.mathilda);
});


function getLunchTodayJuvenes(req, res, restaurant) {
  // TODO - restore date
  var currentDate = new Date('2017-9-4');
  var weekNumber = dateFormat(currentDate, "W");
  var dayNumber = currentDate.getDay();
  var restaurantURL = 'http://www.juvenes.fi/DesktopModules/Talents.LunchMenu/LunchMenuServices.asmx/GetMenuByWeekday?KitchenId=' + restaurant.id + '&MenuTypeId=' + restaurant.menuTypeId + '&Week=' + weekNumber + '&Weekday=' + dayNumber + '&lang=%27sv-SE%27&format=json';

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
  
        console.log(result);
        res.send(result);
      }
      else {
        result += restaurant.name + ' ' + dateFormat(currentDate, "fullDate") + ' \n\n';
        result += 'Det finns ingen lunch data för tillfället';

        console.log(result);
        res.send(result);
      }
     
      // Empty the array so that it does not accumulate results for the unlucky next user who will get the result * (number of requests that ever happend)
      lunchItemsSE = [];
    }
  })
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




app.listen(3000);
console.log("The server is now running on port 3000.");