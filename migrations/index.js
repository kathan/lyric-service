const db = require('../lib/dbConnection');
const loadModels = require('../lib/loadModels');

const runMigrations = async function(){
    try{
        await db.createSchema('lyrics');
        db.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
        loadModels(db);
        await db.sync({alter: true});
        console.error("Migrations complete");
    }catch(err){
        const msg = `Error in migration: ${err}`;
        console.error(msg);
    }
}

runMigrations();