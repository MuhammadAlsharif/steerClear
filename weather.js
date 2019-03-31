const request = require('request');
const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.render('index')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

const argv = require('yargs').argv;
let apiKey = '1d7aefea6bb440cbf9eb7b0829fbd241';
let city = argv.c || 'portland';
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`



request(url, function (err, response, body) {
  if(err){
    console.log('error:', error);
  } else {
    let weather = JSON.parse(body)
    //console.log('body:', body);
    if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again'});
      }
      let message = `It's ${weather.main.temp} degrees in
               ${weather.name}!`;
      console.log(message);
  }
});
