"use strict";

const AccessService = require("../services/access.service");
const { OK, CREATED, SuccessResponse } = require("../core/success.response");

class AccessController {
  handlerRefreshToken = async (req, res, next) => {
    // new SuccessResponse({
    //   message: "Get token success!",
    //   metaData: await AccessService.handlerRefreshToken(req.body.refreshToken),
    // }).send(res);

    // v2 fixed, no need accessToken
    new SuccessResponse({
      message: "Get token success!",
      metaData: await AccessService.handlerRefreshTokenV2({
        refreshToken: req.refreshToken,
        user: req.user,
        keyStore: req.keyStore,
      }),
    }).send(res);
  };

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
