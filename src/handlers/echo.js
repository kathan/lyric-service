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
    patch: async () => {
        throw "error"
    }
}