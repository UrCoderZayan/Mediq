const medicineSearchHandler = require('../../api/medicineSearch');

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: ''
    };
  }

  const result = createResponse();
  const request = {
    method: event.httpMethod,
    body: {},
    query: event.queryStringParameters || {}
  };

  await medicineSearchHandler(request, result.response);
  return result.value;
};

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
