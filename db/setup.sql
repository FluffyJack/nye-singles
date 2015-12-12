DROP TABLE singles;
CREATE TABLE singles
(
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  phone VARCHAR(255),
  gender VARCHAR(255),
  preferences VARCHAR(255),
  partnered BOOL DEFAULT FALSE
);
SELECT * FROM singles;
