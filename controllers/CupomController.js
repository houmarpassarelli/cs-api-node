'use strict';

const CupomModel = require('../models/CupomModel');
const QRCode = require('qrcode');

module.exports = {
   getAll(req, res){
      CupomModel.findAll(req, res);
   },
   create(req, res){
      CupomModel.create(req, res);
   },
   update(req, res){
      CupomModel.update().then((response) => {
         res.send(response);
      });
   },
   delete(req, res){
      CupomModel.delete(req, res);
   },
   qrCode(){
      QRCode.toDataURL('I am a pony!', function (err, url) {
         console.log(url)
      })
   }
}