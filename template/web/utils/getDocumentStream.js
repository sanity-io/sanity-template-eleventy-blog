const axios = require('axios');
const getStream = require('get-stream');
const { Readable } = require('stream');

function getDocumentStream(url, token) {
  const auth = token ? { Authorization: `Bearer ${token}` } : {};
  const userAgent = { 'User-Agent': '11ty' };
  const headers = { ...userAgent, ...auth };

  return axios({
    method: 'get',
    // responseType: 'stream',
    url,
    headers,
  })
    .then(res => res.data)
    .catch(async err => {
      if (!err.response || !err.response.data) {
        throw err;
      }

      let error = err;
      try {
        // Try to lift error message out of JSON payload ({error, message, statusCode})
        const data = await getStream(err.response.data);
        error = new Error(JSON.parse(data).message);
      } catch (jsonErr) {
        // Do nothing, throw regular error
      }

      throw error;
    });
}

module.exports = getDocumentStream;
