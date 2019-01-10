'use strict';

var CupomModel = require('../models/CupomModel');

module.exports = {
   getAll(req, res){
      CupomModel.findAll().then((response) => {
         res.send(response);
      })
   },
   create(req, res){
      CupomModel.create().then((response) => {
         res.send(response);
      });
   },
   update(req, res){
      CupomModel.update();
   }
}