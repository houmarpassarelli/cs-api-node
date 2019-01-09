'use strict';

var db = require('../core/pgConnection');

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
      
   },
   async update(){

   },
   async delete(){

   }
}