'use strict';

const SegmentoModel = require('../models/SegmentoModel');

module.exports = {
    async get(id){

        let data = {
            condicoes : [
                {operador : "", campo : "id_segmento", comparador : "=", valor : parseInt(id)}
            ]
        }          

        return await SegmentoModel.get(data);
    },
    async getAll(){
        return await SegmentoModel.get();
    },    
    async create(req){

        let dados = {
            titulo : req.body.titulo    
        };

        return await SegmentoModel.create(dados);
    },
    async update(req)
    {
        let dados = {
            
        };

        return await SegmentoModel.update(dados);
    }
};