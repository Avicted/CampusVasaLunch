// Campus Vasa lunch API  - Victor Anderssén 2017

// Includes
var express = require('express');
var cors = require('cors');
var request = require('request');
var bodyParser = require('body-parser')
var prettyjson = require('prettyjson');
var app = express();

// Settings
app.use(bodyParser.json());
app.use(cors());

// Routes / API endpoints
app.get('/test', function(req, res){
  var alere = 'http://www.juvenes.fi/DesktopModules/Talents.LunchMenu/LunchMenuServices.asmx/GetMenuByWeekday?KitchenId=45&MenuTypeId=60&Week=35&Weekday=3&lang=%27sv-SE%27&format=json';
  var test = 'https://api.victoranderssen.com/lunchtoday/w33';

  request(alere, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      
      var body = jsonClean(body);

      // is the var an object?
      //console.log(body instanceof Object);

      //that's all... no magic, no bloated framework
      var lunchItemsSE = [];
      traverse(body, process);
      console.log(lunchItemsSE);

      //console.log(prettyjson.render(keys));
      res.send(body);
    }
  })
});


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
  //console.log(key + " : "+ value);

  // Find all occurances of the swedish lunch items that do not begin with LOUNAS ?! and are not empty ... API at its finest
  if (key == 'Name_SV' && value.includes('LOUNAS') == false && value !== '') {
    console.log(key + " : "+ value);
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