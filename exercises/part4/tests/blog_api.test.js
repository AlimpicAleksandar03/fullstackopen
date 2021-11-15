const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const api = supertest(app);
const initialBlogs = [
    { content: "Hello World", author: "aleksandar" },
    { content: "Hello There", author: "ivan" },
];
const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImlnbGEiLCJpZCI6IjYxOTI2MzZlZjVmYzg3ZDE3NWVlODFhNiIsImlhdCI6MTYzNjk5NDA2M30.ugjvzQG2w9BOuNUiUpONFZjFPwcQXU97mDTyO1YGF7M";
jest.setTimeout(100000);
beforeEach(async () => {
    await Blog.deleteMany({});

    const blogObjects = initialBlogs.map((blog) => new Blog(blog));
    const promiseArray = blogObjects.map((blog) => blog.save());
    await Promise.all(promiseArray);
});
describe("get request ", () => {
    test("there are two blogs", async () => {
        const response = await api.get("/api/blogs");
        expect(response.body).toHaveLength(2);
    });
    test("id property is there", async () => {
        const response = await api.get("/api/blogs");
        expect(response.body[0].id).toBeDefined();
    });
});
describe("post request", () => {
    test("number of blogs is increased by one", async () => {
        await api
            .post("/api/blogs")
            .set("Authorization", `bearer ${token}`)
            .send({ author: "Anonymous", title: "Hi there", url: "http://" });
        const blogs = await Blog.find({});
        expect(blogs).toHaveLength(initialBlogs.length + 1);
    });
});

describe("title or url are missing", () => {
    test("url is missing", async () => {
        await api
            .post("/api/blogs")
            .set("Authorization", `bearer ${token}`)
            .send({ author: "John", title: "someTitle" })
            .expect(400);
    });
    test("title is missing", async () => {
        await api
            .post("/api/blogs")
            .set("Authorization", `bearer ${token}`)
            .send({ url: "http://", title: "" })
            .expect(400);
    });
});
describe("if likes are missing, it will default to zero", () => {
    test("", async () => {
        const resp = await api
            .post("/api/blogs")
            .set("Authorization", `bearer ${token}`)
            .send({ url: "http://", title: "asd" });
        expect(resp.body.likes).toEqual(0);
    });
});
describe("if token is missing", () => {
    test("", async () => {
        await api
            .post("/api/blogs")
            .send({ url: "http://", title: "asd" })
            .expect(401);
    });
});
afterAll(() => {
    mongoose.connection.close();
});
