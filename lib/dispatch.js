module.exports = async event => {
    const httpMethod = event.httpMethod
    const model = event.pathParameters.model
    switch(httpMethod){
        case 'GET':
            break
        case 'POST':
            break
        case 'PUT':
            break
        case 'DELETE':
            break
        default:
    }
}