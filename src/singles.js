module.exports.create = function createSingle(client, single) {
  client.query('INSERT INTO singles (name, phone, gender, preferences) VALUES ($1, $2, $3, $4)', [
    single.name,
    single.phone,
    single.gender,
    single.preferences
  ], function(err, result) {
    if (err) {
      console.error('Error creating single', err);
    }
    console.log('Single created', single, 'Result', result);
  });
}
