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
                
                if(params.data.campos && params.data.campos.length > 0){

                    var campos = [JSON.parse(JSON.stringify(params.data.campos))];

                    campos.forEach((a) => {
                        for(var key in a){
                            if(a[key].alias && a[key].alias != ''){
                                fields += `${a[key].campo} AS ${a[key].alias}, `; 
                            }else{
                                fields += `${a[key].campo}, `;
                            }
                        }
                    });

                    fields = fields.substr(0, fields.length -2);
                }
                else{
                    fields = "*";
                }

                if(params.data.condicoes && params.data.condicoes.length > 0){

                    var count = 1;

                    var condicoes = [JSON.parse(JSON.stringify(params.data.condicoes))];
                    var conditions = '';

                    condicoes.forEach((a) => {
                        for(var key in a){

                            if((a[key].operador == 'LIKE' || a[key].operador == 'like') ||
                                (a[key].operador == 'ILIKE' || a[key].operador == 'ilike') ||
                                (a[key].operador == 'NOT LIKE' || a[key].operador == 'not like') ||
                                (a[key].operador == 'NOT ILIKE' || a[key].operador == 'not ilike') ||
                                (a[key].operador == 'IN' || a[key].operador == 'in') ||
                                (a[key].operador == 'NOT IN' || a[key].operador == 'not in'))
                            {
                                conditions += `${a[key].campo} ${a[key].operador} $${(count++)} `;
                            }
                            else{
                                conditions += `${a[key].operador} ${a[key].campo} ${a[key].comparador} $${(count++)} `;
                            }

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

            if(params.data && params.data.ordenacao && params.data.ordenacao.length > 0){

                var ordenacao = [JSON.parse(JSON.stringify(params.data.ordenacao))];
                var order = '';

                ordenacao.forEach((a) => {
                    for(var key in a){
                        order += ` ${a[key].termo} ${a[key].valor} `;
                    }
                });

                query += order
            }

            if(params.data && params.data.limites && params.data.limites.length > 0){

                var limites = [JSON.parse(JSON.stringify(params.data.limites))];
                var limits = '';

                limites.forEach((a) => {
                    for(var key in a){
                        limits += `${a[key].termo} ${a[key].valor} `
                    }
                });

                query += limits
            }
        }
       
        try{
            var {rows, rowCount } = await db.query(query, values);

            if(params.data && params.data.excluir && params.data.excluir.length > 0){

                var excluded = excludeField(rows, params.data.excluir);

                return {status : 200, excluded, rowCount};
            }else{
                return {status : 200, rows, rowCount};
            }

        }
        catch(error){
            return {status : 400, error}
        }
    }
}

function excludeField(data, fields){

    var resultado = [];

    for(var key in data){
        
        for(var item in fields){            
            delete data[key][fields[item]];
        }

        resultado.push(data[key]);
    }

    return resultado;
}