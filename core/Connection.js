//'postgresql://postgres:postgres@localhost:5432/cupomstore'

'use strict';

var pg = require('pg');
var conString = "postgres:postgres@localhost:5432/cupomstore";

pg.connect(conString, function(err, client, done) {

  if (err) {
    return console.error('error fetching client from pool', err);
  }
  client.query('SELECT $1::int AS number', ['1'], function(err, result) {
    done();
    if (err) {
      return console.error('error running query', err);
    }
    console.log(result.rows[0].number);
  });

});