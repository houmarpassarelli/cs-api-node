'use strict';

var express = require('express');
var bodyParser = require('body-parser');

//Rotas
var Teste = require('./routes/Teste');
var Cupom = require('./routes/CupomRoute');
var Segmento = require('./routes/SegmentoRoute');

var api = express();

var allowCors = (req, res, next) => {

	res.header('Access-Control-Allow-Origin', 'localhost:8080');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DEvarE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', 'true');

	next();
}

// api.get('/', () => {});

api.use(allowCors);

api.use(bodyParser.json());

api.use(bodyParser.urlencoded({
    extended : true
}));

api.route('/').get((req, res) => { res.json({'hello': 'teste'})})

//Instancias das Rotas
Teste(api);
Cupom(api);
Segmento(api);

api.listen(8080, () => {
    console.log('Servidor iniciado!');
});
