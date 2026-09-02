const chatHandler = require('../../api/chat');

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: ''
    };
  }

  const result = createResponse();
  const request = {
    method: event.httpMethod,
    body: parseBody(event.body),
    query: event.queryStringParameters || {}
  };

  await chatHandler(request, result.response);
  return result.value;
};

function parseBody(body) {
  if (!body) return {};
  try {
    return JSON.parse(body);
  } catch {
    return {};
  }
}

function createResponse() {
  const value = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    },
    body: ''
  };

  const response = {
    status(code) {
      value.statusCode = code;
      return response;
    },
    json(data) {
      value.body = JSON.stringify(data);
      return response;
    }
  };

  return { response, value };
}
