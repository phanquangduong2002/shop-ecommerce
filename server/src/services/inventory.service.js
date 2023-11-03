"use strict";

const { BadRequestError } = require("../core/error.response");
const inventory = require("../models/inventory.model");
const { getProductById } = require("../models/repositories/product.repo");

class InventoryService {
  static async addStockToInventory({
    stock,
    productId,
    shopId,
    location = "Ha Noi",
  }) {
    const product = await getProductById(productId);

    if (!product) throw new BadRequestError("Product not exists!");
  }
}

module.exports = InventoryService;
