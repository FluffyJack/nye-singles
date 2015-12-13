var twilio = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_KEY);

module.exports.send = function sendSMS(options) {
  return new Promise(function(resolve, reject) {

    if (!options.to) { reject('No phone number'); }
    if (!options.body) { reject('No message body'); }

    twilio.sendMessage({

      to: options.to,
      from: process.env.TWILIO_PHONE_NUMBER,
      body: options.body

    }, function(err, response) {

      if (err) { reject(err); }

      resolve(response);

    });

  });
}
