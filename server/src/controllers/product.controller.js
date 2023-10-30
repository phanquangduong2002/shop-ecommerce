"use strict";

const ProductServiceV2 = require("../services/product.service.V2");

const { SuccessResponse } = require("../core/success.response");

class ProductController {
  createProduct = async (req, res, next) => {
    new SuccessResponse({
      message: "Create new Product success!",
      metaData: await ProductServiceV2.createProduct(req.body.product_type, {
        ...req.body,
        product_shop: req.user.userId,
      }),
    }).send(res);
  };

  publishProductForShop = async (req, res, next) => {
    new SuccessResponse({
      message: "Publish product By shop success!",
      metaData: await ProductServiceV2.publishProductByShop({
        product_shop: req.user.userId,
        product_id: req.params.id,
      }),
    }).send(res);
  };

  // QUERY
  /**
   * @desc Get all drafts for shop
   * @param {Numer} limit
   * @param {Numer} skip
   * @return {JSON}
   */

  getAllDraftsForShop = async (req, res, next) => {
    new SuccessResponse({
      message: "Get list Draft success!",
      metaData: await ProductServiceV2.findAllDraftsForShop({
        product_shop: req.user.userId,
      }),
    }).send(res);
  };

  /**
   * @desc get all publish for shop
   * @param {Number} limit
   * @param {Numer} skip
   * @return {JSON}
   */

  getAllPublishForShop = async (req, res, next) => {
    new SuccessResponse({
      message: "Get list Publish success!",
      metaData: await ProductServiceV2.findAllPublishForShop({
        product_shop: req.user.userId,
      }),
    }).send(res);
  };
}

module.exports = new ProductController();
