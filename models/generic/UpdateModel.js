'use strict';

const db = require('../../core/pgConnection');

module.exports = {
    /**
     * Função usando spread
     * deve-se passar os parametros
     * conforme descrito
     * 
     * @param {null|boolean} manual 
     * @param {string} table 
     * @param {object} data 
     */
    async update(...params){
        
        var params = params[0];
        var query = null;
        var values = [];
        
        if(params.manual){
            query = params.manual;
            values = null;
        }
        else{

            var count = 1;
            var fields = '';
            var dados = [JSON.parse(JSON.stringify(params.data.dados))];
            var condicoes = [JSON.parse(JSON.stringify(params.data.condicoes))];
            var conditions = '';
            var conditions_values = [];

            dados.forEach((a) => {
                for(var key in a){
                    fields += `${key} = $${(count++)}, `;
                    values.push(a[key]);
                }
            });

            condicoes.forEach((a) => {
                for(var key in a){
                    conditions += `${a[key].condicao} ${a[key].campo} ${a[key].comparador} $${(count++)} `;
                    conditions_values.push(a[key].valor);
                }
            });

            fields = fields.substring(0, fields.length - 2);
            conditions = conditions.trim();

            values = values.concat(conditions_values);

            query = `UPDATE ${params.table} SET ${fields} WHERE ${conditions} returning *`;
        }

        try{
            const {rows, rowCount} = await db.query(query, values);
            return {status : 200, rows, rowCount};
        }
        catch(error){
            return { status : 400, error};
        }
    }
}