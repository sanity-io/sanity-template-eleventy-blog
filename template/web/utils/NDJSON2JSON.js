function NDJSON2JSON(dataset) {
  const linesWithComma = dataset.trim().replace(/(!?\r?\n)+/g, ',');
  return `[${linesWithComma}]`;
}

module.exports = NDJSON2JSON;
