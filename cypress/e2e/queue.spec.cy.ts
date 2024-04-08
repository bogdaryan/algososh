import {
  CIRCLE_LETTER,
  CIRCLE_INDEX,
  CIRCLE_HEAD,
  CIRCLE_TAIL,
  CIRCLE_CIRCLE,
} from "../constants";
import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";

describe('Страница "Очередь"', () => {
  beforeEach(() => {
    cy.visit("/queue");
  });

  it('кнопка "Добавить" недосупна если в инпуте пусто', () => {
    cy.get("input").should("have.text", "");
    cy.get("button")
      .contains("Добавить")
      .parent()
      .as("addBtn")
      .should("be.disabled");
    cy.get("input").type("1");
    cy.get("@addBtn").should("be.enabled");
    cy.get("input").type("{backspace}");
    cy.get("@addBtn").should("be.disabled");
  });

  it("элементы добавляются корректно", () => {
    cy.clock();
    cy.get("li")
      .as("elements")
      .should("have.length", "7")
      .each(($el, idx) => {
        cy.wrap($el).within(() => {
          cy.get(CIRCLE_LETTER).should("not.have.text");
          cy.get(CIRCLE_HEAD).should("not.have.text");
          cy.get(CIRCLE_INDEX).should("have.text", `${idx}`);
          cy.get(CIRCLE_TAIL).should("not.have.text");
        });
      });

    cy.get("input").type("55");
    cy.get("button").contains("Добавить").parent().as("addBtn").click();

    cy.get("@elements").each(($el, idx) => {
      if (idx === 0) {
        cy.wrap($el).within(() => {
          cy.get(CIRCLE_LETTER).should("have.text", "55");
          cy.get(CIRCLE_HEAD).should("have.text", "head");
          cy.get(CIRCLE_TAIL).should("have.text", "tail");
          cy.get(CIRCLE_CIRCLE).should(
            "have.css",
            "border",
            "4px solid rgb(210, 82, 225)"
          );
        });
        cy.tick(SHORT_DELAY_IN_MS);

        cy.wrap($el).within(() => {
          cy.get(CIRCLE_CIRCLE).should(
            "have.css",
            "border",
            "4px solid rgb(0, 50, 255)"
          );
        });
      }
    });
    cy.get("input").type("3");
    cy.get("@addBtn").click();
    cy.get("@elements").each(($el, idx) => {
      if (idx === 0 || idx === 1) {
        cy.wrap($el).within(() => {
          if (idx === 0) {
            cy.get(CIRCLE_HEAD).should("have.text", "head");
            cy.get(CIRCLE_TAIL).should("not.have.text");
          }
          if (idx === 1) {
            cy.get(CIRCLE_HEAD).should("not.have.text");
            cy.get(CIRCLE_TAIL).should("have.text", "tail");
          }
        });
      }
    });
  });

  it("элементы удаляются корректно", () => {
    cy.clock();
    cy.get("button")
      .contains("Удалить")
      .parent()
      .as("delBtn")
      .should("be.disabled");
    cy.get("input").type("3");
    cy.get("button").contains("Добавить").parent().as("addBtn").click();
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get("input").type("4");
    cy.get("@addBtn").click();
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get("@delBtn").click();

    cy.get("li").as("list");

    cy.get("@list").first().as("firstEl");

    cy.get("@firstEl").within(() => {
      cy.get(CIRCLE_LETTER).should("have.text", "3");
      cy.get(CIRCLE_HEAD).should("have.text", "head");
      cy.get(CIRCLE_CIRCLE).should(
        "have.css",
        "border",
        "4px solid rgb(210, 82, 225)"
      );
    });

    cy.get("@firstEl")
      .next()
      .as("secondEl")
      .within(() => {
        cy.get(CIRCLE_HEAD).should("not.have.text");
      });

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get("@firstEl").within(() => {
      cy.get(CIRCLE_HEAD).should("not.have.text");
      cy.get(CIRCLE_LETTER).should("not.have.text");
      cy.get(CIRCLE_CIRCLE).should(
        "have.css",
        "border",
        "4px solid rgb(0, 50, 255)"
      );
    });

    cy.get("@secondEl").within(() => {
      cy.get(CIRCLE_HEAD).should("have.text", "head");
    });
  });

  it('поведение кнопки "Очистить" корректно', () => {
    cy.clock();
    cy.get("button")
      .contains("Очистить")
      .parent()
      .as("clearBtn")
      .should("be.disabled");
    cy.get("input").type("1");
    cy.get("button").contains("Добавить").parent().as("addBtn").click();
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get("input").type("2");
    cy.get("@addBtn").click();
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get("input").type("3");
    cy.get("@addBtn").click();
    cy.tick(SHORT_DELAY_IN_MS);

    cy.get("@clearBtn").should("be.enabled").click();
    cy.get("li").each(($el, idx) => {
      cy.wrap($el).within(() => {
        cy.get(CIRCLE_HEAD).should("not.have.text");
        cy.get(CIRCLE_LETTER).should("not.have.text");
        cy.get(CIRCLE_TAIL).should("not.have.text");
        cy.get(CIRCLE_INDEX).should("have.text", `${idx}`);
      });
    });
  });
});
