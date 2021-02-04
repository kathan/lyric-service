const Dispatcher = require('./lib/dispatcher.js');
const fs = require('fs');
const path = require('path');
const dispatcher = new Dispatcher();
const statusCodes = require('./lib/statusCodes.js');

module.exports.handler = async request => {
  const response = {
    statusCode: 200,
    isBase64Encoded: false,
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
    console.log('Found Path')
    const resourceArray = request.pathParameters.proxy.split('/');
    handlerName = (resourceArray && resourceArray[0] ? resourceArray[0] : 'default');
  }else{
    const pathArray = path.split('/');
    const handlerNames = getHandlerNames();
    handlerName = pathArray.foreach(pathPart => {
      console.log('pathPart', pathPart);

      if(handlerNames.includes(pathPart)){
        return pathPart;
      }
    });
  }
  return handlerName || 'default';
}

function getHandlerNames(){
  const handlerFiles = fs.readdirSync(__dirname+'/handlers');
  console.log('handlerFiles', handlerFiles);

  const handlerNames = handlerFiles.map(file => {
    return path.basename(file, path.extname(file));
  });
  console.log('handlerNames', handlerNames);

  return handlerNames;
}