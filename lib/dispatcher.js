const path = require('path')
const knownMethods = ['get', 'put', 'delete', 'patch', 'post']

class Dispatcher{
    async dispatch (request, response) {
        const httpMethod = request.httpMethod
        let resourceArray
        if(request.pathParameters && request.pathParameters.proxy){
            resourceArray = request.pathParameters.proxy.split('/')
        }
        const handlerName = (resourceArray && resourceArray[0] ? resourceArray[0] : 'default')

        let handlerConstructor
        try{
            handlerConstructor = getHandler(handlerName)
        }catch(e){
            console.log(`Error in getHandler: ${e}`)
            response.statusCode = 404
            return
        }
        
        let handler
        try{
            handler = new handlerConstructor()
        }catch(e){
            console.log(`Error creating handler: ${handlerName}`)
            response.statusCode = 404
            return
        }
        
        let method
        try{
            method = getMethod(httpMethod, handler)
        }catch(e){
            console.info(`Error in getMethod: ${e}`)
            response.statusCode = 405
            return
        }

        try{
            await runInit(request, response)
        }catch(e){
            console.log(`Error in runInit: ${e}`)
        }

        if(handler['before'] && typeof handler['before'] === 'function'){
            try{
                await handler.before(request, response, {})
            }catch(e){
                console.log(`Error executing method 'before' on '${handlerName}': ${e}`)
                response.statusCode = 500
                return
            }
        }

        try{
            console.log('calling method')
            await method.call(handler, request, response)
        }catch(e){
            console.log(`Error executing method '${httpMethod}' on '${handlerName}': ${e}`)
            response.statusCode = 500
            return
        }

        if(handler['after'] && typeof handler['after'] === 'function'){
            try{
                await handler.after(request, response, {})
            }catch(e){
                console.log(`Error executing method 'after' on '${handlerName}': ${e}`)
                response.statusCode = 500
                return
            }
        }
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

async function runInit(request, response){
    let handlerConstructor
    let handler
    try{
        handlerConstructor = getHandler('init')
        handler = new handlerConstructor()
    }catch(e){
        const msg = `Error loading init handler: ${e}`
        console.log(msg)
        return
    }

    if(!isValidMethod('before', handler)){
        const msg = `Method name 'before' is invalid on '${handler.constructor.name}'.`
        console.log(msg)
        return
    }

    if(handler['before'] && typeof handler['before'] === 'function'){
        await handler.before(request, response, {})
    }}
module.exports = Dispatcher