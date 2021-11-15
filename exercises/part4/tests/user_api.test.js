const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const User = require("../models/user");
const api = supertest(app);
const initialUsers = [
    { username: "Aleksandarrrr", password: "Chicken", name: "acab" },
    { username: "Markooo", password: "Wolf", name: "acab123" },
];

beforeEach(async () => {
    await User.deleteMany({});

    const userObjects = initialUsers.map((user) => new User(user));
    const promiseArray = userObjects.map((user) => user.save());
    await Promise.all(promiseArray);
});
describe("there are two users", () => {
    test("", async () => {
        const response = await api.get("/api/users");
        expect(response.body).toHaveLength(2);
    });
});
describe("invalid user is not added", () => {
    test("password length is less than 3", async () => {
        await api
            .post("/api/users")
            .send({ username: "Acab", password: "<3" })
            .expect(400);
    });
    test("username length is less than 3", async () => {
        await api
            .post("/api/users")
            .send({ username: "<3", password: "<=3" })
            .expect(400);
    });
    test("username is missing", async () => {
        await api
            .post("/api/users")
            .send({ password: "something" })
            .expect(400);
    });
    test("password is missing", async () => {
        await api
            .post("/api/users")
            .send({ username: "something" })
            .expect(400);
    });
});
afterAll(() => {
    mongoose.connection.close();
});
