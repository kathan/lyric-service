const Dispatcher = require('./lib/dispatcher.js');
const fs = require('fs');
const path = require('path');
const dispatcher = new Dispatcher();
const statusCodes = require('./lib/statusCodes.js');

module.exports.handler = async request => {
  const response = {
    statusCode: 200,
    isBase64Encoded: false,
    headers: {
      "content-type": "application/json",
    },
    body: {}
  };
  
  console.log('request', request);

  try{
    const httpMethod = request.httpMethod;
    const handlerName = findHandlerName(request);
    console.log('handlerName', handlerName);
    await dispatcher.dispatch(handlerName, httpMethod, request, response);
    return {
      statusCode: statusCodes.includes(response.statusCode) ? response.statusCode : 500,
      body: JSON.stringify(response.body),
      headers: {
        "content-type": "application/json",
      },
    };
  }catch(error){
    return {
      statusCode: 500,
      body: error,
    };
  }
};

function findHandlerName(request){
  let handlerName;
  if(request.pathParameters && request.pathParameters.proxy){
    console.log("Found Path");
    const resourceArray = request.pathParameters.proxy.split("/");
    handlerName = (resourceArray && resourceArray[0] ? resourceArray[0] : "default");
  }else{
    const pathArray = request.path.split("/");
    console.log('pathArray', pathArray)
    const handlerNames = getHandlerNames();
    console.log('handlerNames', handlerNames);

    handlerName = pathArray.find(pathPart => {
      console.log('pathPart', pathPart);
      if(handlerNames.includes(pathPart)){
        return pathPart;
      }
    });
  }
  console.log('handlerName 1', handlerName)
  return handlerName || "default";
}

function getHandlerNames(){
  const handlerFiles = fs.readdirSync(__dirname+'/handlers');

  const handlerNames = handlerFiles.filter(file => {
    return !file.startsWith('.') && !file.includes('.test.')
  }).map(file => path.basename(file, path.extname(file)));

  return handlerNames;
}