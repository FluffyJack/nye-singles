var identities = require('gender-identities/identities').identities;
var sendSMS = require('./sms').send;

module.exports = function setupRoutes(app, pgClient) {
  var curry = require('lodash').curry;
  var create = curry(require('../src/singles').create)(pgClient);

  app.get('/', function(req, res) {
    var alert = '';

    if (req.query.badGroup === 'true') {
      alert = 'That group doesn\'t exist, try again';
    }

    if (req.query.success === 'true') {
      alert = 'You\'re all signed up, you should get an SMS with instructions soon';
    }

    res.render('home', { alert: alert, identities: identities });
  });

  app.post('/singles', function(req, res) {
    var single = req.body.single;

    if (single.group.toLowerCase() != 'jacks') {
      console.error('Someone tried to sign up with a bad group', single, 'Request', req);
      res.redirect('/?badGroup=true');
    }

    create({
      name: single.name,
      phone: single.phone,
      gender: single.gender,
      preferences: single.preferences
    })
    .then(
      function(result) {
        console.log('Single created', single, 'Result', result);
        return sendSMS({
          to: single.phone,
          body: 'Welcome to NYE Singles ' + single.name + ', please respond with YES if you meant to sign up'
        });
      },
      function(err) {
        console.error('Error creating single', err);
      }
    )
    .then(
      function(smsResponse) {
        console.log('Verification SMS sent', smsResponse);
      }, function(err) {
        console.log('Verification SMS failed', err);
      }
    );

    res.redirect('/?success=true');
  });
}
