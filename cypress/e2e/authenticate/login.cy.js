describe("Login UI test", () => {
    beforeEach(() => {
        cy.visit("https://www.saucedemo.com/");

        cy.get("[data-test='username']").as("username");
        cy.get("[data-test='password']").as("password");
        cy.get("[data-test='login-button']").as("loginButton");

        cy.get("@username").clear();
        cy.get("@password").clear();
    });

    it("empty username login", () => {
        cy.get("@loginButton").click();

        cy.get("[data-test='error']").should("be.visible");
        cy.get("[data-test='error']")
            .invoke("text")
            .should("equal", "Epic sadface: Username is required");
        cy.get("[data-icon='times-circle']").should("have.length", "2");
    });

    it("empty password login", () => {
        cy.get("@username").type("standard_user");
        cy.get("@loginButton").click();

        cy.get("[data-test='error']").should("be.visible");
        cy.get("[data-test='error']")
            .invoke("text")
            .should("equal", "Epic sadface: Password is required");
        cy.get("[data-icon='times-circle']").should("have.length", "2");
    });

    it("wrong username login", () => {
        cy.get("@username").type("wrong_user");
        cy.get("@password").type("secret_sauce");
        cy.get("@loginButton").click();

        cy.get("[data-test='error']").should("be.visible");
        cy.get("[data-test='error']")
            .invoke("text")
            .should(
                "equal",
                "Epic sadface: Username and password do not match any user in this service"
            );
        cy.get("[data-icon='times-circle']").should("have.length", "2");
    });

    it("wrong password login", () => {
        cy.get("@username").type("standard_user");
        cy.get("@password").type("wrong_pass");
        cy.get("@loginButton").click();

        cy.get("[data-test='error']").should("be.visible");
        cy.get("[data-test='error']")
            .invoke("text")
            .should(
                "equal",
                "Epic sadface: Username and password do not match any user in this service"
            );
        cy.get("[data-icon='times-circle']").should("have.length", "2");
    });

    it("locked username login", () => {
        cy.get("@username").type("locked_out_user");
        cy.get("@password").type("secret_sauce");
        cy.get("@loginButton").click();

        cy.get("[data-test='error']").should("be.visible");
        cy.get("[data-test='error']")
            .invoke("text")
            .should("equal", "Epic sadface: Sorry, this user has been locked out.");
        cy.get("[data-icon='times-circle']").should("have.length", "2");
    });

    it("redirect normal user when login", () => {
        cy.get("@username").type("standard_user");
        cy.get("@password").type("secret_sauce");
        cy.get("@loginButton").click();

        cy.location("href").should("eq", "https://www.saucedemo.com/inventory.html");
    });

    it("redirect problem user when login", () => {
        cy.get("@username").type("problem_user");
        cy.get("@password").type("secret_sauce");
        cy.get("@loginButton").click();

        cy.location("href").should("eq", "https://www.saucedemo.com/inventory.html");
    });

    it("redirect performance glitch user when login", () => {
        cy.get("@username").type("performance_glitch_user");
        cy.get("@password").type("secret_sauce");
        cy.get("@loginButton").click();

        cy.location("href").should("eq", "https://www.saucedemo.com/inventory.html");
    });

    it("check cookie when user login", () => {
        cy.get("@username").type("standard_user");
        cy.get("@password").type("secret_sauce");
        cy.get("@loginButton").click();

        cy.getCookies()
            .should("have.length", 1)
            .then((cookies) => {
                expect(cookies[0]).to.have.property("name", "session-username");
                expect(cookies[0]).to.have.property("value", "standard_user");
            });
    });
});
