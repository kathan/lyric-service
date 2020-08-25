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
    const modelPath = __dirname+'/../models/'+modelName+'.js'
    console.log(`current directory ${process.cwd()}`)
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
        throw 'method is invalid'
    }

    return model[method]
    
}

function isValidMethod(method, model){
    if(typeof model !== 'object'){
        console.log(`model is a ${typeof model}, not an object`)
        return false
    }

    if(typeof method !== 'string'){
        console.log('method is not a string')
        return false
    }

    if(!model.hasOwnProperty(method) || typeof model[method] !== 'function'){
        console.log('method does not exist on model')
        return false
    }
    return true
}