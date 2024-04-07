import {
  CIRCLE_HEAD,
  CIRCLE_INDEX,
  CIRCLE_LETTER,
  CIRCLE_TAIL,
} from "../constants";
import { DELAY_IN_MS } from "../../src/constants/delays";

describe('Страница "Список"', () => {
  beforeEach(() => {
    cy.visit("/list");
  });

  it(
    "должен отрисоваться дефолтный список",
    { env: { firstVal: "4", secondVal: "1", thirdVal: "3", fourthVal: "8" } },
    () => {
      cy.get("li").each(($el, idx) => {
        cy.wrap($el).within(() => {
          if (idx === 0) {
            cy.get(CIRCLE_HEAD).should("have.text", "head");
            cy.get(CIRCLE_LETTER).should(
              "have.text",
              `${Cypress.env("firstVal")}`
            );
            cy.get(CIRCLE_INDEX).should("have.text", `${idx}`);
            cy.get(CIRCLE_TAIL).should("be.empty");
          }
          if (idx === 1) {
            cy.get(CIRCLE_HEAD).should("be.empty");
            cy.get(CIRCLE_LETTER).should(
              "have.text",
              `${Cypress.env("secondVal")}`
            );
            cy.get(CIRCLE_INDEX).should("have.text", `${idx}`);
            cy.get(CIRCLE_TAIL).should("be.empty");
          }
          if (idx === 2) {
            cy.get(CIRCLE_HEAD).should("be.empty");
            cy.get(CIRCLE_LETTER).should(
              "have.text",
              `${Cypress.env("thirdVal")}`
            );
            cy.get(CIRCLE_INDEX).should("have.text", `${idx}`);
            cy.get(CIRCLE_TAIL).should("be.empty");
          }
          if (idx === 3) {
            cy.get(CIRCLE_HEAD).should("be.empty");
            cy.get(CIRCLE_LETTER).should(
              "have.text",
              `${Cypress.env("fourthVal")}`
            );
            cy.get(CIRCLE_INDEX).should("have.text", `${idx}`);
            cy.get(CIRCLE_TAIL).should("have.text", "tail");
          }
        });
      });
      cy.get("li").should("have.length", "4");
    }
  );

  describe("кнопки добавления и удаления должны быть недоступны если соответствующие инпуты пусты", () => {
    it('кнопки "Добавить в head" и "Добавить в tail"', () => {
      cy.get('input[placeholder="Введите значение"]')
        .as("valueInput")
        .should("have.value", "");
      cy.get("button")
        .contains("Добавить в head")
        .parent()
        .as("addToHeadBtn")
        .should("be.disabled");
      cy.get("button")
        .contains("Добавить в tail")
        .parent()
        .as("addToTailBtn")
        .should("be.disabled");
      cy.get("@valueInput").type("3");
      cy.get("@addToHeadBtn").should("be.enabled");
      cy.get("@addToTailBtn").should("be.enabled");
      cy.get("@valueInput").type("{backspace}");
      cy.get("@addToHeadBtn").should("be.disabled");
      cy.get("@addToTailBtn").should("be.disabled");
    });

    it('кнопки "Добавить по индексу" и "Удалить по индексу"', () => {
      cy.get('input[placeholder="Введите значение"]')
        .as("valueInput")
        .should("have.value", "");
      cy.get('input[placeholder="Введите индекс"]')
        .as("indexInput")
        .should("have.value", "");
      cy.get("button")
        .contains("Добавить по индексу")
        .parent()
        .as("addByIdxBtn")
        .should("be.disabled");
      cy.get("button")
        .contains("Удалить по индексу")
        .parent()
        .as("delByIdxBtn")
        .should("be.disabled");
      cy.get("@valueInput").type("3");
      cy.get("@addByIdxBtn").should("be.disabled");
      cy.get("@delByIdxBtn").should("be.disabled");
      cy.get("@indexInput").type("2");
      cy.get("@addByIdxBtn").should("be.enabled");
      cy.get("@delByIdxBtn").should("be.enabled");
      cy.get("@valueInput").type("{backspace}");
      cy.get("@addByIdxBtn").should("be.disabled");
      cy.get("@delByIdxBtn").should("be.enabled");
      cy.get("@indexInput").type("{backspace}");
      cy.get("@delByIdxBtn").should("be.disabled");
    });
  });

  describe("Добавление элементов работает корректно", () => {
    it(
      "добавление в head",
      { env: { insertedVal: "1", initLength: 4 } },
      () => {
        cy.clock();
        cy.get('input[placeholder="Введите значение"]').type(
          Cypress.env("insertedVal")
        );
        cy.get("button").contains("Добавить в head").parent().click();

        cy.tick(DELAY_IN_MS);

        cy.get("li").should("have.length", Cypress.env("initLength") + 1);

        cy.tick(DELAY_IN_MS);

        cy.get("li")
          .should("have.length", Cypress.env("initLength") + 1)
          .first()
          .as("firstEl")
          .within(() => {
            cy.get(CIRCLE_HEAD).should("have.text", "head");
            cy.get(CIRCLE_LETTER).should(
              "have.text",
              Cypress.env("insertedVal")
            );
          });

        cy.tick(DELAY_IN_MS);

        cy.get("@firstEl").within(() => {
          cy.get("[class*=circle_circle]").should(
            "have.css",
            "border",
            "4px solid rgb(0, 50, 255)"
          );
        });
      }
    );

    it(
      "добавление в tail",
      { env: { insertedVal: "1", initLength: 4 } },
      () => {
        cy.clock();
        cy.get('input[placeholder="Введите значение"]').type(
          Cypress.env("insertedVal")
        );
        cy.get("button").contains("Добавить в tail").parent().click();

        cy.tick(DELAY_IN_MS);

        cy.get("li").should("have.length", Cypress.env("initLength") + 1);

        cy.tick(DELAY_IN_MS);

        cy.get("li")
          .should("have.length", Cypress.env("initLength") + 1)
          .last()
          .as("lastEl")
          .within(() => {
            cy.get(CIRCLE_TAIL).should("have.text", "tail");
            cy.get(CIRCLE_LETTER).should(
              "have.text",
              Cypress.env("insertedVal")
            );
          });

        cy.tick(DELAY_IN_MS);

        cy.get("@lastEl").within(() => {
          cy.get("[class*=circle_circle]").should(
            "have.css",
            "border",
            "4px solid rgb(0, 50, 255)"
          );
        });
      }
    );

    it(
      "добавление по индексу",
      { env: { insertedVal: "1", insertedIdx: "2", initLength: 4 } },
      () => {
        cy.clock();
        cy.get("li")
          .as("list")
          .should("have.length", Cypress.env("initLength"));
        cy.get('input[placeholder="Введите значение"]').type(
          Cypress.env("insertedVal")
        );
        cy.get('input[placeholder="Введите индекс"]').type(
          Cypress.env("insertedIdx")
        );
        cy.get("button").contains("Добавить по индексу").parent().click();

        cy.tick(3000);

        cy.get("[class*=circle_content]")
          .eq(Cypress.env("insertedIdx"))
          .within(() => {
            cy.get(CIRCLE_LETTER).should(
              "have.text",
              Cypress.env("insertedVal")
            );
          });

        cy.tick(DELAY_IN_MS);
        cy.get("li").each(($el) => {
          cy.wrap($el)
            .find("[class*=circle_circle]")
            .should("have.css", "border", "4px solid rgb(0, 50, 255)");
        });
      }
    );
  });

  describe("Удаление элементов работает корректно", () => {
    it("удаление из head", { env: { initLength: 4 } }, () => {
      cy.clock();
      cy.get("li")
        .should("have.length", Cypress.env("initLength"))
        .first()
        .then(($firstEl) => {
          cy.wrap($firstEl)
            .find(CIRCLE_LETTER)
            .then(($firstElLetter) => {
              const firstElVal = $firstElLetter[0].textContent;
              cy.get("button").contains("Удалить из head").parent().click();
              cy.wrap($firstElLetter).should("not.have.text");
              cy.wrap($firstEl)
                .find(CIRCLE_TAIL)
                .find("[class*=circle_circle]")
                .should("have.css", "border", "4px solid rgb(210, 82, 225)")
                .find(CIRCLE_LETTER)
                .should("have.text", firstElVal);
            });
        });
      cy.tick(DELAY_IN_MS);
      cy.get("li").should("have.length", Cypress.env("initLength") - 1);
    });

    it("удаление из tail", { env: { initLength: 4 } }, () => {
      cy.clock();
      cy.get("li")
        .should("have.length", Cypress.env("initLength"))
        .last()
        .then(($lastEl) => {
          cy.wrap($lastEl)
            .find(CIRCLE_LETTER)
            .then(($lastElLetter) => {
              const lastElVal = $lastElLetter[0].textContent;
              cy.get("button").contains("Удалить из tail").parent().click();
              cy.wrap($lastElLetter).should("not.have.text");
              cy.wrap($lastEl)
                .find(CIRCLE_TAIL)
                .find("[class*=circle_circle]")
                .should("have.css", "border", "4px solid rgb(210, 82, 225)")
                .find(CIRCLE_LETTER)
                .should("have.text", lastElVal);
            });
        });
      cy.tick(DELAY_IN_MS);
      cy.get("li").should("have.length", Cypress.env("initLength") - 1);
    });

    it("удаление по индексу", { env: { initLength: 4, delIdx: "2" } }, () => {
      cy.clock();
      cy.get("li").as("list").should("have.length", Cypress.env("initLength"));
      cy.get('input[placeholder="Введите индекс"]').type(Cypress.env("delIdx"));
      cy.get("button").contains("Удалить по индексу").parent().click();

      cy.tick(2500);

      cy.get("@list").should("have.length", Cypress.env("initLength") - 1);
    });
  });
});
