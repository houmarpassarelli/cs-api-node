'use strict';

module.exports = (api) => {

    // var testedb = require('../core/mongoConnection');

    const testedb = require('../models/generic/InsertMongoModel');

    api.route('/log').get((req, res) => {

        var dados = {
            id : Math.random(),
            nome : 'Houmar',
            sobrenome : 'Passareli',
            email : 'houmarpassarelli@gmail.com',
            endereco : {
                logradouro : 'Rua Itapuã',
                numero : '101',
                complemento : 'Quadra 15, Bloco B02',
                bairro : 'Centro Sul',
                cidade : 'Várzea Grande',
                estado : 'MT'
            }
        }

        testedb.insert('cadastro', dados);
        res.end();
    });
}