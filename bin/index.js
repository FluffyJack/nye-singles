var express = require('express');
var required = require('required_env');
var pg = require('pg');
var curry = require('lodash').curry;
var create = curry(require('../src/singles').create)(pgClient);

if (process.env.NODE_ENV === 'production') {
  required(require('../src/env'));
} else {
  required(require('../config/env'));
}

var app = express();
app.use(express.static(__dirname + '/../public'));

var pgClient = new pg.Client(process.env.DATABASE_URL);
pgClient.connect(function(err) {
  if (err) {
    console.error('Error connecting to the database', err);
    process.exit(1);
  }
});

app.listen(process.env.PORT, function() {
  console.log('Express app is running on port', process.env.PORT);
});
