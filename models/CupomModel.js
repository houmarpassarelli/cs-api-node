'use strict';

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
            {condicao : "", comparador : "=", campo : "codigo", valor : "b7ba379b-8907-48c9-8127-fddf9661c95f"},
            {condicao : "AND", comparador : "=", campo : "id_cupom", valor : "10"}
         ],
         limites : []
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
            {"condicao" : "", "comparador" : "=", "campo" : "codigo", "valor" : "1fe251f5-a8a5-42a4-bd3c-8ef716e26e33"},
            {"condicao" : "AND", "comparador" : "=", "campo" : "id_cupom", "valor" : "9"}
         ]
      };

      return await update.update({table, data});
   },
   async delete(req){
      var dados = {
         condicoes : [
            {"condicao" : "", "comparador" : "=", "campo" : "codigo", "valor" : "1fe251f5-a8a5-42a4-bd3c-8ef716e26e33"}
         ]
      }

      return await deletar.delete('cupom', dados);
   }
}