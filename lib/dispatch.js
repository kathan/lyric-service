const path = require('path')
module.exports = async (request, response) => {
    const httpMethod = request.httpMethod
    const modelName = request.pathParameters.proxy
    let model
    try{
        model = getModel(modelName)
    }catch(e){
        console.log(e)
        return {
            statusCode: 404
        }
    }

    try{
        const method = getMethod(httpMethod, model)
        return method(request, response)
    }catch(e){
        console.log(e)
        return {
            statusCode: 404
        }
    }
}

function getModel(modelName){
    const modelPath = path.normalize(__dirname+'/../handlers/'+modelName+'.js')
    console.log(`looking for ${modelPath}`)
    return require(modelPath)
}

function getMethod(method, model){
    const knownMethods = ['get', 'put', 'delete', 'patch', 'post']

    if(!knownMethods.includes(method.toLowerCase())){
        let msg = 'method not allowed'
        console.log(msg)
        throw msg
    }

    if(!isValidMethod(method.toLowerCase(), model)){
        let msg = 'method is invalid'
        console.log(msg)
        throw msg
    }

    return model[method.toLowerCase()]
}

function isValidMethod(methodName, model){
    if(typeof model !== 'object'){
        console.log(`model is a ${typeof model}, not an object`)
        return false
    }

    if(typeof methodName !== 'string'){
        console.log('method is not a string')
        return false
    }

    if(!model.hasOwnProperty(methodName) || typeof model[methodName] !== 'function'){
        console.log(`method name ${methodName} does not exist on model`)
        return false
    }
    
    return true
}