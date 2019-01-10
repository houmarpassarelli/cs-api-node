'use strict';

var db = require('../../core/pgConnection');

module.exports = {

    async insert(table, data){

        var count = 1;
        var keys = '';
        var bind = '';
        var values = [];

        var array = [JSON.parse(data)];

        array.forEach((a) => {
            for(var key in a){
                keys += key + ", ";
                bind += "$" + (count++) + ", ";
                values.push(a[key]);
            }
        });

        keys = keys.substring(0, keys.length - 2);
        bind = bind.substring(0, bind.length - 2);

        var query = "INSERT INTO " + table + "(" + keys.trim() + ") VALUES(" + bind.trim() + ") returning *";
        
        try{
            var { rows } = await db.query(query, values);
            return rows;
        }
        catch(error){
            return error;
        }
    }
}