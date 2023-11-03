"use strict";

const express = require("express");
const checkoutController = require("../../controllers/checkout.controller");
const asyncHandler = require("../../helpers/asyncHandler");
const { authenticationV2 } = require("../../auth/authUtils");

const router = express.Router();

// authentication
// router.use(authenticationV2);

/////////////
router.post("/review", asyncHandler(checkoutController.checkoutReview));
// query

module.exports = router;
