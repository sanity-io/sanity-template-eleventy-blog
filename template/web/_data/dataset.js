const getDocumentStream = require('../utils/getDocumentStream');
const client = require('../utils/sanityClient.js');

const { dataset, token } = client.config();
const url = client.getUrl(`/data/export/${dataset}`);

async function getDataset() {
  const docs = await getDocumentStream(url, token);

  console.log(docs);
  return { docs };
}

module.exports = getDataset;
