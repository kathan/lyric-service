'use strict';
const dispatch = require('lib/dispatch.js')

module.exports.handler = async event => {
  dispatch(event)
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        input: event,
      },
      null,
      2
    ),
  };
};
