// Campus Vasa lunch API  - Victor Anderssén 2017

/*
 * TODO:
 * add all the different MenuTypeIds
 * 
 */

// Includes
var config = require('./config.js');
var getLunch = require('./getLunch.js');
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser')
var prettyjson = require('prettyjson');
var app = express();


var getLunch = getLunch();

// Alere test
var getLunchAlere = function () {
  getLunch.alere
  .then(function (result) {
      console.log(result);
  })
  .catch(function (error) {
      console.log(error.message);
  });
};
getLunchAlere();


// Serveri test
var getLunchServeri = function () {
  getLunch.serveri
  .then(function (result) {
      console.log(result);
  })
  .catch(function (error) {
      console.log(error.message);
  });
};
getLunchServeri();


// Wolffs test
var getLunchWolffs = function () {
  getLunch.wolffs
  .then(function (result) {
      console.log(result);
  })
  .catch(function (error) {
      console.log(error.message);
  });
};
getLunchWolffs();

// Mathilda test
var getLunchMathilda = function () {
  getLunch.mathilda
  .then(function (result) {
      console.log(result);
  })
  .catch(function (error) {
      console.log(error.message);
  });
};
getLunchMathilda();


app.listen(3000);
console.log("The server is now running on port 3000.");