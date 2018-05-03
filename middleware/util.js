
function formatResponse(req, res, next) {

  if (res.statusCode === 404) {
    return res.send(`Invalid URL: ${req.originalUrl}`);
  }

  const rawData = res.data;
  const metaData = res.data ? res.data._meta : undefined;

  const formatted = {
    data: rawData || {}
  };

  res.json(formatted);
}

module.exports = {
  formatResponse
};
