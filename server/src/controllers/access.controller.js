"use strict";

const AccessService = require("../services/access.service");
const { OK, CREATED, SuccessResponse } = require("../core/success.response");

class AccessController {
  logout = async (req, res, next) => {
    new SuccessResponse({
      message: "Logout success!",
      metaData: await AccessService.logout({ keyStore: req.keyStore }),
    }).send(res);
  };
  login = async (req, res, next) => {
    new SuccessResponse({
      metaData: await AccessService.login(req.body),
    }).send(res);
  };
  signUp = async (req, res, next) => {
    new CREATED({
      message: "Registered OK!",
      statusCode: 201,
      metaData: await AccessService.signUp(req.body),
    }).send(res);
  };
}

module.exports = new AccessController();
