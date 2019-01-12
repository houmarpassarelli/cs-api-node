'use strict';

const db = require('../../core/pgConnection');

module.exports = {

    async insert(table, data, response){

        var count = 1;
        var fields = '';
        var bind = '';
        var values = [];

        var dados = [JSON.parse(JSON.stringify(data))];

        dados.forEach((a) => {
            for(var key in a){
                fields += key + ", ";
                bind += "$" + (count++) + ", ";
                values.push(a[key]);
            }
        });

        fields = fields.substring(0, fields.length - 2);
        bind = bind.substring(0, bind.length - 2);

        var query = "INSERT INTO " + table + "(" + fields.trim() + ") VALUES(" + bind.trim() + ") returning *";
        
        try{
            var { rows, rowCount } = await db.query(query, values);
            response.status(200).send({rows, rowCount});
        }
        catch(error){
            response.status(400).send(error)
        }
    }
}