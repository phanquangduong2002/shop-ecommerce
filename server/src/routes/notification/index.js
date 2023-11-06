"use strict";

const express = require("express");
const notificationController = require("../../controllers/notification.controller");
const asyncHandler = require("../../helpers/asyncHandler");
const { authenticationV2 } = require("../../auth/authUtils");

const router = express.Router();

// Not login

// authentication
router.use(authenticationV2);

/////////////
router.get("", asyncHandler(notificationController.listNotiByUser));
// query

module.exports = router;
