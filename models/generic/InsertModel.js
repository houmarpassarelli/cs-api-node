'use strict';

var db = require('../../core/pgConnection');

module.exports = {

    async insert(table, data){

        var count = 1;
        var fields = '';
        var bind = '';
        var values = [];

        var array = [JSON.parse(data)];

        array.forEach((a) => {
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
            var { rows } = await db.query(query, values);
            return rows;
        }
        catch(error){
            return error;
        }
    }
}