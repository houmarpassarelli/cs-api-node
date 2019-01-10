'use strict';

var db = require('../core/pgConnection');
var insert = require('../models/generic/InsertModel');

module.exports = {
   async findById(){
      
   },
   async findAll(){
      try{
         var {rows, rowCount} = await db.query('SELECT * FROM cupom');
         return {rows, rowCount};         
      }
      catch(error){
         return {status: 400, error : error};
      }
   },
   async create(){
      return insert.insert('cupom', '{"titulo":"Cupom Titulo", "id_estabelecimento":"1", "id_pacote":"1"}');
   },
   async update(){

   },
   async delete(){

   }
}