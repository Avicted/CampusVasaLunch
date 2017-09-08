// Campus Vasa lunch Bot  - Victor Anderssén 2017

// Includes
//var config = require('./config.js');
var getLunch = require('./getLunch.js');
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser')
var app = express();
var getLunch = getLunch();

app.use(bodyParser.json());


String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}


app.get('/webhook', function(req, res) {
  if (req.query['hub.mode'] === 'subscribe' &&
      req.query['hub.verify_token'] === process.env.VERIFY_TOKEN) {
    console.log("Validating webhook");
    res.status(200).send(req.query['hub.challenge']);
  } else {
    console.error("Failed validation. Make sure the validation tokens match.");
    res.sendStatus(403);          
  }  
});


function sendTextMessage(sender, text) {
  var messageData = {
    recipient: {
      id: sender
    },
    message: {
      text: text
    }
  };
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token:token},
    method: 'POST',
    json: messageData
  }, function(error, response, body) {
    if (error) {
      console.log('Error sending message: ', error);
    } else if (response.body.error) {
      console.log('Error: ', response.body.error);
    }
  });
}


app.post('/webhook', function (req, res) {
  var data = req.body;

  // Make sure this is a page subscription
  if (data.object === 'page') {

    // Iterate over each entry - there may be multiple if batched
    data.entry.forEach(function(entry) {
      var pageID = entry.id;
      var timeOfEvent = entry.time;

      // Iterate over each messaging event
      entry.messaging.forEach(function(event) {
        if (event.message) {
          receivedMessage(event);
        } else {
          console.log("Webhook received unknown event: ", event);
        }
      });
    });

    // Assume all went well.
    //
    // You must send back a 200, within 20 seconds, to let us know
    // you've successfully received the callback. Otherwise, the request
    // will time out and we will keep trying to resend.
    res.sendStatus(200);
  }
});

// Restaurant API
var getLunchW33 = function (senderID) {
  getLunch.W33
  .then(function (result) {
    //console.log(result);
    sendTextMessage(senderID, result);
  })
  .catch(function (error) {
    //console.log(error.message);
  });
};
  
function receivedMessage(event) {
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var timeOfMessage = event.timestamp;
  var message = event.message;

  console.log("Received message for user %d and page %d at %d with message:", senderID, recipientID, timeOfMessage);
  console.log(JSON.stringify(message));

  var messageId = message.mid;
  var messageText = message.text;
  var messageAttachments = message.attachments;

  if (messageText) {

    // If we receive a text message, check to see if it matches a keyword
    // and send back the example. Otherwise, just echo the text we received.
    switch (messageText) {
      case 'hjälp':
      case 'Hjälp':
      {
        getHelpText(senderID);
        break;
      }
      case 'w33':
      case 'W33':
      {
        //getData(senderID, messageText);
        getLunchW33(senderID);
        break;
      }
     
      default:
        getHelpText(senderID);
    }
  } else if (messageAttachments) {
    sendTextMessage(senderID, "Message with attachment received");
  }

}

function getHelpText(senderID) {
  //var messageText = 'För att få lunchmenyn från en specifik restaurang, skriv ett av följande kommandon: \n\nAlere\nServeri\nWolffsstreet\nMathilda\nW33\nCafetechno\n';
  var messageText = 'För att få lunchmenyn från en specifik restaurang, skriv ett av följande kommandon: \n\nW33\n';
  sendTextMessage(senderID, messageText);
}

/* function getData(senderID, messageText) {
  // determine restaurant
  var restaurant = messageText.toLowerCase();
  var restaurantFormatted = restaurant.capitalize();

  request.get({ url: "https://api.victoranderssen.com/lunchtoday/" + restaurant }, function(error, response, body) { 
    if (!error && response.statusCode == 200) {       
      body = JSON.parse(body);
      
      dateTimeReal = body[0].result[0].date_time_real;
      dayName = body[0].result[1].day_name;
      upvotes = body[0].result[2].upvotes;
      messageId = body[0].result[3].message_id;

      var size = body[0].result;
      size = size.length - 4;

      var lunchItems = [];
      var j = 4;
      for (var i = 0; i < size; i++) {
        var dishTemp = body[0].result[j].dish_of_the_day;
          // variable is defined
          lunchItems.push(body[0].result[j].dish_of_the_day);
          j = j + 1;
      }
      lunchItems = lunchItems.join("\n");
      var messageText = restaurantFormatted + ' ' + dayName + ' ' + dateTimeReal + '\n\n' + lunchItems + '\n\n';

      sendTextMessage(senderID, messageText);
    } // end of status 200 ok
    console.log('error DEBUG: ', error);
  })
} */

function sendTextMessage(recipientId, messageText) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: messageText
    }
  };
  callSendAPI(messageData);
}

function callSendAPI(messageData) {
  request({
    uri: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
    method: 'POST',
    json: messageData

  }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var recipientId = body.recipient_id;
      var messageId = body.message_id;

      console.log("Successfully sent generic message with id %s to recipient %s \n", 
        messageId, recipientId);
    } else {
      console.error("Unable to send message.");
      console.error(response);
      console.error(error);
    }
  });  
}


/* app.listen(3000, function () {
  console.log('LunchChatBot app listening on port 3000!')
}) */

app.listen(process.env.PORT);


// Successfull test of all the added restaurants
// Alere test
/* var getLunchAlere = function () {
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

var getLunchCafeTechno = function () {
  getLunch.cafeTechno
  .then(function (result) {
    console.log(result);
  })
  .catch(function (error) {
    console.log(error.message);
  });
};
getLunchCafeTechno(); */


/* app.listen(3000);
console.log("The server is now running on port 3000."); */