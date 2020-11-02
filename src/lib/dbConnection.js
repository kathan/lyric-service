const { Sequelize } = require('sequelize');
const init = require('./init.js')
const cfg = require('./dbConnectionConfig.js')

const db_url = `postgres://${encodeURI(cfg.user)}:${encodeURI(cfg.password)}@${cfg.host}:${cfg.port}/${cfg.dbname}`
const config = {
    pool: {
        min: 0,
        max: 1,
        idle: 1000,
    }
}
const sequelize = new Sequelize(db_url, config)
init(sequelize)
module.exports = sequelize