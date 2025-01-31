const { encrypt, compare } = require("../utils/handleJwt");
const {
  handleHttpError,
  handleErrorResponse,
} = require("../utils/handleError");
const { tokenSign } = require("../utils/handleToken");

const { userModel } = require("../models");
const { matchedData } = require("express-validator");

/**
 * Controller for login
 * @param {*} req
 * @param {*} res
 * @returns
 */
const loginCtrl = async (req, res) => {
  try {
    const { email, password } = matchedData(req);

    const user = await userModel.findOne({ email: email });
    if (!user) {
      handleErrorResponse(res, "USER_NOT_EXISTS", 404);
      return;
    }

    const checkPassword = await compare(password, user.password);
    if (!checkPassword) {
      handleErrorResponse(res, "PASSWORD_DOESNT_MATCH", 401);
      return;
    }

    const tokenJwt = await tokenSign(user);

    const data = {
      token: tokenJwt,
      user: user,
    };

    res.send({ data });
  } catch (e) {
    handleHttpError(res, e);
  }
};

/**
 * Controller for register
 * @param {*} req
 * @param {*} res
 * @returns
 */
const registerCtrl = async (req, res) => {
  try {
    const { email, password, ...body } = matchedData(req);
    const checkIsExist = await userModel.findOne({ email });
    if (checkIsExist) {
      handleErrorResponse(res, "USER_EXISTS", 409); //* 409 Conflict
      return;
    }
    const encryptedPass = await encrypt(password);
    const bodyInsert = { ...body, email, password: encryptedPass };
    const data = await userModel.create(bodyInsert);
    res.send({ data });
  } catch (e) {
    handleHttpError(res, e);
  }
};

module.exports = { loginCtrl, registerCtrl };
