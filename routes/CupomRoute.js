'use strict';

module.exports = (api) => {
   
   var cupom = require('../controllers/CupomController');

   api.route('/cupom/*')
      .get((req, res) => cupom.getAll(req).then(response => res.send(response)));
   api.route('/cupom2')
      .get((req, res) => cupom.create(req).then(response => res.send(response)));
   api.route('/cupom3')
      .get((req, res) => cupom.update(req).then(response => res.send(response)));
   api.route('/cupom4')
      .get((req, res) => cupom.delete(req).then(response => res.send(response)));
   api.route('/cupom5')
      .get(cupom.qrCode);
}