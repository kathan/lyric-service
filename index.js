'use strict';
const dispatch = require('lib/dispatch.js')

module.exports.handler = async event => {
  const result = await dispatch(event)
  return {
    statusCode: result.statusCode,
    body: JSON.stringify(
      {
        input: event,
      },
      null,
      2
    ),
  };
};
