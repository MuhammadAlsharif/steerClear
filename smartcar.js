'use strict';
const cors = require('cors');
const express = require('express');
const smartcar = require('smartcar');
const {first_weather,get_weather} = require('./test');



const app = express()
  .use(cors());
const port = 3000;
app.use(express.static(__dirname));

const client = new smartcar.AuthClient({
  clientId: 'd5a401e2-cac3-4c1c-b3c0-0a9d073c1ee7',
  clientSecret: '58fb8aef-a633-4279-b0d2-ab276b5fc855',
  redirectUri: 'http://localhost:3000/exchange',
  scope: ['read_vehicle_info', 'read_location'],
  testMode: false,
});

// global variable to save our accessToken
let access;

var timer;

app.get('/', function(req,res){
  res.sendfile('index.html');
})

app.get('/login', function(req, res) {
  const link = client.getAuthUrl();
  res.redirect(link);
});


app.get('/exchange', function(req, res) {
  const code = req.query.code;

  return client.exchangeCode(code)
    .then(function(_access) {
      // in a production app you'll want to store this in some kind of persistent storage
      access = _access;

      res.redirect('/');
    })
    .catch(function(error){
      console.log(error);
    });
});

app.get('/vehicle', function(req, res) {
  return smartcar.getVehicleIds(access.accessToken)
    .then(function(data) {
      // the list of vehicle ids
      return data.vehicles;
    })
    .then(function(vehicleIds) {
      // instantiate the first vehicle in the vehicle id list
      const vehicle = new smartcar.Vehicle(vehicleIds[0], access.accessToken);

      return vehicle.info();
    })
    .then(function(info) {
      console.log(info);
      // {
      //   "id": "36ab27d0-fd9d-4455-823a-ce30af709ffc",
      //   "make": "TESLA",
      //   "model": "Model S",
      //   "year": 2014
      // }

      res.json(info);
    });
});

app.get('/stop', function(req,res){
if (timer){
  clearInterval(timer);
}
res.send('');
});

app.get('/location', async function(req,res){

// List all vehicles associated with this access token
const {vehicles} = await smartcar.getVehicleIds(access.accessToken);

// Use the first vehicle
const vehicle = new smartcar.Vehicle(vehicles[0], access.accessToken);

// Fetch the vehicle's location
const location = await vehicle.location();
if (timer){
  clearInterval(timer);
}
console.log(location);
first_weather(location.data.latitude, location.data.longitude);
timer = setInterval(()=>get_weather(location.data.latitude, location.data.longitude),60000);
res.send(location);
//console.log(location);
}

)

app.listen(port, () => console.log(`Listening on port ${port}`));
