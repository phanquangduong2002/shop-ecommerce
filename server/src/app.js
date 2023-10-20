"use strict";

const dotenv = require("dotenv");
const compression = require("compression");
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");

const Database = require("./dbs/init.mongodb");
const { checkOverload } = require("./helpers/check.connect");

const router = require("./routes/index");

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
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  const statusCode = error.status || 500;
  return res.status(statusCode).json({
    status: "error",
    code: statusCode,
    stack: error.stack,
    message: error.message || "Internal Server Error",
  });
});

module.exports = app;
