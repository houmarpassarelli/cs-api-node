'use strict';

const SegmentoModel = require('../models/SegmentoModel');

module.exports = {
    async getAll(){

    },
    async create(req){

        return await req.body;

        // return await SegmentoModel.create();
    }
};