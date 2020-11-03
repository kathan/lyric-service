class Echo {
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

    async patch(){
        throw "error"
    }
}

module.exports = Echo