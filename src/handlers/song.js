
module.exports = {
    get: async (request, response) => {
        response.statusCode = 200
        response.body = JSON.stringify(
            {
                input: request,
            },
            null,
            2
        )
    },
    patch: async (request, response) => {
        response.statusCode = 405
    },
    post: async (request, response, Song) =>{
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
    },
    put: async (request, response) =>{
        response.statusCode = 405
    }
}