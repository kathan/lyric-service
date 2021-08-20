const HandlerInterface = require('../lib/HandlerInterface');
let db;

class SetlistSong extends HandlerInterface{
    constructor(){
        super();
    }

    getIds(request){
        const pathAry = (request.path ? request.path.split('/') : []).filter(Boolean);
        if(pathAry.length === 4){
            return {
                setlistId: pathAry[2],
                songId: pathAry[3],
            }
        }
    }

    async getByIds(ids){
        return await this.getModel().findOne({where: ids});
    }

    async getNextOrder(setlistId){
        await this.getModel().max('songOrder',
        {
            where: {
                setlistId
            }
        });
    }

    async get (request, response){
        response.statusCode = 404;
        const ids = this.getIds(request);

        if(ids){
            const setlistSong = await this.getByIds(ids);

            if(setlistSong){
                response.statusCode = 200;
                response.body.setlistSongs = setlistSong;
            }
            return;
        }
        
        const songs = await this.getModel().findAll();
        if(songs){
            response.statusCode = 200;
            response.body.setlistSongs = songs;
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

        if(data){
            try{
                const setlistSong = await this.getModel().create(data);
                await setlistSong.save();
                response.body = setlistSong;
                response.statusCode = 201;
            }catch(error){
                console.log(error);
                response.statusCode = 400;
            }
        }else{
            console.log(error);
            response.statusCode = 400;
        }
    }

    async put(request, response){
        const data = JSON.parse(request.body);
        const ids = this.getIds(request);

        if(ids){
            const setlistSong = await this.getByIds(ids);
            if(setlistSong){
                await setlistSong.update(data);
                response.statusCode = 200;
                response.body.setlistSong = setlistSong;
            }else{
                response.statusCode = 404;
            }
            return;
        }
        response.statusCode = 400;
    }

    async delete(request, response){
        const ids = this.getIds(request);
        try{
            const setlistSong = await this.getByIds(ids);
            if(setlistSong){
                await setlistSong.destroy();
                response.statusCode = 200;
                return;
            }
            console.log(`${ids} not found in ${this.getModelName()}`);
            response.statusCode = 404;
        }catch(error){
            console.log(error);
            response.statusCode = 500;
        }
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

    getModel(){
        if(!this.model){
            this.model = this.models[this.getModelName()];
        }
        return this.model;
    }

    getModelName(){
        return this.constructor.name;
    }
}

module.exports = SetlistSong;