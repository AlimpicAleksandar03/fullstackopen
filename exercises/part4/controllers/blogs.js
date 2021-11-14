const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/", async (request, response) => {
    const blogs = await Blog.find({});
    response.json(blogs);
});

blogRouter.post("/", (request, response) => {
    const newBlog = request.body;
    if (!newBlog.likes) newBlog.likes = 0;
    if (!newBlog.title || !newBlog.url) return response.status(400).end();
    const blog = new Blog(newBlog);

    blog.save().then((blog) => {
        response.json(blog.toJSON());
    });
});
blogRouter.delete("/:id", async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
});
blogRouter.put("/:id", async (request, response) => {
    const blog = request.body;
    const updated = await Blog.findByIdAndUpdate(request.params.id, blog, {
        new: blog.likes,
    });
    response.json(updated);
});
module.exports = blogRouter;
