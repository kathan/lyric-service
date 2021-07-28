const db = require('../lib/dbConnection');
const loadModels = require('../lib/loadModels');
const schema = 'lyrics';

const runMigrations = async function(){
    try{
        const schemas = await db.showAllSchemas();
        if(!schemas.includes(schema)){
            console.log(`Creating schema ${schema}`)
            await db.createSchema(schema);
        }
        db.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
        loadModels(db);
        await db.sync({alter: true});
        console.info("Migrations complete");
        console.trace();
    }catch(err){
        const msg = `Error in migration: ${err}`;
        console.error(msg);
        console.trace();
    }
}

runMigrations();