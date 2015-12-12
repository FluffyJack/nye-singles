var identities = require('gender-identities/identities').identities;

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
    });

    res.redirect('/?success=true');
  });
}
