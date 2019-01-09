'use strict';

module.exports = (api) => {
   
   var cupom = require('../controllers/CupomController');

   api.route('/cupom')
      .get(cupom.getAll);
   api.route('/cupom2')
      .get(cupom.teste2);
}

// module.exports = (app) => {

// var cupom = require('../controllers/CupomController');
// // messages Routes
// app.route('/cupom')
//    .get(messages.list_all_messages)
//    .post(messages.create_a_message);
// app.route('/cupom/:cupomId')
//    .get(messages.read_a_message)
//    .put(messages.update_a_message)
//    .delete(messages.delete_a_message);
// };