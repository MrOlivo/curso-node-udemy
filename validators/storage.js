const { check, body } = require("express-validator");
const { validateResult } = require("../utils/handleValidator");

const validateId = [body("id").exists().isMongoId(), validateResult];
const validateFileComes = [body("file").exists(), validateResult];

module.exports = { validateId, validateFileComes };
