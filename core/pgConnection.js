'use strict';

const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  connectionString : process.env.DATABASE_URL_PG
});

module.exports = {
  query(string, params = null){
    return new Promise((resolve, reject) => {
      pool.query(string, params)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        })
    });
  }
}