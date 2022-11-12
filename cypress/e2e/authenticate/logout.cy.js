describe("logout user", () => {
    beforeEach(() => {
        cy.visit("https://www.saucedemo.com/");

        cy.get("[data-test='username']").type("standard_user");
        cy.get("[data-test='password']").type("secret_sauce");
        cy.get("[data-test='login-button']").click();

        cy.get("#react-burger-menu-btn").as("menuButton");
        cy.get(".bm-menu-wrap").as("menuWrap");
    });

    it("check user cookie", () => {
        cy.getCookies()
            .should("have.length", 1)
            .then((cookies) => {
                expect(cookies[0]).to.have.property("name", "session-username");
                expect(cookies[0]).to.have.property("value", "standard_user");
            });
    });

    it("click logout button", () => {
        cy.get("@menuButton").click();
        cy.get("@menuWrap").invoke("attr", "aria-hidden").should("eq", "false");

        cy.get("#logout_sidebar_link").click();

        cy.getCookies().should("have.length", 0);
        cy.location("href").should("eq", "https://www.saucedemo.com/");
    });

    it("cannot go to inventory", () => {
        cy.get("@menuButton").click();
        cy.get("#logout_sidebar_link").click();

        cy.visit("https://www.saucedemo.com/inventory.html", { failOnStatusCode: false });

        cy.get("[data-test='error']")
            .invoke("text")
            .should(
                "eq",
                "Epic sadface: You can only access '/inventory.html' when you are logged in."
            );
    });

    it("cannot go to cart", () => {
        cy.get("@menuButton").click();
        cy.get("#logout_sidebar_link").click();

        cy.visit("https://www.saucedemo.com/cart.html", { failOnStatusCode: false });

        cy.get("[data-test='error']")
            .invoke("text")
            .should("eq", "Epic sadface: You can only access '/cart.html' when you are logged in.");
    });

    it("cannot go to checkout step one", () => {
        cy.get("@menuButton").click();
        cy.get("#logout_sidebar_link").click();

        cy.visit("https://www.saucedemo.com/checkout-step-one.html", { failOnStatusCode: false });

        cy.get("[data-test='error']")
            .invoke("text")
            .should(
                "eq",
                "Epic sadface: You can only access '/checkout-step-one.html' when you are logged in."
            );
    });

    it("cannot go to checkout step two", () => {
        cy.get("@menuButton").click();
        cy.get("#logout_sidebar_link").click();

        cy.visit("https://www.saucedemo.com/checkout-step-two.html", { failOnStatusCode: false });

        cy.get("[data-test='error']")
            .invoke("text")
            .should(
                "eq",
                "Epic sadface: You can only access '/checkout-step-two.html' when you are logged in."
            );
    });

    it("cannot go to checkout complete", () => {
        cy.get("@menuButton").click();
        cy.get("#logout_sidebar_link").click();

        cy.visit("https://www.saucedemo.com/checkout-complete.html", { failOnStatusCode: false });

        cy.get("[data-test='error']")
            .invoke("text")
            .should(
                "eq",
                "Epic sadface: You can only access '/checkout-complete.html' when you are logged in."
            );
    });
});
