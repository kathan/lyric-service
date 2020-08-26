'use strict';
const dispatch = require('lib/dispatch.js')
const statusCodes = require('lib/statusCodes.js')
const response = {
  "statusCode": 200,
  "isBase64Encoded": false
}

module.exports.handler = async request => {
  await dispatch(request, response)
  return {
    statusCode: statusCodes.includes(response.statusCode) ? response.statusCode : 500,
    body: response.body,
  };
};
