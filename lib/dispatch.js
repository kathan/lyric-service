module.exports = async event => {
    const httpMethod = event.httpMethod
    const modelName = event.pathParameters.model
    try{
        const model = require('../models/'+modelName+'.js')
    }catch(e){
        return {
            statusCode: 404
        }
    }
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