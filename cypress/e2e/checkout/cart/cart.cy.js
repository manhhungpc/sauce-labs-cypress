beforeEach(() => {
    cy.visit("https://www.saucedemo.com/");

    cy.get("[data-test='username']").type("standard_user");
    cy.get("[data-test='password']").type("secret_sauce");
    cy.get("[data-test='login-button']").click();

    //cy.get(".shopping_cart_badge").as("cartBadge");
    cy.get(".shopping_cart_link").as("cartLink");
});
describe("add items to cart", () => {
    it("add 1 item to cart", () => {
        const randomItem = Math.round(Math.random() * 5);
        cy.get(".btn_inventory").eq(randomItem).click();

        cy.get(".shopping_cart_badge").invoke("text").should("eq", "1");
        cy.get("@cartLink").click();

        cy.get(".cart_list > .cart_item").should("have.length", "1");
        cy.get(".cart_list > .cart_item")
            .children()
            .get(".cart_quantity")
            .invoke("text")
            .should("eq", "1");
    });

    it("add multiple item to cart", () => {
        const items = [2, 0, 5, 3];
        items.map((item) => {
            cy.get(".btn_inventory").eq(item).click();
        });

        cy.get(".shopping_cart_badge").invoke("text").should("eq", "4");
        cy.get("@cartLink").click();
        cy.get(".cart_list > .cart_item").its("length").should("eq", 4);
    });

    it("remove 1 item from cart", () => {
        const items = [2, 0, 5, 3];
        items.map((item) => {
            cy.get(".btn_inventory").eq(item).click();
        });

        cy.get(".shopping_cart_badge").invoke("text").should("eq", "4");
        cy.get("@cartLink").click();
        cy.get(".cart_list > .cart_item").its("length").should("eq", 4);

        cy.get("#remove-sauce-labs-bolt-t-shirt").click();
        cy.get(".cart_list > .cart_item").its("length").should("eq", 3);
    });

    it("remove multiple item from cart", () => {
        const items = [2, 0, 5, 3];
        items.map((item) => {
            cy.get(".btn_inventory").eq(item).click();
        });

        cy.get(".shopping_cart_badge").invoke("text").should("eq", "4");
        cy.get("@cartLink").click();
        cy.get(".cart_list > .cart_item").its("length").should("eq", 4);

        cy.get(".cart_button").contains("Remove").as("removeButton");

        for (let i = 0; i < 3; i++) {
            cy.get("@removeButton").click();
        }
        cy.get(".cart_list > .cart_item").its("length").should("eq", 1);
    });

    it("go back to inventory and add 1 item", () => {
        const items = [2, 0];
        const extraItem = 5;
        items.map((item) => {
            cy.get(".btn_inventory").eq(item).click();
        });

        cy.get(".shopping_cart_badge").invoke("text").should("eq", "2");
        cy.get("@cartLink").click();
        cy.get(".cart_list > .cart_item").its("length").should("eq", 2);

        cy.get("#continue-shopping").click();
        cy.location("href").should("eq", "https://www.saucedemo.com/inventory.html");

        cy.get(".btn_inventory").eq(extraItem).click();
        cy.get(".shopping_cart_badge").invoke("text").should("eq", "3");
        cy.get("@cartLink").click();
        cy.get(".cart_list > .cart_item").its("length").should("eq", 3);
    });

    it("go back to inventory and add multiple item", () => {
        const item = 2;
        const extraItem = [5, 0, 3];

        cy.get(".btn_inventory").eq(item).click();

        cy.get(".shopping_cart_badge").invoke("text").should("eq", "1");
        cy.get("@cartLink").click();
        cy.get(".cart_list > .cart_item").its("length").should("eq", 1);

        cy.get("#continue-shopping").click();
        cy.location("href").should("eq", "https://www.saucedemo.com/inventory.html");

        extraItem.map((item) => {
            cy.get(".btn_inventory").eq(item).click();
        });
        cy.get(".shopping_cart_badge").invoke("text").should("eq", "4");
        cy.get("@cartLink").click();
        cy.get(".cart_list > .cart_item").its("length").should("eq", 4);
    });

    it("go back to inventory and remove 1 item", () => {
        const items = [2, 0, 5, 3];
        const removeItem = 5;
        items.map((item) => {
            cy.get(".btn_inventory").eq(item).click();
        });

        cy.get(".shopping_cart_badge").invoke("text").should("eq", "4");
        cy.get("@cartLink").click();
        cy.get(".cart_list > .cart_item").its("length").should("eq", 4);

        cy.get("#continue-shopping").click();
        cy.location("href").should("eq", "https://www.saucedemo.com/inventory.html");

        cy.get(".btn_inventory").eq(removeItem).click();
        cy.get("@cartLink").click();
        cy.get(".cart_list > .cart_item").its("length").should("eq", 3);
    });

    it("go back to inventory and remove multiple item", () => {
        const items = [2, 0, 5, 3];
        const removeItem = [5, 2];
        items.map((item) => {
            cy.get(".btn_inventory").eq(item).click();
        });

        cy.get(".shopping_cart_badge").invoke("text").should("eq", "4");
        cy.get("@cartLink").click();
        cy.get(".cart_list > .cart_item").its("length").should("eq", 4);

        cy.get("#continue-shopping").click();
        cy.location("href").should("eq", "https://www.saucedemo.com/inventory.html");

        removeItem.map((item) => {
            cy.get(".btn_inventory").eq(item).click();
        });
        cy.get("@cartLink").click();
        cy.get(".cart_list > .cart_item").its("length").should("eq", 2);
    });
});
