'use strict';

var db = require('../core/pgConnection');
var insert = require('../models/generic/InsertModel');
var update = require('../models/generic/UpdateModel');

module.exports = {
   async findById(){
      
   },
   async findAll(){
      
   },
   async create(){

      var dados = {
         "titulo":"Cupom Titulo", 
         "id_estabelecimento":"1", 
         "id_pacote":"1"
      }

      return insert.insert('cupom', dados);
   },
   async update(){

      var dados = {
         'dados' : {
            "titulo":"Cupom Titulo alterado", 
            "id_estabelecimento":"2", 
            "id_pacote":"3"
         },
         'condicoes' : [
            {"condicao" : "", "comparador" : "=", "campo" : "codigo", "valor" : "6f46406f-e625-4c67-9a4b-86d9127c07fc"},
            {"condicao" : "AND", "comparador" : "=", "campo" : "id_cupom", "valor" : "4"}
         ]
      };

      return update.update(false, 'cupom', dados);
   },
   async delete(){

   }
}