module.exports.create = function createSingle(client, single) {

  return new Promise(function(resolve, reject) {

    client.query('INSERT INTO singles (name, phone, gender, preferences) VALUES ($1, $2, $3, $4)', [

      single.name,
      single.phone,
      single.gender,
      JSON.stringify(single.preferences)

    ], function(err, result) {

      if (err) { reject(err); }

      resolve(result);

    });

  });

}

module.exports.all = function allSingles(client) {

  return new Promise(function(resolve, reject) {

    client.query('SELECT * FROM singles', function(err, result) {
      if (err) { reject(err); }
      resolve(result.rows.map(rowToSingle));
    });

  });

}

function rowToSingle(row) {
  return {
    id: row.id,
    name: row.name,
    phone: row.phone,
    gender: row.gender,
    preferences: JSON.parse(row.preferences),
    partnered: row.partnered,
    verified: row.verified
  }
}
