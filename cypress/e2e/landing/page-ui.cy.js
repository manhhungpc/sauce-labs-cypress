describe("check UI landing page", () => {
    beforeEach(() => {
        cy.visit("https://www.saucedemo.com/");

        cy.get("[data-test='username']").type("standard_user");
        cy.get("[data-test='password']").type("secret_sauce");
        cy.get("[data-test='login-button']").click();
    });

    it("check title", () => {
        cy.get("title").invoke("text").should("eq", "Swag Labs");
    });

    it("menu has 4 button", () => {
        cy.get(".bm-item-list").as("itemList");
        cy.get("@itemList").children().should("have.length", "4");

        cy.get("@itemList").children().eq(0).invoke("text").should("eq", "All Items");

        cy.get("@itemList").then(($item) => {
            cy.wrap($item)
                .children()
                .eq(1)
                .invoke("attr", "href")
                .should("eq", "https://saucelabs.com/");
            cy.wrap($item).children().eq(1).invoke("text").should("eq", "About");
        });

        cy.get("@itemList").children().eq(2).invoke("text").should("eq", "Logout");

        cy.get("@itemList").children().eq(3).invoke("text").should("eq", "Reset App State");
    });

    it("has 4 option for sorting", () => {
        cy.get("select[data-test='product_sort_container']").children().as("productSort");

        cy.get("@productSort").eq(0).invoke("text").should("eq", "Name (A to Z)");
        cy.get("@productSort").eq(1).invoke("text").should("eq", "Name (Z to A)");
        cy.get("@productSort").eq(2).invoke("text").should("eq", "Price (low to high)");
        cy.get("@productSort").eq(3).invoke("text").should("eq", "Price (high to low)");
    });
});

describe("check products display", () => {
    beforeEach(() => {
        cy.visit("https://www.saucedemo.com/");

        cy.get("[data-test='username']").type("standard_user");
        cy.get("[data-test='password']").type("secret_sauce");
        cy.get("[data-test='login-button']").click();
    });

    it("check number of product", () => {
        cy.get(".inventory_list").children().should("have.length", "6");
        cy.get(".inventory_list").should("have.css", "flex");
    });

    it("check Sauce Labs Backpack product info", () => {
        cy.get(".inventory_list").children().eq(0).as("backpack");

        cy.get("@backpack")
            .find("img")
            .invoke("attr", "src")
            .should("eq", "/static/media/sauce-backpack-1200x1500.34e7aa42.jpg");

        //we want the price is 19.99, not 29.99
        cy.get("@backpack")
            .find(".inventory_item_price")
            .invoke("text")
            .should("contain", "$19.99");
    });

    it("check Sauce Labs Bike Light product info", () => {
        cy.get(".inventory_list").children().eq(1).as("bikelight");

        cy.get("@bikelight")
            .find("img")
            .invoke("attr", "src")
            .should("eq", "/static/media/bike-light-1200x1500.a0c9caae.jpg");

        cy.get("@bikelight")
            .find(".inventory_item_price")
            .invoke("text")
            .should("contain", "$9.99");
    });

    it("check Sauce Labs Bolt T-Shirt product info", () => {
        cy.get(".inventory_list").children().eq(2).as("boltTshirt");

        cy.get("@boltTshirt")
            .find("img")
            .invoke("attr", "src")
            .should("eq", "/static/media/bolt-shirt-1200x1500.c0dae290.jpg");

        cy.get("@boltTshirt")
            .find(".inventory_item_price")
            .invoke("text")
            .should("contain", "$15.99");
    });

    it("check Sauce Labs Fleece Jacket product info", () => {
        cy.get(".inventory_list").children().eq(3).as("jacket");

        cy.get("@jacket")
            .find("img")
            .invoke("attr", "src")
            .should("eq", "/static/media/sauce-pullover-1200x1500.439fc934.jpg");

        cy.get("@jacket").find(".inventory_item_price").invoke("text").should("contain", "$49.99");
    });

    it("check Sauce Labs Onesie product info", () => {
        cy.get(".inventory_list").children().eq(4).as("onesie");

        cy.get("@onesie")
            .find("img")
            .invoke("attr", "src")
            .should("eq", "/static/media/red-onesie-1200x1500.1b15e1fa.jpg");

        cy.get("@onesie").find(".inventory_item_price").invoke("text").should("contain", "$7.99");
    });

    it("check T-Shirt (Red) product info", () => {
        cy.get(".inventory_list").children().eq(5).as("onesie");

        cy.get("@onesie")
            .find("img")
            .invoke("attr", "src")
            .should("eq", "/static/media/red-tatt-1200x1500.e32b4ef9.jpg");

        cy.get("@onesie").find(".inventory_item_price").invoke("text").should("contain", "$15.99");
    });
});
