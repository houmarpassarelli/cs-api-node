'use strict';

module.exports = (api) => {

    const segmento = require('../controllers/SegmentoController');

    api.route('/segmento/')
        .post((req, res) => segmento.create(req).then(response => res.send(response)));

};