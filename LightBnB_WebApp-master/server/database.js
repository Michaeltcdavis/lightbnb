const properties = require('./json/properties.json');
const users = require('./json/users.json');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  return pool
    .query(`
      SELECT * 
      FROM users 
      WHERE email = $1
      LIMIT 1;
    `, [email])
    .then((res) => {
      console.log(res.rows[0]);
      return res.rows[0];
    })
    .catch((e) => {
      console.log('user id error: ', e.message)
    })
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return pool
    .query(`
      SELECT *
      FROM users
      WHERE id = $1
      LIMIT 1;
    `, [id])
    .then((result) => {
      console.log(result.rows[0]);
      return result.rows[0];
    })
    .catch((e) => {
      console.log('user by id err: ', e.message);
    })
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  return pool
    .query(`
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING *;
  `, [user.name, user.email, user.password])
    .then((result) => {
      console.log(result.rows[0]);
      return result.rows[0];
  }).catch((e) => console.log('add user err: ',e.message))
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  return pool
    .query(`
    SELECT
      reservations.*, properties.*
    FROM reservations
    JOIN properties ON properties.id = reservations.property_id
    LEFT JOIN property_reviews ON property_reviews.property_id = properties.id
    WHERE reservations.guest_id = $1
    GROUP BY reservations.id, properties.id
    ORDER BY reservations.start_date
    LIMIT $2`, 
      [guest_id, limit])
    .then((result) => {
      console.log(result.rows);
      return result.rows;
    }).catch((e) => console.log('getresos error: ', e.message))
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = (options, limit = 10) => {
  const queryParams = [];
  let queryString = `
    SELECT properties.*, AVG(rating) AS average_rating
    FROM properties
    LEFT JOIN property_reviews ON properties.id=property_id
    `;
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `WHERE city LIKE $${queryParams.length}`;
  }
  if (options.owner_id) {
    if (queryParams.length > 0) {
      queryString += ` AND`
    } else {
      queryString += `WHERE`
    }
    queryParams.push(`${options.owner_id}`);
    queryString += ` owner_id = $${queryParams.length}`;
  }
  if (options.minimum_price_per_night) {
    if (queryParams.length > 0) {
      queryString += ` AND`
    } else {
      queryString += `WHERE`
    }
    queryParams.push(options.minimum_price_per_night * 100);
    queryString += ` cost_per_night >= $${queryParams.length}`;
  } 
  if (options.maximum_price_per_night) {
    if (queryParams.length > 0) {
      queryString += ` AND`
    } else {
      queryString += `WHERE`
    }
    queryParams.push(options.maximum_price_per_night * 100);
    queryString += ` cost_per_night <= $${queryParams.length}`;
  }
  queryParams.push(limit);
  queryString += `
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;
  console.log(queryString, queryParams);
  return pool
    .query(queryString, queryParams)
    .then((result) => {
      console.log(result.rows);
      return result.rows;
    })
    .catch((err) => {
      console.log('get properties err: ', err.message);
    });
};
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
}
exports.addProperty = addProperty;
