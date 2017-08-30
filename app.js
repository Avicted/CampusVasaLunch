// Campus Vasa lunch API  - Victor Anderssén 2017

var express = require('express');
var cors = require('cors');
var request = require('request');
var bodyParser = require('body-parser')
var prettyjson = require('prettyjson');
var app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/test', function(req, res){
  var alere = 'http://www.juvenes.fi/DesktopModules/Talents.LunchMenu/LunchMenuServices.asmx/GetMenuByWeekday?KitchenId=45&MenuTypeId=60&Week=35&Weekday=3&lang=%27sv-SE%27&format=json';
  var test = 'https://api.victoranderssen.com/lunchtoday/w33';

  request(alere, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      
      var body = jsonClean(body);

      console.log(prettyjson.render(body));
      res.send(body);
    }
  })
});


function jsonClean(dirty) {
  // remove  ({"d":" from the beginning
  var dirty = dirty.substr(7);
  // remove  "}); from the end
  var dirty = dirty.substr(0, dirty.length - 4);
  // replace \ -> empty

  var cleanJson = dirty.replace(/\\/g, ' ');

  return cleanJson;
}

app.listen(3000);
console.log("The server is now running on port 3000.");