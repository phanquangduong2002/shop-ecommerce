"use strict";

import express from "express";

import accessRoutes from "./access/index.js";

const router = express.Router();

router.use("/v1/api", accessRoutes);

export default router;
