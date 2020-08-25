module.exports = async event => {
    const httpMethod = event.httpMethod
    const modelName = event.pathParameters.proxy
    let model
    try{
        model = getModel(modelName)
    }catch(e){
        return {
            statusCode: 404
        }
    }

    try{
        const method = getMethod(httpMethod, model)
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
    const knownMethods = ['get', 'put', 'delete', 'patch', 'post']

    if(!knownMethods.includes(method.toLowerCase())){
        throw 'invalid method'
    }

    if(!isValidMethod(method.toLowerCase(), model)){
        throw 'method does not exist'
    }

    return model[method]
    
}

function isValidMethod(method, model){
    if(typeof model !== 'object'){
        return false
    }

    if(typeof method !== 'string'){
        return false
    }

    if(!model.hasOwnProperty(method) || typeof model[method] !== 'function'){
        return false
    }
    return true
}