'use strict';

const db = require('../../core/mongoConnection');
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    async insert(collection, data){

        const conexao = await db.connect();
        const database = conexao.db(process.env.DATABASE);
        
        var colecao = database.collection(collection);

        colecao.insertOne(data);
        conexao.close();        
    }
}