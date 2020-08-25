'use strict';
const dispatch = require('lib/dispatch.js')

module.exports.handler = async event => {
  const model = event.path
  dispatch
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
    ),
  };
};
