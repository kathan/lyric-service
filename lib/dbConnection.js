const { Sequelize } = require('sequelize');
const cfg = require('./dbConnectionConfig');

const db_url = `postgres://${encodeURI(cfg.user)}:${encodeURI(cfg.password)}@${cfg.host}:${cfg.port}/${cfg.dbname}`;
const config = {
    pool: {
        min: 0,
        max: 1,
        idle: 1000,
    }
};

const sequelize = new Sequelize(db_url, config);
module.exports = sequelize;