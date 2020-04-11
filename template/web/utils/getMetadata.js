const groq = require('groq');
const getDataFromQuery = require('./getDataFromQuery');

function getMetadata(dataset) {
  const query = groq`
    *[_id == "siteSettings"]{
      ...,
      author->
    }[0]
  `;
  return getDataFromQuery(query, dataset);
}

module.exports = getMetadata;
