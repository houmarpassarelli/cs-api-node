'use strict';

const db = require('../../core/pgConnection');

module.exports = {
    async delete(table, data, response){

        var count = 1;
        var query = null;
        var values = [];
        var condicoes = [JSON.parse(JSON.stringify(data.condicoes))];
        var conditions = '';

        condicoes.forEach((a) => {
            for(var key in a){
                conditions += `${a[key].condicao} ${a[key].campo} ${a[key].comparador} $${(count++)} `;                            
                values.push(a[key].valor);
            }
        });

        conditions = conditions.trim();

        query = `DELETE FROM ${table} WHERE ${conditions}`;

        try{
            var {rows, rowCount} = await db.query(query, values);
            response.status(200).send({rows, rowCount});
        }
        catch(error){
            response.status(400).send(error);
        }
    }
}