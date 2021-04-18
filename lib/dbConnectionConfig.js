module.exports = {
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    host: process.env.DB_HOST || 'lyric-service_postgres_db_1',
    port: process.env.DB_PORT || 5432,
    dbname: process.env.DB_NAME || 'postgres'
};

/*TODO
create schema
install uuid_generate_v1*/