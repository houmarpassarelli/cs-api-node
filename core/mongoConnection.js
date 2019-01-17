'use strict';

const MongoClient = require('mongodb').MongoClient;
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    connect(){
        return new Promise((resolve, reject) => {
            MongoClient.connect(process.env.DATABASE_URL_MONGO, { useNewUrlParser: true })
                .then(response => resolve(response))
                .catch(error => reject(error))
        });
    }
}