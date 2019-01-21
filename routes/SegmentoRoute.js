'use strict';

module.exports = (api) => {

    const segmento = require('../controllers/SegmentoController');

    api.route('/segmento/')
        .post((req, res) => segmento.create(req).then(response => res.send(response)))
        .get((req, res) => segmento.getAll().then(response => res.send(response)));
    
    api.route('/segmento/:id')
        .get((req, res) => segmento.get(req.params.id).then(response => res.send(response)));

};