'use strict';
const dispatch = require('lib/dispatch.js')

module.exports.handler = async event => {
  dispatch(event)
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
