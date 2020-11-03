class Song{

    async get (request, response){
        response.statusCode = 404
        const pathAry = (request.path ? request.path.split('/') : []).filter(Boolean)

        if(pathAry.length === 3){
            const id = pathAry[2]
            const song = await this.model.findOne(id);

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

    async post(request, response, Song){
        if(!request.body){
            response.statusCode = 400
            return
        }
        try{
            let song = await Song.create(request.body)
            await song.save()
            song = await Song.findOne();
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
}

module.exports = Song