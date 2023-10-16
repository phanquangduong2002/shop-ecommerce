"use strict";

import dotenv from "dotenv";
import compression from "compression";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";

import Database from "./dbs/init.mongodb.js";
import { checkOverload } from "./helpers/check.connect.js";

import router from "./routes/index.js";

const app = express();

dotenv.config();

// init middlewares
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// init db
Database.getInstance();
// checkOverload();

// init routes
app.use("", router);

// handling error

export default app;
