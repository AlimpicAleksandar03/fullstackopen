describe("Blog app", function () {
    beforeEach(function () {
        cy.request("POST", "http://localhost:3003/api/testing/reset");
        cy.visit("http://localhost:3000");
    });

    it("Login form is shown", function () {
        cy.contains("username");
        cy.contains("password");
        cy.contains("Login to the application");
    });
    describe("Login", function () {
        it("succeds with correct credentials", function () {
            cy.request("POST", "http://localhost:3003/api/testing/reset");
            const user = {
                name: "Marko",
                username: "Marex",
                password: "Kamenje123",
            };
            cy.request("POST", "http://localhost:3003/api/users", user);

            cy.get("#username").type("Marex");
            cy.get("#password").type("Kamenje123");
            cy.get("#loginBtn").click();
            cy.contains("Marex logged-in");
        });
        it("fails with wrong credentials", function () {
            cy.request("POST", "http://localhost:3003/api/testing/reset");
            const user = {
                name: "Marko",
                username: "Marex",
                password: "Kamenje123",
            };
            cy.request("POST", "http://localhost:3003/api/users", user);

            cy.get("#username").type("Marex");
            cy.get("#password").type("Wrong");
            cy.get("#loginBtn").click();

            cy.get("html").should("not.contain", "Marex logged in");
        });
    });
    describe("When logged in", function () {
        beforeEach(function () {
            cy.request("POST", "http://localhost:3003/api/testing/reset");
            const user = {
                name: "Marko",
                username: "Marex",
                password: "Kamenje123",
            };
            cy.request("POST", "http://localhost:3003/api/users", user);
            cy.get("#username").type("Marex");
            cy.get("#password").type("Kamenje123");
            cy.get("#loginBtn").click();
        });
        it("A blog can be created", function () {
            cy.createBlog();
            cy.get("html").should("contain", "Some title");
            cy.get("html").should("contain", "Some author");
        });
        it("A blog can be liked", function () {
            cy.createBlog();
            cy.get(".show").click();
            cy.get(".likeBtn").click();
            cy.get(".likeBtn").click();
            cy.contains("likes").contains(2);
        });
        it("A blog can be deleted", function () {
            cy.createBlog();
            cy.get(".show").click();
            cy.get(".deleteBtn").click();
            cy.get("html").should("not.contain", "Some title");
        });
    });
});
