'use strict';
//var express = require('express'); //import express constructor
//var app = express(); // custom http framework

//app.use(express.static('public'));
//var car = require('./smartcar');
//var location = car.locCor;
//console.log(location);
function get_weather(lat, lon) {



//const port = 3000
let request = require('request');

let apiKey = 'ab8e730e5a8709c655f6d6e543b8b2b5';
//let city = 'portland';
//let lat=0;// = 34;
//let lon=0;// = -118;
//let url = `http://api.openweathermap.org/data/2.5/weather?lat=34&lon=-118`
let url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

// request(url, function (err, response, body) {
// var obj;
// //obj = JSON.parse(body);
// //let lat = obj.coord.lat;
// //let lon = obj.coord.lon;
// //});
let weather;

request(url, function (err, response, body) {
  if(err){
    console.log('error:', error);
  } else {
    //console.log('body:', body);
    weather = JSON.parse(body);
    let lat2 = weather.coord.lat;
    let lon2 = weather.coord.lon;
    console.log(lat2);
    console.log(lon2);
    var accountSid = 'AC7ae3ea5e1e452d0645935228f0f793d9'; // Your Account SID from www.twilio.com/console
    var authToken = 'b6e5a57512d0a3ba5de1eb01c8225595';   // Your Auth Token from www.twilio.com/console

    var twilio = require('twilio');
    var client = new twilio(accountSid, authToken);

    var url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    let message = `It's ${weather.main.temp} degrees in
                   ${weather.name}!`;


    client.messages.create({
        body: message,
        to: '+16616755558',  // Text this number
        from: '+19477770095' // From a valid Twilio number
    })
    .then((message) => console.log(message.sid));
  }
});

}

module.exports = get_weather

//app.listen(port, () => console.log(`Example app listening on port`));
