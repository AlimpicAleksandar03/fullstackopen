const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const middleware = require("../utils/middleware");
const jwt = require("jsonwebtoken");
blogRouter.get("/", async (request, response) => {
    const blogs = await Blog.find({}).populate("user", {
        username: 1,
        name: 1,
    });
    response.json(blogs);
});

blogRouter.post("/", middleware.extractUser, async (request, response) => {
    const user = request.user;
    const body = request.body;
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!body.likes) body.likes = 0;
    if (!body.title || !body.url) {
        return response.status(400).end();
    }
    if (!decodedToken.id) {
        return response.status(401).json({ error: "token missing or invalid" });
    }
    const blog = new Blog({
        url: body.url,
        title: body.title,
        author: body.author,
        user: user._id,
    });
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog.id);
    await user.save();
    response.json(savedBlog);
});
blogRouter.delete("/:id", middleware.extractUser, async (request, response) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    const user = request.user;
    const blog = await Blog.findById(request.params.id);
    if (!decodedToken.id) {
        return response.status(401).json({ error: "token missing or invalid" });
    }
    if (user.id.toString() === blog.user.toString()) {
        await Blog.findByIdAndRemove(request.params.id);
        return response.status(204).end();
    }
    return response.status(400);
});
blogRouter.put("/:id", async (request, response) => {
    const blog = request.body;
    const updated = await Blog.findByIdAndUpdate(request.params.id, blog, {
        new: blog.likes,
    });
    response.json(updated);
});
module.exports = blogRouter;
