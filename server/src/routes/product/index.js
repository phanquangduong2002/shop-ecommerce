"use strict";

const express = require("express");
const productController = require("../../controllers/product.controller");
const asyncHandler = require("../../helpers/asyncHandler");
const { authenticationV2 } = require("../../auth/authUtils");

const router = express.Router();

// authentication
router.use(authenticationV2);

/////////////
router.post("", asyncHandler(productController.createProduct));
router.post(
  "/publish/:id",
  asyncHandler(productController.publishProductForShop)
);

// query
router.post("/drafts/all", asyncHandler(productController.getAllDraftsForShop));
router.post(
  "/published/all",
  asyncHandler(productController.getAllPublishForShop)
);

module.exports = router;
