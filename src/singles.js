module.exports.create = function createSingle(client, single) {
  client.query('INSERT INTO singles (name, phone, gender, preferences) VALUES ($1, $2, $3, $4)', [
    single.name,
    single.phone,
    single.gender,
    JSON.stringify(single.preferences)
  ], function(err, result) {
    if (err) {
      console.error('Error creating single', err);
    }
    console.log('Single created', single, 'Result', result);
  });
}

module.exports.all = function allSingles(client) {
  client.query('SELECT * FROM singles', function(err, result) {
    if (err) {
      console.error('Error getting all singles', err);
    }
    console.log('Singles queried', result.rows.map(rowToSingle));
  });
}

function rowToSingle(row) {
  return {
    id: row.id,
    name: row.name,
    phone: row.phone,
    gender: row.gender,
    preferences: JSON.parse(row.preferences),
    partnered: row.partnered
  }
}
