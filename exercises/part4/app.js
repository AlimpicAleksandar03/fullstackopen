const http = require("http");
const express = require("express");
require("express-async-errors");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const Blog = require("./models/blog");
const config = require("./utils/config");
const blogRouter = require("./controllers/blogs");
const requestLogger = require("./utils/middleware").requestLogger;

mongoose.connect(config.mongoUrl);
app.use(express.json());
app.use(cors());
app.use(requestLogger);
app.use("/api/blogs", blogRouter);

module.exports = app;
