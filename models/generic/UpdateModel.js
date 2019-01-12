'use strict';

const db = require('../../core/pgConnection');

module.exports = {
    async update(manual = null, table = null, data = null, response){
        
        var query = null;
        var values = [];
        
        if(manual){
            query = manual;
            values = null;
        }
        else{

            var count = 1;
            var fields = '';
            var dados = [JSON.parse(JSON.stringify(data.dados))];
            var condicoes = [JSON.parse(JSON.stringify(data.condicoes))];
            var conditions = '';
            var conditions_values = [];

            dados.forEach((a) => {
                for(var key in a){
                    fields += key + " = $" + (count++) + ", ";
                    values.push(a[key]);
                }
            });

            condicoes.forEach((a) => {
                for(var key in a){
                    conditions += a[key].condicao + " " + a[key].campo + " " + a[key].comparador + " $" + (count++) + " ";
                    conditions_values.push(a[key].valor);
                }
            });

            fields = fields.substring(0, fields.length - 2);
            conditions = conditions.trim();

            values = values.concat(conditions_values);

            query = "UPDATE " + table + " SET " + fields + " WHERE " + conditions + " returning *";
        }

        try{
            var {rows, rowCount} = await db.query(query, values);
            response.status(200).send({rows, rowCount});
        }
        catch(error){
            response.status(400).send(error);
        }
    }
}