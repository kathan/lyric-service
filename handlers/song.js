const HandlerInterface = require('../lib/HandlerInterface')
const db = require('../lib/dbConnection.js')

class Song extends HandlerInterface{
    constructor(){
        super()
    }
    
    async get (request, response){
        response.statusCode = 404
        const pathAry = (request.path ? request.path.split('/') : []).filter(Boolean)

        if(pathAry.length === 3){
            const id = pathAry[2]
            const song = await this.model.findByPk(id);

            if(song){
                response.statusCode = 200
                response.body.song = song
            }
            return
        }
        
        const songs = await this.model.findAll();
        if(songs){
            response.statusCode = 200
            response.body.songs = songs
        }
        return
    }

    async patch(request, response){
        response.statusCode = 405
    }

    async post(request, response){
        if(!request.body){
            response.statusCode = 400
            return
        }

        const data = JSON.parse(request.body)

        try{
            let song = await this.model.create(data)
            await song.save()
            response.body = song
            response.statusCode = 201
        }catch(error){
            console.log(error)
            response.statusCode = 500
        }
    }

    async put(request, response){
        response.statusCode = 405
    }

    async before(request, response, options){
        this.model = options.model ? options.model : db.models[this.constructor.name]
    }

    async after(request, response, options){
        try{
            db.close()
        }catch(e){
            console.log(`Error: in song.after db.close: ${e}`)
        }
    }
}

module.exports = Song