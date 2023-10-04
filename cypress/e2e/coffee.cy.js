/// <reference types="cypress"/>

beforeEach(() => {
  //Change visit URL when releasing to students ("http://localhost:5500/index.html") 
  cy.visit("http://localhost:5500/coffee/coffee.html");
});

describe("Coffee tests", () => {
  it("Should have a header element", () => {
    cy.get("header").should("exist");
  });

  it("Should have a main element", () => {
    cy.get("main").should("exist");
  });

  it("Should have an h1 element", () => {
    cy.get("h1").should("exist");
  });

  it("Should have only one h1 element", () => {
    cy.get("h1").its("length").should("eq", 1);
  });

  it('Should have a script element inside head element with "defer" attribute', () => {
    cy.get("head script[defer]").should("exist");
  });

  it("Should have at least two divs with class coffee-item", () => {
    cy.get("div.coffee-item").should("have.length.at.least", 2);
  });

  it("Should have a data price attribute inside coffee item div", () => {
    cy.get("div.coffee-item").each(($item) => {
      cy.wrap($item).should("have.attr", "data-price");
    });
  });

  it("Should have add and subtract buttons inside coffee item div", () => {
    cy.get("div.coffee-item").each(($item) => {
      cy.wrap($item).find("button.add-button").should("exist");
      cy.wrap($item).find("button.subtract-button").should("exist");
    });
  });

  it("Should have coffee items with a starting quantity with value zero", () => {
    cy.get(".coffee-item").each(($item) => {
      cy.wrap($item).find(".quantity").should("have.text", 0);
    });
  });

  //add test for checking total amount existing
  it("Should have display total amount in total-section div", () => {
    cy.get('.total-section').find('#total-amount').should('exist')
  })

  //E2E tests

  it("Should display the correct quantity of added coffee items", () => {
    cy.get(".coffee-item").each(($item) => {
      cy.wrap($item)
        .find(".quantity")
        .as("quantity")
        .invoke("text")
        .then((quantValue) => {
          cy.wrap($item).find(".add-button").click().click();
          cy.get("@quantity").should("have.text", parseInt(quantValue) + 2);
        });
    });
  });

  it("Should display the correct quantity of coffee items after subtract button is clicked", () => {
    cy.get(".coffee-item").each(($item) => {
      cy.wrap($item)
        .find(".quantity")
        .as("quantity")
        .invoke("text")
        .then((quantValue) => {
          cy.wrap($item).find(".add-button").click().click();
          cy.wrap($item).find(".subtract-button").click();
          cy.get("@quantity").should("have.text", parseInt(quantValue) + 1);
        });
    });
  });

  it("Should display total cost of added and reduced coffee items", () => {
    let totalCost = 0;
    cy.get(".coffee-item")
      .each(($item) => {
        cy.wrap($item).find(".add-button").click().click();
        cy.wrap($item)
          .invoke("attr", "data-price")
          .then((price) => {
            totalCost += price * 2;
          });
        cy.wrap($item).find(".subtract-button").click();
        cy.wrap($item)
          .invoke("attr", "data-price")
          .then((price) => {
            totalCost -= price;
          });
      })
      .then(() => {
        cy.get("#total-amount").should("contain", totalCost);
      });
  });

  it("Should not be able to reduce coffee items below zero", () => {
    cy.get(".coffee-item").each(($item) => {
      cy.wrap($item).find(".subtract-button").click().click();
      cy.wrap($item).find(".quantity").should("have.text", 0);
    });
  });
});
