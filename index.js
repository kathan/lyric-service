'use strict';
const dispatch = require('lib/dispatch.js')
const response = {
  "statusCode": 200,
  "isBase64Encoded": false
}

module.exports.handler = async request => {
  await dispatch(request, response)
  return {
    statusCode: response.statusCode,
    body: response.body || JSON.stringify(
      {
        input: request,
      },
      null,
      2
    ),
  };
};
