"use strict";

const CartService = require("../services/cart.service");

const { SuccessResponse } = require("../core/success.response");

class CartController {
  // new
  addToCart = async (req, res, next) => {
    new SuccessResponse({
      message: "Create new Cart success!",
      metaData: await CartService.addToCart(req.body),
    }).send(res);
  };

  // update
  update = async (req, res, next) => {
    new SuccessResponse({
      message: "Create new Cart success!",
      metaData: await CartService.addToCartV2(req.body),
    }).send(res);
  };

  // delete
  delete = async (req, res, next) => {
    new SuccessResponse({
      message: "Deleted Cart success!",
      metaData: await CartService.deleteUserCart(req.body),
    }).send(res);
  };

  // query
  listToCart = async (req, res, next) => {
    new SuccessResponse({
      message: "Get list Cart success!",
      metaData: await CartService.getListCart(req.query),
    }).send(res);
  };
}

module.exports = new CartController();
