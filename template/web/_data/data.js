const getDataset = require('../utils/getDataset');
const getPosts = require('../utils/getPosts');
const getAuthors = require('../utils/getAuthors');
const getMetadata = require('../utils/getMetadata');

async function getData() {
  // only get the dataset once, and get different stuff out of it
  const dataset = await getDataset();

  const data = await Promise.all([
    getPosts(dataset),
    getAuthors(dataset),
    getMetadata(dataset),
  ]);

  const [posts, authors, metadata] = data;
  return {
    posts,
    authors,
    metadata,
  };
}

module.exports = getData;
