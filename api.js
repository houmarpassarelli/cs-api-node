'use strict';

var express  = require('express');
var bodyParser = require('body-parser');

var api = module.exports = express();

var allowCors = (req, res, next) => {

	res.header('Access-Control-Allow-Origin', 'localhost:8080');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', 'true');

	next();
}

api.listen(8080, () => {
    console.log('Servidor iniciado!');
});

api.get('/', (req, res) => { res.json({hello : 'world'});})

api.use(allowCors);

api.use(bodyParser.json());

api.use(bodyParser.urlencoded({
    extended : true
}));

