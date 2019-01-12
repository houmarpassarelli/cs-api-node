'use strict';

const db = require('../core/pgConnection');
const insert = require('../models/generic/InsertModel');
const update = require('../models/generic/UpdateModel');
const select = require('../models/generic/SelectModel');
const deletar = require('../models/generic/DeleteModel');

module.exports = {
   async findById(){
      
   },
   async findAll(req, res){
      
      var dados = {
         campos : ["titulo", "codigo", "id_cupom"],
         condicoes : [
            {"condicao" : "", "comparador" : "=", "campo" : "codigo", "valor" : "6f46406f-e625-4c67-9a4b-86d9127c07fc"},
            {"condicao" : "AND", "comparador" : "=", "campo" : "id_cupom", "valor" : "4"}
         ]
      }

      select.select(false, 'cupom', dados, res);
   },
   async create(req, res){

      var dados = {
         "titulo":"Cupom Titulo", 
         "id_estabelecimento":"1", 
         "id_pacote":"1"
      }

      insert.insert('cupom', dados, res);
   },
   async update(req, res){

      var dados = {
         dados : {
            "titulo":"Cupom Titulo alterado", 
            "id_estabelecimento":"2", 
            "id_pacote":"3"
         },
         condicoes : [
            {"condicao" : "", "comparador" : "=", "campo" : "codigo", "valor" : "6f46406f-e625-4c67-9a4b-86d9127c07fc"},
            {"condicao" : "AND", "comparador" : "=", "campo" : "id_cupom", "valor" : "4"}
         ]
      };

      update.update(false, 'cupom', dados, res);
   },
   async delete(req, res){
      var dados = {
         condicoes : [
            {"condicao" : "", "comparador" : "=", "campo" : "codigo", "valor" : "0fffa9a5-c51b-4c78-957f-76318375c5cc"}
         ]
      }

      deletar.delete('cupom', dados, res);
   }
}