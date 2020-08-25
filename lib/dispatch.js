module.exports = async event => {
    const httpMethod = event.httpMethod
    const modelName = event.pathParameters.model
    try{
        const model = getModel(modelName)
    }catch(e){
        return {
            statusCode: 404
        }
    }

    try{
        const method = getMethod(method, model)
        return method(event)
    }catch(e){
        return {
            statusCode: 404
        }
    }
}

function getModel(modelName){
    return require('../models/'+modelName+'.js')
}

function getMethod(method, model){
    switch(method){
        case 'GET':
            isValidMethod('GET', model)
            break
        case 'POST':
            isValidMethod('POST', model)
            break
        case 'PUT':
            isValidMethod('PUT', model)
            break
        case 'DELETE':
            isValidMethod('DELETE', model)
            break
        case 'PATCH':
            isValidMethod('PATCH', model)
            break
        default:
            throw 'invalid method'
    }
}

function isValidMethod(method, model){
    if(typeof model !== 'object'){
        throw 'model is not an object'
    }

    if(typeof method !== 'string'){
        throw 'method is not a string'
    }


}