import { CIRCLE_INDEX, CIRCLE_LETTER } from "../constants";

import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";

describe('Страница "Последовательность Фибоначчи"', () => {
  beforeEach(() => {
    cy.visit("/fibonacci");
  });

  it('кнопка "Расчитать" недоступна, если в инпуте пусто', () => {
    cy.get("input").should("have.value", "");
    cy.get("button").last().as("calculateBtn");
    cy.get("@calculateBtn").should("be.disabled");
    cy.get("input").type("1");
    cy.get("input").should("have.value", "1");
    cy.get("@calculateBtn").should("be.enabled");

    cy.get("input").clear();
    cy.get("input").should("have.value", "");
    cy.get("@calculateBtn").should("be.disabled");
  });

  it("числа генерируются корректно", () => {
    cy.clock();
    cy.get("input").type("7");

    cy.get("button").last().click();

    cy.get("li")
      .should("have.length", "1")
      .each(($el, idx) => {
        if (idx === 0)
          cy.wrap($el).within(() => {
            cy.get(CIRCLE_LETTER).should("have.text", "0");
            cy.get(CIRCLE_INDEX).should("have.text", "0");
          });
      });

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get("li")
      .should("have.length", "2")
      .each(($el, idx) => {
        if (idx === 1)
          cy.wrap($el).within(() => {
            cy.get(CIRCLE_LETTER).should("have.text", "1");
            cy.get(CIRCLE_INDEX).should("have.text", "1");
          });
      });

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get("li")
      .should("have.length", "3")
      .each(($el, idx) => {
        if (idx === 2)
          cy.wrap($el).within(() => {
            cy.get(CIRCLE_LETTER).should("have.text", "1");
            cy.get(CIRCLE_INDEX).should("have.text", "2");
          });
      });

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get("li")
      .should("have.length", "4")
      .each(($el, idx) => {
        if (idx === 3)
          cy.wrap($el).within(() => {
            cy.get(CIRCLE_LETTER).should("have.text", "2");
            cy.get(CIRCLE_INDEX).should("have.text", "3");
          });
      });

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get("li")
      .should("have.length", "5")
      .each(($el, idx) => {
        if (idx === 4)
          cy.wrap($el).within(() => {
            cy.get(CIRCLE_LETTER).should("have.text", "3");
            cy.get(CIRCLE_INDEX).should("have.text", "4");
          });
      });

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get("li")
      .should("have.length", "6")
      .each(($el, idx) => {
        if (idx === 5)
          cy.wrap($el).within(() => {
            cy.get(CIRCLE_LETTER).should("have.text", "5");
            cy.get(CIRCLE_INDEX).should("have.text", "5");
          });
      });

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get("li")
      .should("have.length", "7")
      .each(($el, idx) => {
        if (idx === 6)
          cy.wrap($el).within(() => {
            cy.get(CIRCLE_LETTER).should("have.text", "8");
            cy.get(CIRCLE_INDEX).should("have.text", "6");
          });
      });

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get("button").contains("Рассчитать");
  });
});
