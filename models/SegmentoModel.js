'use strict';

const insert = require('../models/generic/InsertModel');
const update = require('../models/generic/UpdateModel');
const select = require('../models/generic/SelectModel');
const deletar = require('../models/generic/DeleteModel');

module.exports = {
    async get(data){

        let params = {
            table : 'segmento',
            data : data
        }

        return await select.select(params);
    },
    async create(dados){
        return await insert.insert('segmento', dados);
    }
};