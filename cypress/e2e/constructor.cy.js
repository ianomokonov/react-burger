const ingredientsSelector = "[data-test=ingredients]";
const bunDropSelector = '[data-test="bun-drop"]';
const mainDropSelector = '[data-test="main-drop"]';
const modalSelector = '[data-test="modal"]';
const mainIngredientSelector = "[data-ingredient=main]";

describe("burger constructor", function () {
  beforeEach(() => {
    cy.intercept("GET", "api/ingredients", { fixture: "ingredients.json" });
    cy.intercept("POST", "api/orders", { fixture: "order.json" });
    window.sessionStorage.setItem("COSMO_TOKEN", "test_token");
    cy.visit("/");
  });
  it("should select buns", function () {
    cy.get(ingredientsSelector)
      .find("[data-ingredient=bun]")
      .first()
      .trigger("dragstart");

    cy.get(bunDropSelector).first().trigger("drop");
    cy.get(bunDropSelector)
      .first()
      .contains("Выберите булку")
      .should("not.exist");
  });

  it("should not select not buns to buns", function () {
    cy.get(ingredientsSelector)
      .find(mainIngredientSelector)
      .first()
      .trigger("dragstart");

    cy.get(bunDropSelector).first().trigger("drop");
    cy.get(bunDropSelector).first().contains("Выберите булку");
  });

  it("should select main", function () {
    cy.get(ingredientsSelector)
      .find(mainIngredientSelector)
      .first()
      .trigger("dragstart");

    cy.get(mainDropSelector).first().trigger("drop");
    cy.get(mainDropSelector)
      .first()
      .contains("Добавьте ингредиенты")
      .should("not.exist");
  });

  it("should not select bun to main", function () {
    cy.get(ingredientsSelector)
      .find("[data-ingredient=bun]")
      .first()
      .trigger("dragstart");

    cy.get(mainDropSelector).first().trigger("drop");
    cy.get(mainDropSelector).first().contains("Добавьте ингредиенты");
  });

  it("should create burger and make order", function () {
    cy.get(ingredientsSelector)
      .find("[data-ingredient=bun]")
      .first()
      .trigger("dragstart");

    cy.get(bunDropSelector).first().trigger("drop");
    cy.contains("Выберите булку").should("not.exist");

    cy.get(ingredientsSelector)
      .find(mainIngredientSelector)
      .first()
      .trigger("dragstart");

    cy.get(mainDropSelector).first().trigger("drop");
    cy.get(mainDropSelector)
      .first()
      .contains("Добавьте ингредиенты")
      .should("not.exist");

    cy.get("button").first().click();
    cy.get(modalSelector).first().contains("7163").should("exist");
  });
});

describe("ingredient modal", () => {
  beforeEach(() => {
    cy.intercept("GET", "api/ingredients", { fixture: "ingredients.json" });
    cy.visit("/");
  });
  it("should open modal", function () {
    cy.get(ingredientsSelector).find(mainIngredientSelector).first().click();

    cy.get(modalSelector)
      .first()
      .contains("Детали ингредиента")
      .should("exist");
  });

  it("should close modal by btn", function () {
    cy.get(ingredientsSelector).find(mainIngredientSelector).first().click();

    cy.get(modalSelector)
      .first()
      .contains("Детали ингредиента")
      .should("exist");

    cy.get(`${modalSelector} [data-test="close-btn"] svg`).first().click();

    cy.get(modalSelector).should("not.exist");
  });

  it("should close modal by overlay", function () {
    cy.get(ingredientsSelector).find(mainIngredientSelector).first().click();

    cy.get(modalSelector)
      .first()
      .contains("Детали ингредиента")
      .should("exist");

    cy.get('[data-test="modal-overlay"]').first().click({ force: true });

    cy.get(modalSelector).should("not.exist");
  });
});
