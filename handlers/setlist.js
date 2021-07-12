const HandlerInterface = require('../lib/HandlerInterface');
let db;

class Setlist extends HandlerInterface{
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
        return await this.model.findOne({
            where:{
                id: id
            }, include: [
                {
                    model: this.models.Song,
                    required: false
                },
            ]
        });
    }

    async get (request, response){
        response.statusCode = 404;

        const id = this.getId(request);
        if(id){
            const setlist = await this.getById(id);

            if(setlist){
                response.statusCode = 200;
                response.body.setlist = setlist;
            }
            return;
        }
        
        const setlists = await this.model.findAll({
            include: [
                {
                    model: this.models.Song,
                    required: false
                },
            ]
        });
        if(setlists){
            response.statusCode = 200;
            response.body.setlists = setlists;
        }
        return;
    }

    async patch(request, response){
        response.statusCode = 405;
    }

    async delete(request, response){
        const id = this.getId(request);
        try{
            const setlist = await this.getById(id);
            await setlist.destroy();
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
            let setlist = await this.model.create(data);
            await setlist.save();
            response.body = setlist;
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
            const setlist = await this.getById(id);
            if(setlist){
                await setlist.update(data);
                response.statusCode = 200;
                response.body.setlist = setlist;
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
        const songModel = this.models.Song;
        if(this.getModel()){
            this.getModel().belongsToMany(songModel, { 
                through: this.models.SetlistSong, 
                foreignKey: 'setlistId',
            });

            songModel.belongsToMany(this.getModel(), {
                through: this.models.SetlistSong,
                foreignKey: 'songId',
                as: {
                    singular: 'song',
                    plural: 'songs'
                }
            });
        }else{
            throw Error(`Could not find model ${this.getModelName()}`);
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

module.exports = Setlist;