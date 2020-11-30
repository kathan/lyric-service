module.exports = {
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    host: process.env.DB_HOST || 'lyricservice_postgres_db_1',
    port: process.env.DB_PORT || 5432,
    dbname: process.env.DB_NAME || 'postgres'
};