'use strict';
var express = require('express'); //import express constructor
var app = express(); // custom http framework

app.use(express.static('public'));

const port = 3000
let request = require('request');

let apiKey = 'ab8e730e5a8709c655f6d6e543b8b2b5';
let city = 'portland';
//let url = `http://api.openweathermap.org/data/2.5/weather?lat=34&lon=-118`
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
let weather;
request(url, function (err, response, body) {
  if(err){
    console.log('error:', error);
  } else {
    console.log('body:', body);
    weather = JSON.parse(body);
    var accountSid = 'AC7ae3ea5e1e452d0645935228f0f793d9'; // Your Account SID from www.twilio.com/console
    var authToken = 'b6e5a57512d0a3ba5de1eb01c8225595';   // Your Auth Token from www.twilio.com/console

    var twilio = require('twilio');
    var client = new twilio(accountSid, authToken);
    client.messages.create({
        body: "test",
        to: '+16616755558',  // Text this number
        from: '+19477770095' // From a valid Twilio number
    })
    .then((message) => console.log(message.sid));

    let message = `It's ${weather.main.temp} degrees in
                   ${weather.name}!`;
    console.log(message);

    client.messages.create({
        body: message,
        to: '+16616755558',  // Text this number
        from: '+19477770095' // From a valid Twilio number
    })
    .then((message) => console.log(message.sid));
  }
});




app.get('/', (req, res) => res.send('TWIlio workING'))

app.listen(port, () => console.log(`Example app listening on port`))
