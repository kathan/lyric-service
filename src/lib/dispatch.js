const path = require('path')

module.exports = async (request, response) => {
    const httpMethod = request.httpMethod
    const resourceArray = request.pathParameters.proxy.split('/')
    const handlerName = (resourceArray[0] ? resourceArray[0] : 'index.js')

    let handler
    try{
        handler = getHandler(handlerName)
    }catch(e){
        console.log(`Error in getHandler: ${e}`)
        response.statusCode = 404
        return
    }

    try{
        const method = getMethod(httpMethod, handler, handlerName)
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
    // if(require.cache[handlerPath]){
    //     console.log(`Removing old ${handlerName} from cache`)
    //     delete require.cache[handlerPath]
    // }
    console.log(`Looking for handler ${handlerPath}`)
    const handler = require(handlerPath)
    return handler
}

function getMethod(methodName, handler, handlerName){
    const knownMethods = ['get', 'put', 'delete', 'patch', 'post']

    if(typeof methodName !== 'string'){
        let msg = `Method name '${methodName}' is a '${typeof methodName}' type. String required.`
        throw msg
    }

    if(!knownMethods.includes(methodName.toLowerCase())){
        let msg = `Method name '${methodName}' is not allowed.`
        throw msg
    }

    if(!isValidMethod(methodName.toLowerCase(), handler, handlerName)){
        let msg = `Method name '${methodName}' is invalid on '${handlerName}'.`
        throw msg
    }

    return handler[methodName.toLowerCase()]
}

function isValidMethod(methodName, handler, handlerName){
    if(typeof handler !== 'object'){
        console.log(`Handler '${handlerName}' is a '${typeof handler}' type. Object required.`)
        return false
    }

    if(!handler.hasOwnProperty(methodName) || !['function', 'AsyncFunction'].includes(typeof handler[methodName])){
        console.log(`Method name '${methodName}' does not exist on handler '${handlerName}'.`)
        return false
    }
    
    return true
}