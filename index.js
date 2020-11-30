const Dispatcher = require('./lib/dispatcher.js');
const dispatcher = new Dispatcher();
const statusCodes = require('./lib/statusCodes.js');

module.exports.handler = async request => {
  const response = {
    statusCode: 200,
    isBase64Encoded: false,
    body: {}
  };

  try{
    await dispatcher.dispatch(request, response);
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
