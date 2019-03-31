'use strict';
var express = require('express'); //import express constructor
var app = express(); // custom http framework
var request = require('request');
app.use(express.static('public'));

const port = 3000

var accountSid = 'AC7ae3ea5e1e452d0645935228f0f793d9'; // Your Account SID from www.twilio.com/console
var authToken = 'b6e5a57512d0a3ba5de1eb01c8225595';   // Your Auth Token from www.twilio.com/console

var twilio = require('twilio');
var client = new twilio(accountSid, authToken);

client.messages.create({
    body: 'The high temperatures due to weather will cause your food to expire.',
    to: '+16616755558',  // Text this number
    from: '+14157809455' // From a valid Twilio number
})
.then((message) => console.log(message.sid));


app.get('/', (req, res) => res.send('TWIlio workING'))

app.listen(port, () => console.log(`Example app listening on port`))
