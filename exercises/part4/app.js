const http = require("http");
const express = require("express");
require("express-async-errors");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const Blog = require("./models/blog");
const config = require("./utils/config");
const blogsRouter = require("./controllers/blogs");
const requestLogger = require("./utils/middleware").requestLogger;
const getTokenFrom = require("./utils/middleware").getTokenFrom;
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const errorHandler = require("./utils/middleware").errorHandler;

mongoose.connect(config.mongoUrl);
app.use(express.json());
app.use(cors());
app.use(getTokenFrom);
app.use(requestLogger);
app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
if (process.env.NODE_ENV === "test") {
    const testingRouter = require("./controllers/testing");
    app.use("/api/testing", testingRouter);
}

app.use(errorHandler);
module.exports = app;
