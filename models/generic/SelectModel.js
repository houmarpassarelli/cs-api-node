'use strict';

module.exports = {
    async select(manual = null, table = null, data = null){

        var query = null;
        var values = [];

        if(manual){
            query = manual;
            values = null;
        }
        else{
            if(data){

            }
            else{
                query = "SELECT * FROM " + table;
                values = null;
            }
        }

        try{

        }
        catch(error){
            return error;
        }
    }
}