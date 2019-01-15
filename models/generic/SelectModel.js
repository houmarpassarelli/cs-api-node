'use strict';

const db = require('../../core/pgConnection');

module.exports = {
    async select(manual = null, table = null, data = null, response){

        var query = null;
        var values = [];
        
        if(manual){
            query = manual;
            values = null;
        }
        else{
            if(data){

                var fields = '';
                
                if(data.campos){

                    var campos = data.campos;

                    for(var key in campos){
                        fields += campos[key] + ", ";
                    }

                    fields = fields.substr(0, fields.length -2);
                }
                else{
                    fields = "*";
                }

                if(data.condicoes){

                    var count = 1;

                    var condicoes = [JSON.parse(JSON.stringify(data.condicoes))];
                    var conditions = '';

                    condicoes.forEach((a) => {
                        for(var key in a){
                            conditions += `${a[key].condicao} ${a[key].campo} ${a[key].comparador} $${(count++)} `;                            
                            values.push(a[key].valor);
                        }
                    });

                    conditions = conditions.trim();

                    query = `SELECT ${fields} FROM ${table} WHERE ${conditions}`;                    
                    console.log(query);
                }else{
                    query = `SELECT ${fields} FROM ${table}`;
                    values = null;
                }
            }
            else{
                query = `SELECT * FROM ${table}`;
                values = null;
            }
        }

        try{
            if(data.condicoes){
                var {rows, rowCount} = await db.query(query, values);
                response.status(200).send({rows, rowCount});
            }
            else{
                var {rows, rowCount} = await db.query(query, values);
                response.status(200).send({rows, rowCount});
            }
        }
        catch(error){
            response.status(400).send(error);
        }
    }
}