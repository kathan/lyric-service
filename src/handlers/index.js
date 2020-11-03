class Default{
    async get(request, response){
        response.statusCode = 200
        response.body = JSON.stringify(
            {
                input: request,
            },
            null,
            2
        )
    }
    async patch(request, response){
        throw "error"
    }
}

module.exports = Default