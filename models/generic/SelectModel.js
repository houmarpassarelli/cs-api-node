'use strict';

const db = require('../../core/pgConnection');

module.exports = {
    /**
     * Função usando spread
     * deve-se passar os parametros
     * conforme descrito
     * 
     * @param {boolean|null} manual 
     * @param {string} table 
     * @param {object} data 
     */
    async select(...params){

        var params = params[0];
        var query = null;
        var values = [];
        
        if(params.manual){
            query = params.manual;
            values = null;
        }
        else{
            if(params.data){

                var fields = '';
                
                if(params.data.campos){

                    var campos = params.data.campos;

                    for(var key in campos){
                        fields += campos[key] + ", ";
                    }

                    fields = fields.substr(0, fields.length -2);
                }
                else{
                    fields = "*";
                }

                if(params.data.condicoes){

                    var count = 1;

                    var condicoes = [JSON.parse(JSON.stringify(params.data.condicoes))];
                    var conditions = '';

                    condicoes.forEach((a) => {
                        for(var key in a){
                            conditions += `${a[key].condicao} ${a[key].campo} ${a[key].comparador} $${(count++)} `;                            
                            values.push(a[key].valor);
                        }
                    });

                    conditions = conditions.trim();

                    query = `SELECT ${fields} FROM ${params.table} WHERE ${conditions}`;                    

                }else{
                    query = `SELECT ${fields} FROM ${params.table}`;
                    values = null;
                }
            }
            else{
                query = `SELECT * FROM ${params.table}`;
                values = null;
            }
        }

        try{
            if(params.data.condicoes){

                const {rows, rowCount} = await db.query(query, values);
                return {status : 200, rows, rowCount};
            }
            else{
                const {rows, rowCount} = await db.query(query, values);
                return {status : 200, rows, rowCount};
            }
        }
        catch(error){
            return {status : 400, error}
        }
    }
}