const axios = require('axios');
const client = require('./sanityClient.js');

const { dataset, token } = client.config();
const url = client.getUrl(`/data/export/${dataset}`);

function getDataset() {
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
    .catch(async error => {
      throw error;
    });
}

module.exports = getDataset;
