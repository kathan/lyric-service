'use strict';
const dispatch = require('./lib/dispatch.js')
const statusCodes = require('./lib/statusCodes.js')

module.exports.handler = async request => {
  const response = {
    "statusCode": 200,
    "isBase64Encoded": false,
  }

  try{
    await dispatch(request, response)
    return {
      statusCode: statusCodes.includes(response.statusCode) ? response.statusCode : 500,
      body: response.body,
    };
  }catch(error){
    return {
      statusCode: 500,
      body: error,
    };
  }
};
