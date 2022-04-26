const { PaginationParameters } = require("mongoose-paginate-v2");

const getParams = (req) => new PaginationParameters(req).get();

module.exports = getParams;
