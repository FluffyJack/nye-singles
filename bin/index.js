var required = require('required_env');
if (process.env.NODE_ENV === 'production') {
  required(require('../src/env'));
} else {
  required(require('../config/env'));
}

var express = require('express');
var pg = require('pg');
var bodyParser = require('body-parser');
var setupRoutes = require('../src/routes');

var app = express();
app.use(express.static(__dirname + '/../public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', __dirname + '/../views');
app.set('view engine', 'jade');

var pgClient = new pg.Client(process.env.DATABASE_URL);
pgClient.connect(function(err) {
  if (err) {
    console.error('Error connecting to the database', err);
    process.exit(1);
  }
});

setupRoutes(app, pgClient);

var all = require('../src/singles').all;
setInterval(function() {
  all(pgClient).then(function(result) {
    console.log('Singles queried', result);
  }, function(err) {
    console.error('Error getting all singles', err);
  });
}, 10 * 1000);

app.listen(process.env.PORT, function() {
  console.log('Express app is running on port', process.env.PORT);
});
