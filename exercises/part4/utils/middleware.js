const User = require("../models/user");
const jwt = require("jsonwebtoken");

const requestLogger = (request, response, next) => {
    console.log(("Method:", request.method));
    console.log(("Path:  ", request.path));
    console.log(("Body:  ", request.body));
    console.log("---");
    next();
};
const getTokenFrom = (request, response, next) => {
    const authorization = request.get("authorization");
    if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
        request.token = authorization.substring(7);
    }
    next();
};
const errorHandler = (error, request, response, next) => {
    console.log(error);
    if (error.name === "CastError" && error.kind === "ObjectId") {
        return response.status(400).send({ error: "malformatted id" });
    } else if (error.name === "ValidationError") {
        return response.status(400).json({ error: error.message });
    } else if (error.name === "JsonWebTokenError") {
        return response.status(401).json({
            error: "invalid token",
        });
    }

    next(error);
};
const extractUser = async (request, response, next) => {
    const token = request.token;
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (token && decodedToken.id) {
        const user = await User.findById(decodedToken.id);
        request.user = user;
    }
    next();
};
module.exports = {
    requestLogger,
    getTokenFrom,
    errorHandler,
    extractUser,
};
