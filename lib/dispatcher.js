const path = require('path');
const knownMethods = ['get', 'put', 'delete', 'patch', 'post'];

class Dispatcher{
    async dispatch (handlerName, httpMethod, request, response) {
        
        //Prepare init
        let initConstructor;
        let initHandler;
        try{
            initConstructor = getHandler('init');
            initHandler = new initConstructor();
        }catch(e){
            const msg = `Error loading init handler: ${e}`;
            console.error(msg);
        }

        let handlerConstructor;
        try{
            handlerConstructor = getHandler(handlerName);
        }catch(e){
            console.error(`Error in getHandler: ${e}`);
            response.statusCode = 404;
            return;
        }
        
        let handler;
        try{
            handler = new handlerConstructor();
        }catch(e){
            console.error(`Error creating handler: ${handlerName}`);
            response.statusCode = 404;
            return;
        }
        
        let method;
        try{
            method = getMethod(httpMethod, handler);
        }catch(e){
            console.error(`Error in getMethod: ${e}`);
            response.statusCode = 405;
            return;
        }

        try{
            console.info(`Running init`);
            await runInit(request, response, initHandler);
        }catch(e){
            console.error(`Error in runInit: ${e}`);
        }

        if(handler.before && typeof handler.before === 'function'){
            try{
                console.info(`Running before`);
                await handler.before(request, response, {});
            }catch(e){
                console.error(`Error executing method ${handlerName}.before: ${e}`);
                response.statusCode = 500;
                return;
            }
        }

        try{
            console.info(`calling handler method ${handlerName}.${httpMethod}`);
            await method.call(handler, request, response);
        }catch(e){
            console.error(`Error executing handler method ${handlerName}.${httpMethod}: ${e}`);
            response.statusCode = 500;
            return;
        }

        if(handler.after && typeof handler.after === 'function'){
            try{
                console.info(`Running after`);
                await handler.after(request, response, {});
            }catch(e){
                console.error(`Error executing method ${handlerName}.after: ${e}`);
                response.statusCode = 500;
                return;
            }
        }
    }
}

function getHandler(handlerName){
    const handlerPath = path.normalize(__dirname+'/../handlers/'+handlerName+'.js');
    console.info(`Looking for handler ${handlerPath}`);
    const handler = require(handlerPath);
    return handler;
}

function getMethod(methodName, handler){
    if(typeof methodName !== 'string'){
        let msg = `Method name '${methodName}' is a '${typeof methodName}' type. String required.`;
        throw msg;
    }

    if(!knownMethods.includes(methodName.toLowerCase())){
        let msg = `Method name '${methodName}' is not allowed.`;
        throw msg;
    }

    if(!isValidMethod(methodName.toLowerCase(), handler)){
        let msg = `Method name '${methodName}' is invalid on '${handler.constructor.name}'.`;
        throw msg;
    }

    return handler[methodName.toLowerCase()];
}

function isValidMethod(methodName, handler){
    if(typeof handler !== 'object'){
        console.error(`Handler '${handler.constructor.name}' is a '${typeof handler}' type. Object required.`);
        return false;
    }

    if(!handler[methodName] || !['function', 'AsyncFunction'].includes(typeof handler[methodName])){
        console.error(`Method name '${methodName}' does not exist on handler '${handler.constructor.name}'.`);
        return false;
    }
            
    return true;
}

async function runInit(request, response, handler){
    if(!isValidMethod('before', handler)){
        const msg = `Method name 'before' is invalid on '${handler.constructor.name}'.`;
        console.error(msg);
        return;
    }

    if(handler.before && typeof handler.before === 'function'){
        await handler.before(request, response, {});
    }
}

module.exports = Dispatcher;