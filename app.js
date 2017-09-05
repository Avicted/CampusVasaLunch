// Campus Vasa lunch API  - Victor Anderssén 2017

/*
 * TODO:
 * add all the different MenuTypeIds
 * add w33 by using the FB graph API?
 * add the other restaurants, cafetechno, cottonclub, leison -> webparser / scraper from the website or from external lunch site
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

// W33 test
var getLunchW33 = function () {
  getLunch.W33
  .then(function (result) {
    console.log(result);
  })
  .catch(function (error) {
    console.log(error.message);
  });
};
getLunchW33();


app.listen(3000);
console.log("The server is now running on port 3000.");