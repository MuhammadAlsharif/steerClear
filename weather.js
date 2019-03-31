'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()

const apiKey = '1d7aefea6bb440cbf9eb7b0829fbd241';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

const port = 3000

var accountSid = 'AC7ae3ea5e1e452d0645935228f0f793d9'; // Your Account SID from www.twilio.com/console
var authToken = 'b6e5a57512d0a3ba5de1eb01c8225595';   // Your Auth Token from www.twilio.com/console

var twilio = require('twilio');
var client = new twilio(accountSid, authToken);


app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
})

let weatherText;
app.post('/', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

  request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        weatherText = `It's ${weather.main.temp} degrees in ${weather.coord.lon},${weather.coord.lat}!`;
        res.render('index', {weather: weatherText, error: null});
      }
    }
  });
})
console.log(weatherText);
client.messages.create({
    body: weatherText,
    to: '+16616755558',  // Text this number
    from: '+14157809455' // From a valid Twilio number
})
.then((message) => console.log(message.sid));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
