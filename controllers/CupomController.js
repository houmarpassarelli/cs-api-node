'use strict';

const CupomModel = require('../models/CupomModel');
const QRCode = require('qrcode');

module.exports = {
   async getAll(req){
      return await CupomModel.findAll(req);
   },
   async create(req){
      return await CupomModel.create(req);
   },
   async update(req){
      return await CupomModel.update(req);
   },
   async delete(req){
      return await CupomModel.delete(req);
   },
   qrCode(){
      QRCode.toDataURL('I am a pony!', function (err, url) {
         console.log(url)
      })
   }
}