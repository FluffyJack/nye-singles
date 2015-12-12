var express = require('express');
var required = require('required_env');
var pg = require('pg');

if (process.env.NODE_ENV === 'production') {
  required(require('../src/env'));
} else {
  required(require('../config/env'));
}

var app = express();
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
