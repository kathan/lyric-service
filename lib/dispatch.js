const path = require('path')

module.exports = async (request, response) => {
    const httpMethod = request.httpMethod
    const handlerName = request.pathParameters.proxy
    let handler
    try{
        handler = getHandler(handlerName)
    }catch(e){
        console.log(`getHandler ${e}`)
        response.statusCode = 404
        return
    }

    try{
        const method = getMethod(httpMethod, handler, handlerName)
        try{
            await method(request, response)
        }catch(e){
            console.log(`Error executing method ${httpMethod} on ${handlerName}`)
            response.statusCode = 500
            return
        }
    }catch(e){
        console.log(`getMethod ${e}`)
        response.statusCode = 405
        return
    }
}

function getHandler(hanlderName){
    const handlerPath = path.normalize(__dirname+'/../handlers/'+hanlderName+'.js')
    console.log(`looking for ${handlerPath}`)
    return require(handlerPath)
}

function getMethod(methodName, handler, handlerName){
    const knownMethods = ['get', 'put', 'delete', 'patch', 'post']

    if(typeof methodName !== 'string'){
        let msg = `Method name '${methodName}'is a ${typeof methodName}. String required`
        console.log(msg)
        throw msg
    }

    if(!knownMethods.includes(methodName.toLowerCase())){
        let msg = `method not allowed on handler '${handlerName}'`
        console.log(msg)
        throw msg
    }

    if(!isValidMethod(methodName.toLowerCase(), handler, handlerName)){
        let msg = `method '${methodName}' is invalid on '${handlerName}'`
        console.log(msg)
        throw msg
    }

    return handler[methodName.toLowerCase()]
}

function isValidMethod(methodName, handler, handlerName){
    if(typeof handler !== 'object'){
        console.log(`handler is a '${typeof handler}', not an object`)
        return false
    }

    if(!handler.hasOwnProperty(methodName) || !['function', 'AsyncFunction'].includes(typeof handler[methodName])){
        console.log(`method name '${methodName}' does not exist on handler ${handlerName}`)
        return false
    }
    
    return true
}