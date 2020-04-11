const groq = require('groq');
const BlocksToMarkdown = require('@sanity/block-content-to-markdown');
const client = require('./sanityClient.js');
const serializers = require('./serializers');
const overlayDrafts = require('./overlayDrafts');
const getDataFromQuery = require('./getDataFromQuery');

const hasToken = !!client.config().token;

function generateAuthor(author) {
  return {
    ...author,
    bio: BlocksToMarkdown(author.bio, { serializers, ...client.config() }),
  };
}

async function getAuthors(dataset) {
  const filter = groq`*[_type == "author"]`;
  const docs = await getDataFromQuery(filter, dataset);
  const authors = docs.map(generateAuthor);
  const reducedAuthors = overlayDrafts(hasToken, authors);
  return reducedAuthors;
}

module.exports = getAuthors;
