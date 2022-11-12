beforeEach(() => {
    cy.visit("https://www.saucedemo.com/");

    cy.get("[data-test='username']").type("standard_user");
    cy.get("[data-test='password']").type("secret_sauce");
    cy.get("[data-test='login-button']").click();
});
describe("check Sauce Labs Backpack flows", () => {
    // Sauce Labs Backpack
    it("Info page of Sauce Labs Backpack", () => {
        cy.get(".inventory_list").children().eq(0).as("backpack");

        cy.get("@backpack").find(".inventory_item_label > a").click();
        cy.location("href").should("eq", "https://www.saucedemo.com/inventory-item.html?id=4");
        cy.get(".inventory_details_name").invoke("text").should("eq", "Sauce Labs Backpack");

        cy.get("#add-to-cart-sauce-labs-backpack").click();
        cy.get(".shopping_cart_link").children().should("have.length", "1");
    });

    it("Add Sauce Labs Backpack to cart", () => {
        cy.get(".inventory_list").children().eq(0).as("backpack");

        cy.get("@backpack").find("[data-test='add-to-cart-sauce-labs-backpack']").click();
        cy.get(".shopping_cart_link").children().should("have.length", "1");
    });
});

describe("check Sauce Labs Bike Light flows", () => {
    it("Info page of Sauce Labs Bike Light", () => {
        cy.get(".inventory_list").children().eq(1).as("bikelight");

        cy.get("@bikelight").find(".inventory_item_label > a").click();
        cy.location("href").should("eq", "https://www.saucedemo.com/inventory-item.html?id=0");
        cy.get(".inventory_details_name ").invoke("text").should("eq", "Sauce Labs Bike Light");

        cy.get("#add-to-cart-sauce-labs-bike-light").click();
        cy.get(".shopping_cart_link").children().should("have.length", "1");
    });

    it("Add Sauce Labs Bike Light to cart", () => {
        cy.get(".inventory_list").children().eq(1).as("bikelight");

        cy.get("@bikelight").find("[data-test='add-to-cart-sauce-labs-bike-light']").click();
        cy.get(".shopping_cart_link").children().should("have.length", "1");
    });
});

describe("check Labs Bolt T-Shirt flows", () => {
    it("Info page of Sauce Labs Bolt T-Shirt", () => {
        cy.get(".inventory_list").children().eq(2).as("boltTshirt");

        cy.get("@boltTshirt").find(".inventory_item_label > a").click();
        cy.location("href").should("eq", "https://www.saucedemo.com/inventory-item.html?id=1");
        cy.get(".inventory_details_name ").invoke("text").should("eq", "Sauce Labs Bolt T-Shirt");

        cy.get("#add-to-cart-sauce-labs-bolt-t-shirt").click();
        cy.get(".shopping_cart_link").children().should("have.length", "1");
    });

    it("Add Sauce Labs Bolt T-Shirt to cart", () => {
        cy.get(".inventory_list").children().eq(2).as("boltTshirt");

        cy.get("@boltTshirt").find("[data-test='add-to-cart-sauce-labs-bolt-t-shirt']").click();
        cy.get(".shopping_cart_link").children().should("have.length", "1");
    });
});

describe("check Sauce Labs Onesie flows", () => {
    it("Info page of Sauce Labs Fleece Jacket", () => {
        cy.get(".inventory_list").children().eq(3).as("jacket");

        cy.get("@jacket").find(".inventory_item_label > a").click();
        cy.location("href").should("eq", "https://www.saucedemo.com/inventory-item.html?id=5");
        cy.get(".inventory_details_name ").invoke("text").should("eq", "Sauce Labs Fleece Jacket");

        cy.get("#add-to-cart-sauce-labs-fleece-jacket").click();
        cy.get(".shopping_cart_link").children().should("have.length", "1");
    });

    it("Add Sauce Labs Fleece Jacket to cart", () => {
        cy.get(".inventory_list").children().eq(3).as("jacket");

        cy.get("@jacket").find("[data-test='add-to-cart-sauce-labs-fleece-jacket']").click();
        cy.get(".shopping_cart_link").children().should("have.length", "1");
    });
});

describe("check Sauce Labs Onesie flows", () => {
    it("Info page of Sauce Labs Onesie", () => {
        cy.get(".inventory_list").children().eq(4).as("jacket");

        cy.get("@jacket").find(".inventory_item_label > a").click();
        cy.location("href").should("eq", "https://www.saucedemo.com/inventory-item.html?id=2");
        cy.get(".inventory_details_name ").invoke("text").should("eq", "Sauce Labs Onesie");

        cy.get("#add-to-cart-sauce-labs-onesie").click();
        cy.get(".shopping_cart_link").children().should("have.length", "1");
    });

    it("Add Sauce Labs Onesie to cart", () => {
        cy.get(".inventory_list").children().eq(4).as("jacket");

        cy.get("@jacket").find("[data-test='add-to-cart-sauce-labs-onesie']").click();
        cy.get(".shopping_cart_link").children().should("have.length", "1");
    });
});

describe("check T-shirt (Red) flows", () => {
    it("Info page of T-shirt (Red)", () => {
        cy.get(".inventory_list").children().eq(5).as("tshirt");

        cy.get("@tshirt").find(".inventory_item_label > a").click();
        cy.location("href").should("eq", "https://www.saucedemo.com/inventory-item.html?id=3");
        cy.get(".inventory_details_name ").invoke("text").should("eq", "T-Shirt (Red)");

        cy.get("#add-to-cart-test.allthethings()-t-shirt-(red)").click();
        cy.get(".shopping_cart_link").children().should("have.length", "1");
    });

    it("Add Sauce Labs Onesie to cart", () => {
        cy.get(".inventory_list").children().eq(5).as("tshirt");

        cy.get("@tshirt")
            .find("[data-test='add-to-cart-test.allthethings()-t-shirt-(red)']")
            .click();
        cy.get(".shopping_cart_link").children().should("have.length", "1");
    });
});
