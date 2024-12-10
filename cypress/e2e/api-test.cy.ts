describe("Basic Cypress Test", () => {
    it("should visit the Dummy JSON API homepage", () => {
      cy.visit("https://dummyjson.com");
      cy.url().should("include", "dummyjson");
    });
  });
  