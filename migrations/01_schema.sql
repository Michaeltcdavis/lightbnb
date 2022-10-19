DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS properties CASCADE;
DROP TABLE IF EXISTS reservations CASCADE;
DROP TABLE IF EXISTS property_reviews CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(225) NOT NULL,
  email VARCHAR(225) NOT NULL,
  password VARCHAR(225) NOT NULL
);

CREATE TABLE properties (
  id SERIAL PRIMARY KEY NOT NULL,
  owner_id INT REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(225) NOT NULL,
  description TEXT,
  thumbnail_photo_url VARCHAR(225) NOT NULL,
  cover_photo_url VARCHAR(225) NOT NULL,
  cost_per_night INT NOT NULL DEFAULT 0,
  parking_spaces INT NOT NULL DEFAULT 0,
  number_of_bathrooms INT NOT NULL DEFAULT 0,
  number_of_bedrooms INT NOT NULL DEFAULT 0,
  country VARCHAR(225) NOT NULL,
  street VARCHAR(225) NOT NULL,
  city VARCHAR(225) NOT NULL,
  province VARCHAR(225) NOT NULL,
  post_code VARCHAR(225) NOT NULL,
  active BOOLEAN DEFAULT TRUE
);

CREATE TABLE reservations (
  id SERIAL PRIMARY KEY NOT NULL,
  property_id INT REFERENCES properties(id) ON DELETE CASCADE,
  guest_id INT REFERENCES users(id) ON DELETE CASCADE,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL
);

CREATE TABLE property_reviews (
  id SERIAL PRIMARY KEY NOT NULL,
  guest_id INT REFERENCES users(id) ON DELETE CASCADE,
  property_id INT REFERENCES properties(id) ON DELETE CASCADE,
  reservation_id INT REFERENCES reservations(id) ON DELETE CASCADE,
  rating SMALLINT NOT NULL DEFAULT 0,
  message TEXT
);

