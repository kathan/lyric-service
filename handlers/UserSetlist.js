const HandlerInterface = require('../lib/HandlerInterface');
let db;

class UserSetlist extends HandlerInterface{
    constructor(){
        super();
    }

    getIds(request){
        const pathAry = (request.path ? request.path.split('/') : []).filter(Boolean);
        if(pathAry.length === 4){
            return {
                setlistId: pathAry[2],
                userId: pathAry[3],
            }
        }
    }

    async getByIds(ids){
        return await this.model.find({where: ids});
    }

    async get (request, response){
        response.statusCode = 404;
        const ids = this.getIds(request);

        if(ids){
            const userSetlist = await this.getByIds(ids);

            if(userSetlist){
                response.statusCode = 200;
                response.body.userSetlist = userSetlist;
            }
            return;
        }
        
        const userSetlists = await this.model.findAll();
        if(userSetlists){
            response.statusCode = 200;
            response.body.userSetlists = userSetlists;
        }
        return;
    }

    async patch(request, response){
        response.statusCode = 405;
    }

    async post(request, response){
        if(!request.body){
            response.statusCode = 400;
            return;
        }
        let data;
        try{
            data = JSON.parse(request.body);
        }catch(error){
            console.log(error);
            response.statusCode = 500;
        }

        try{
            const userSetlist = await this.model.create(data);
            await userSetlist.save();
            response.body = userSetlist;
            response.statusCode = 201;
        }catch(error){
            console.log(error);
            response.statusCode = 400;
        }
    }

    async put(request, response){
        const data = JSON.parse(request.body);
        const id = this.getId(request);
        if(id){
            const userSetlist = await this.getById(id);
            if(userSetlist){
                await userSetlist.update(data);
                response.statusCode = 200;
                response.body.userSetlist = userSetlist;
            }else{
                response.statusCode = 404;
            }
            return;
        }
        response.statusCode = 400;
    }

    async before(request, response, options){
        db = require('../lib/dbConnection');
        if(db.models[this.constructor.name]){
            this.model = db.models[this.constructor.name];
        }else{
            throw Error(`Could not find model ${this.constructor.name}`);
        }
    }

    async after(request, response, options){
        
    }
}

module.exports = UserSetlist;