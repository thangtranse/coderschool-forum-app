require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");

const app = express();

const whiteList = [
  "'self'",
  "'unsafe-inline'",
  "'unsafe-eval'",
  "data:",
  "ws:",
  "wss:",
  "blob:",
];

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        "script-src": whiteList,
        "img-src": ["'self'", "https: data: blob:"],
        "connect-src": whiteList,
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      },
    },
    crossOriginEmbedderPolicy: true,
    crossOriginOpenerPolicy: true,
    crossOriginResourcePolicy: true,
  })
);

const createError = require("http-errors");

app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));
app.use(express.json({ limit: "5mb" }));
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/*", (_req, _res, next) => {
  next(createError.NotFound());
});

app.post("/*", (_req, _res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, _next) => {
  return res.json({
    status: err.status || 500,
    message: err.message,
  });
});

module.exports = app;
