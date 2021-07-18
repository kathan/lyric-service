const HandlerInterface = require('../lib/HandlerInterface');
let db;

class User extends HandlerInterface{
    constructor(){
        super();
    }

    getId(request){
        const pathAry = (request.path ? request.path.split('/') : []).filter(Boolean);
        if(pathAry.length === 3){
            return pathAry[2];
        }
    }

    async getById(id){
        return await this.model.findByPk(id);
    }

    async get (request, response){
        response.statusCode = 404;
        const id = this.getId(request);

        if(id){
            const user = await this.getById(id);

            if(user){
                response.statusCode = 200;
                response.body.user = user;
            }
            return;
        }
        
        const users = await this.model.findAll();
        if(users){
            response.statusCode = 200;
            response.body.users = users;
        }
        return;
    }

    async patch(request, response){
        response.statusCode = 405;
    }

    async delete(request, response){
        const id = this.getId(request);
        try{
            const user = await this.getById(id);
            await user.destroy();
            response.statusCode = 200;
        }catch(error){
            console.log(error);
            response.statusCode = 500;
        }
    }

    async post(request, response){
        if(!request.body){
            response.statusCode = 400;
            return;
        }

        const data = JSON.parse(request.body);

        try{
            let user = await this.model.create(data);
            await user.save();
            response.body = user;
            response.statusCode = 201;
        }catch(error){
            console.log(error);
            response.statusCode = 500;
        }
    }

    async put(request, response){
        const data = JSON.parse(request.body);
        const id = this.getId(request);
        if(id){
            const user = await this.getById(id);
            if(user){
                await user.update(data);
                response.statusCode = 200;
                response.body.song = user;
            }else{
                response.statusCode = 404;
            }
            return;
        }
        response.statusCode = 400;
    }

    async before(request, response, options){
        db = require('../lib/dbConnection');
        this.models = db.models;
        if(db.models[this.constructor.name]){
            this.model = db.models[this.constructor.name];
        }else{
            throw Error(`Could not find model ${this.constructor.name}`);
        }
    }

    async after(request, response, options){
        
    }
}

module.exports = User;