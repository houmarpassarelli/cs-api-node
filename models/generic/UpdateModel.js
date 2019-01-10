'use strict';

module.exports = {
    async update(manual = null, table = null, data = null, condition = null){
        
        var query = null;
        var values = [];
        
        if(manual){
            query = manual;
        }
        else{

            var count = 1;
            var fields = '';
            var dados = [JSON.parse(JSON.stringify(data.dados))];
            var condicoes = [JSON.parse(JSON.stringify(data.condicoes))];
            // var condicoes = [JSON.parse()];

            // console.log();

            // return;

            dados.forEach((a) => {
                for(var key in a){
                    fields += key + " = $" + (count++) + ", ";
                    values.push(a[key]);
                }
            });

            condicoes.forEach((a) => {
                for(var key in a){
                    console.log(a[key].condicao);
                }
            });

            // data.dados.forEach((a) => {
            //     console.log(a);
            // });

            // array.forEach((a) => {
            //     for(var key in a){
            //         fields += key + " = $" + (count++) + ", ";
            //         values.push(a[key]);
            //     }
            // });

            // console.log(fields);
            // console.log(values);
            // console.log(count);

            // query = "UPDATE " + table + " SET " + fields;

            // console.log(query);
        }
    }
}