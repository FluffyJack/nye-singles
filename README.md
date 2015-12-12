# NYE Singles

## Setup

You'll need postgres and a database.

```
npm install
cp config/env-template.json config/env.json
psql -d postgres
CREATE DATABASE nyesingles;
\q
psql -d nyesingles -f db/setup.sql
node bin/index.js
```

Then edit anything in `config/env.json` that doesn't match you local setup.

## Deployment

Just do the heroku thing run the SQL setup file.

```
heroku pg:psql < db/setup.sql
```
