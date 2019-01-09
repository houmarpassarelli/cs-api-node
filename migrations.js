//CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL_PG
});

pool.on('connect', () => {
    console.log('Banco de dados Conectado');
});

const createTables = () => {

    const queryGen = `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    CREATE OR REPLACE FUNCTION trigger_set_timestamp()
        RETURNS TRIGGER AS $$
    BEGIN
        NEW.updated_at = NOW();
        RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
    CREATE TABLE IF NOT EXISTS cupom(
        id_cupom SERIAL primary key,
        id_estabelecimento integer null,
        id_segmento integer null,
        id_pacote integer null,
        codigo UUID not null default uuid_generate_v4(),
        titulo varchar(400) null,
        descricao text null,
        regulamento text null,
        dias_uso integer null,
        min_pessoas integer null,
        max_pessoas integer null,
        validade timestamptz null,
        created_at timestamp not null default now(),
        updated_at timestamp 
    );
    CREATE TRIGGER set_timestamp
        BEFORE UPDATE ON cupom
        FOR EACH ROW
    EXECUTE PROCEDURE trigger_set_timestamp();
    CREATE TABLE IF NOT EXISTS usuario(
        id_usuario SERIAL primary key,
        codigo text null,
        nome varchar(300) null,
        sobrenome varchar(300) null,
        tipo char(1) null,
        email varchar(400) null,
        visivel char(1) default 'S',
        created_at timestamp not null default now(),
        updated_at timestamp
    );
    CREATE TRIGGER set_timestamp
        BEFORE UPDATE ON usuario
        FOR EACH ROW
    EXECUTE PROCEDURE trigger_set_timestamp();
    CREATE TABLE IF NOT EXISTS tag(
        id_tag SERIAL primary key,
        titulo varchar(300) null,
        created_at timestamp not null default now(),
        updated_at timestamp
    );
    CREATE TRIGGER set_timestamp
        BEFORE UPDATE ON tag
        FOR EACH ROW
    EXECUTE PROCEDURE trigger_set_timestamp();`;
        
        
        pool.query(queryGen).then((res) => {
            console.log(res);
            pool.end();    
        }).catch((error) => {
            console.log(error);
            pool.end();
        });
}

// pool.on('remove', () => {
//     console.log('client removed');
//     process.exit(0);
// });

module.exports = {
    createTables
};

require('make-runnable');