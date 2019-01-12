'use strict';

module.exports = (api) => {
   
   var cupom = require('../controllers/CupomController');

   api.route('/cupom/*')
      .get((req, res) => {
         cupom.getAll(req, res);
      });
   api.route('/cupom2')
      .get((req, res) => {
         cupom.create(req, res);
      });
   api.route('/cupom3')
      .get(cupom.update);
   api.route('/cupom4')
      .get((req, res) => {
         cupom.delete(req, res);
      });
   api.route('/cupom5')
      .get(cupom.qrCode);
}