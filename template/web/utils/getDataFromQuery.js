const { parse, evaluate } = require('groq-js');
const NDJSON2JSON = require('../utils/NDJSON2JSON');

const getDataFromQuery = async (query, docs) => {
  try {
    const tree = parse(query);
    const dataset = JSON.parse(NDJSON2JSON(docs));
    const value = await evaluate(tree, { dataset });
    return value.get();
  } catch (error) {
    console.log(error);
    return [];
  }
};

module.exports = getDataFromQuery;
