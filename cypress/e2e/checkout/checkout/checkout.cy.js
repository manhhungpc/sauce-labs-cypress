beforeEach(() => {
    cy.visit("https://www.saucedemo.com/");

    cy.get("[data-test='username']").type("standard_user");
    cy.get("[data-test='password']").type("secret_sauce");
    cy.get("[data-test='login-button']").click();
});

describe("Checkout step one", () => {
    beforeEach(() => {
        const items = [2, 0, 5];
        items.map((item) => {
            cy.get(".btn_inventory").eq(item).click();
        });
        cy.get(".shopping_cart_link").click();
        cy.get("[data-test='checkout']").click();

        cy.get("[data-test='firstName']").as("firstName");
        cy.get("[data-test='lastName']").as("lastName");
        cy.get("[data-test='postalCode']").as("postalCode");
        cy.get("[data-test='continue']").as("continue");
    });

    it("empty 3 field checkout", () => {
        cy.get("@continue").click();

        cy.get("[data-test='error']").invoke("text").should("eq", "Error: First Name is required");
    });

    it("first name and last name empty checkout", () => {
        cy.get("@postalCode").type("10000");
        cy.get("@continue").click();

        cy.get("[data-test='error']").invoke("text").should("eq", "Error: First Name is required");
    });

    it("first name empty checkout", () => {
        cy.get("@lastName").type("Manh Hung");
        cy.get("@postalCode").type("123455");
        cy.get("@continue").click();

        cy.get("[data-test='error']").invoke("text").should("eq", "Error: First Name is required");
    });

    it("last name and postal code empty checkout", () => {
        cy.get("@firstName").type("Pham");
        cy.get("@continue").click();

        cy.get("[data-test='error']").invoke("text").should("eq", "Error: Last Name is required");
    });

    it("last name empty checkout", () => {
        cy.get("@firstName").type("Pham");
        cy.get("@postalCode").type("123455");
        cy.get("@continue").click();

        cy.get("[data-test='error']").invoke("text").should("eq", "Error: Last Name is required");
    });

    it("postal code empty checkout", () => {
        cy.get("@firstName").type("Pham");
        cy.get("@lastName").type("Manh Hung");
        cy.get("@continue").click();

        cy.get("[data-test='error']").invoke("text").should("eq", "Error: Postal Code is required");
    });

    it("fill to all field", () => {
        cy.get("@firstName").type("Pham");
        cy.get("@lastName").type("Manh Hung");
        cy.get("@postalCode").type("10000");
        cy.get("@continue").click();

        cy.location("href").should("eq", "https://www.saucedemo.com/checkout-step-two.html");
    });
});

describe("Checkout step two", () => {
    beforeEach(() => {});

    it("checkout with 1 item", () => {
        cy.get(".btn_inventory").eq(2).click();
        cy.get(".shopping_cart_link").click();
        cy.get("[data-test='checkout']").click();

        cy.get("[data-test='firstName']").type("Pham");
        cy.get("[data-test='lastName']").type("Manh Hung");
        cy.get("[data-test='postalCode']").type("10000");

        cy.get("[data-test='continue']").click();
        cy.location("href").should("eq", "https://www.saucedemo.com/checkout-step-two.html");

        cy.get(".cart_list > .cart_item").should("have.length", "1");
        cy.get(".inventory_item_price").invoke("text").should("eq", "$15.99");
    });

    it.only("checkout with multiple item", () => {
        const items = [1, 0, 5];
        const priceItem = [9.99, 29.99, 15.99];
        items.map((item) => {
            cy.get(".btn_inventory").eq(item).click();
        });
        cy.get(".shopping_cart_link").click();
        cy.get("[data-test='checkout']").click();

        cy.get("[data-test='firstName']").type("Pham");
        cy.get("[data-test='lastName']").type("Manh Hung");
        cy.get("[data-test='postalCode']").type("10000");

        cy.get("[data-test='continue']").click();
        cy.location("href").should("eq", "https://www.saucedemo.com/checkout-step-two.html");

        cy.get(".cart_list > .cart_item").should("have.length", "3");
        let subPrice = 0;

        priceItem.forEach((price, i) => {
            cy.get(".inventory_item_price").eq(i).invoke("text").should("eq", `$${price}`);

            subPrice += parseFloat(price);
        });
        cy.get(".summary_info")
            .children()
            .eq(3)
            .invoke("text")
            .should("eq", "FREE PONY EXPRESS DELIVERY!");

        cy.get(".summary_subtotal_label").invoke("text").should("eq", `Item total: $${subPrice}`);

        const tax = (Math.round((8 / 100) * subPrice * 100) / 100).toFixed(2);
        const totalPrice = parseFloat(subPrice) + parseFloat(tax);
        cy.get(".summary_tax_label").invoke("text").should("eq", `Tax: $${tax}`);
        cy.get(".summary_total_label").invoke("text").should("eq", `Total: $${totalPrice}`);
    });
});
