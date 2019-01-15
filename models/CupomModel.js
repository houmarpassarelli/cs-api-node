'use strict';

const db = require('../core/pgConnection');
const insert = require('../models/generic/InsertModel');
const update = require('../models/generic/UpdateModel');
const select = require('../models/generic/SelectModel');
const deletar = require('../models/generic/DeleteModel');

module.exports = {
   async findById(){
      
   },
   async findAll(req){
      
      let table = 'cupom';
      let data = {
         campos : ["titulo", "codigo", "id_cupom"],
         condicoes : [
            {"condicao" : "", "comparador" : "=", "campo" : "codigo", "valor" : "c443bb7b-766e-44c9-a2de-633009c5eb6a"},
            {"condicao" : "AND", "comparador" : "=", "campo" : "id_cupom", "valor" : "8"}
         ]
      }

      return await select.select({table, data});
   },
   async create(req){

      let dados = {
         "titulo":"Cupom Titulo", 
         "id_estabelecimento":"1", 
         "id_pacote":"1"
      }

      return await insert.insert('cupom', dados);
   },
   async update(req){

      let table = 'cupom';
      let data = {
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

      return await update.update({table, data});
   },
   async delete(req){
      var dados = {
         condicoes : [
            {"condicao" : "", "comparador" : "=", "campo" : "codigo", "valor" : "0fffa9a5-c51b-4c78-957f-76318375c5cc"}
         ]
      }

      return await deletar.delete('cupom', dados);
   }
}