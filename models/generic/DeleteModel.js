'use strict';

const db = require('../../core/pgConnection');

module.exports = {
    async delete(table, data){

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
            const {rows, rowCount} = await db.query(query, values);
            return {status : 200, rows, rowCount};
        }
        catch(error){
            return {status: 400, error}
        }
    }
}