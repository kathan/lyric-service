const HandlerInterface = require("../lib/HandlerInterface");
const db = require('../lib/dbConnection');

class Migrate extends HandlerInterface{
    constructor(){
        super();
    }

    async post(request, response){
        try{
            await db.sync({alter: true});
            response.statusCode = 200;
        }catch(err){
            const msg = `Error in migrate handler: ${err}`;
            console.error(msg);
            console.trace();
            response.body = msg;
            response.statusCode = 500;
        }
    }
}

module.exports = Migrate; 