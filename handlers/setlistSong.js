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
                song_id: pathAry[2],
                setlist_id: pathAry[3]
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
            const song = await this.getByIds(ids);

            if(song){
                response.statusCode = 200;
                response.body.song = song;
            }
            return;
        }
        
        const songs = await this.model.findAll();
        if(songs){
            response.statusCode = 200;
            response.body.songs = songs;
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

        const data = JSON.parse(request.body);

        try{
            let song = await this.model.create(data);
            await song.save();
            response.body = song;
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
            const song = await this.getById(id);
            if(song){
                await song.update(data);
                response.statusCode = 200;
                response.body.song = song;
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
        try{
            await db.close();
        }catch(e){
            console.log(`Error: in song.after db.close: ${e}`);
        }
    }
}

module.exports = SetlistSong;