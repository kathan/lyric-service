const { Sequelize } = require('sequelize');

const user = process.env.DB_USER || 'postgres'
const password = process.env.DB_PASSWORD || 'postgres'
const host = process.env.DB_HOST || 'localhost'
const port = process.env.DB_PORT || 5432
const dbname = process.env.DB_NAME || 'lyrics'
const db_url = `postgres://${encodeURI(user)}:${encodeURI(password)}@${host}:${port}/${dbname}`
const config = {
    pool: {
        min: 0,
        max: 1,
        idle: 1000,
    }
}
const sequelize = new Sequelize(db_url, config)

module.exports = sequelize