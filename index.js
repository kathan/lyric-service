'use strict';
const dispatch = require('lib/dispatch.js')
const response = response = {
  "statusCode": 200,
  "isBase64Encoded": false
}

module.exports.handler = async request => {
  const result = await dispatch(request, response)
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
