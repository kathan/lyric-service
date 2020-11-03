const path = require('path')
const knownMethods = ['get', 'put', 'delete', 'patch', 'post']

module.exports = async (request, response) => {
    const httpMethod = request.httpMethod
    let resourceArray
    if(request.pathParameters && request.pathParameters.proxy){
        resourceArray = request.pathParameters.proxy.split('/')
    }
    const handlerName = (resourceArray && resourceArray[0] ? resourceArray[0] : 'index')

    let handlerConstructor
    let handler
    try{
        handlerConstructor = getHandler(handlerName)
        handler = new handlerConstructor()
    }catch(e){
        console.log(`Error in getHandler: ${e}`)
        response.statusCode = 404
        return
    }

    try{
        const method = getMethod(httpMethod, handler)
        try{
            await method(request, response)
        }catch(e){
            console.log(`Error executing method '${httpMethod}' on '${handlerName}': ${e}`)
            response.statusCode = 500
            return
        }
    }catch(e){
        console.info(`Error in getMethod: ${e}`)
        response.statusCode = 405
        return
    }
}

function getHandler(handlerName){
    const handlerPath = path.normalize(__dirname+'/../handlers/'+handlerName+'.js')
    console.log(`Looking for handler ${handlerPath}`)
    const handler = require(handlerPath)
    return handler
}

function getMethod(methodName, handler){

    if(typeof methodName !== 'string'){
        let msg = `Method name '${methodName}' is a '${typeof methodName}' type. String required.`
        throw msg
    }

    if(!knownMethods.includes(methodName.toLowerCase())){
        let msg = `Method name '${methodName}' is not allowed.`
        throw msg
    }

    if(!isValidMethod(methodName.toLowerCase(), handler)){
        let msg = `Method name '${methodName}' is invalid on '${handler.constructor.name}'.`
        throw msg
    }

    return handler[methodName.toLowerCase()]
}

function isValidMethod(methodName, handler){
    if(typeof handler !== 'object'){
        console.log(`Handler '${handler.constructor.name}' is a '${typeof handler}' type. Object required.`)
        return false
    }

    if(!handler[methodName] || !['function', 'AsyncFunction'].includes(typeof handler[methodName])){
        console.log(`Method name '${methodName}' does not exist on handler '${handler.constructor.name}'.`)
        return false
    }
    
    return true
}