describe("burger constructor", function () {
  beforeEach(() => {
    cy.intercept("GET", "api/ingredients", { fixture: "ingredients.json" });
    cy.intercept("POST", "api/orders", { fixture: "order.json" });
    window.sessionStorage.setItem("COSMO_TOKEN", "test_token");
    cy.visit("http://localhost:3000");
  });
  it("should select buns", function () {
    cy.get("[data-test=ingredients]")
      .find("[data-ingredient=bun]")
      .first()
      .trigger("dragstart");

    cy.get('[data-test="bun-drop"]').first().trigger("drop");
    cy.get('[data-test="bun-drop"]')
      .first()
      .contains("Выберите булку")
      .should("not.exist");
  });

  it("should not select not buns to buns", function () {
    cy.get("[data-test=ingredients]")
      .find("[data-ingredient=main]")
      .first()
      .trigger("dragstart");

    cy.get('[data-test="bun-drop"]').first().trigger("drop");
    cy.get('[data-test="bun-drop"]').first().contains("Выберите булку");
  });

  it("should select main", function () {
    cy.get("[data-test=ingredients]")
      .find("[data-ingredient=main]")
      .first()
      .trigger("dragstart");

    cy.get('[data-test="main-drop"]').first().trigger("drop");
    cy.get('[data-test="main-drop"]')
      .first()
      .contains("Добавьте ингредиенты")
      .should("not.exist");
  });

  it("should not select bun to main", function () {
    cy.get("[data-test=ingredients]")
      .find("[data-ingredient=bun]")
      .first()
      .trigger("dragstart");

    cy.get('[data-test="main-drop"]').first().trigger("drop");
    cy.get('[data-test="main-drop"]').first().contains("Добавьте ингредиенты");
  });

  it("should create burger and make order", function () {
    cy.get("[data-test=ingredients]")
      .find("[data-ingredient=bun]")
      .first()
      .trigger("dragstart");

    cy.get('[data-test="bun-drop"]').first().trigger("drop");
    cy.contains("Выберите булку").should("not.exist");

    cy.get("[data-test=ingredients]")
      .find("[data-ingredient=main]")
      .first()
      .trigger("dragstart");

    cy.get('[data-test="main-drop"]').first().trigger("drop");
    cy.get('[data-test="main-drop"]')
      .first()
      .contains("Добавьте ингредиенты")
      .should("not.exist");

    cy.get("button").first().click();
    cy.get('[data-test="modal"]').first().contains("7163").should("exist");
  });
});

describe("ingredient modal", () => {
  beforeEach(() => {
    cy.intercept("GET", "api/ingredients", { fixture: "ingredients.json" });

    cy.visit("http://localhost:3000");
  });
  it("should open modal", function () {
    cy.get("[data-test=ingredients]")
      .find("[data-ingredient=main]")
      .first()
      .click();

    cy.get('[data-test="modal"]')
      .first()
      .contains("Детали ингредиента")
      .should("exist");
  });

  it("should close modal by btn", function () {
    cy.get("[data-test=ingredients]")
      .find("[data-ingredient=main]")
      .first()
      .click();

    cy.get('[data-test="modal"]')
      .first()
      .contains("Детали ингредиента")
      .should("exist");

    cy.get('[data-test="modal"] [data-test="close-btn"] svg').first().click();

    cy.get('[data-test="modal"]').should("not.exist");
  });

  it("should close modal by overlay", function () {
    cy.get("[data-test=ingredients]")
      .find("[data-ingredient=main]")
      .first()
      .click();

    cy.get('[data-test="modal"]')
      .first()
      .contains("Детали ингредиента")
      .should("exist");

    cy.get('[data-test="modal-overlay"]').first().click({ force: true });

    cy.get('[data-test="modal"]').should("not.exist");
  });
});
