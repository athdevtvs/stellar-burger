/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

/*Cypress.Commands.add('byTestId', { prevSubject: true }, (subject, id) => {
  if (subject) {
    return cy.wrap(subject).find(`[data-testid="${id}"]`);
  }
  return cy.get(`[data-testid="${id}"]`);
});*/

Cypress.Commands.add(
  'typeIfNotEmpty',
  { prevSubject: true },
  (subject, textToType) => {
    if (textToType) {
      cy.wrap(subject).type(textToType);
    }
    return subject; // allow further chaining
  }
);

Cypress.Commands.add(
  'ifExist',
  { prevSubject: true },
  (subject, textToType) => {
    if (textToType) {
      cy.wrap(subject).type(textToType);
    }
    return subject; // allow further chaining
  }
);

/*Cypress.Commands.add('dataCy', (value) => {
  return cy.get(`[data-cy=${value}]`);
});*/

Cypress.Commands.add('isNotInViewport', (element) => {
  cy.get(element).should(($el) => {
    const bottom = Cypress.$(cy.state('window')).height() as number;
    const rect = $el[0].getBoundingClientRect();

    expect(rect.top).to.be.greaterThan(bottom);
    expect(rect.bottom).to.be.greaterThan(bottom);
    //expect(rect.top).to.be.greaterThan(bottom);
    //expect(rect.bottom).to.be.greaterThan(bottom);
  });
});

Cypress.Commands.add('isInViewport', (element) => {
  cy.get(element).should(($el) => {
    const bottom = Cypress.$(cy.state('window')).height() as number;
    const rect = $el[0].getBoundingClientRect();

    expect(rect.top).not.to.be.greaterThan(bottom);
    expect(rect.bottom).not.to.be.greaterThan(bottom);
    //expect(rect.top).not.to.be.greaterThan(bottom);
    //expect(rect.bottom).not.to.be.greaterThan(bottom);
  });
});

Cypress.Commands.add('isInViewport2', { prevSubject: true }, (subject) => {
  const bottom = Cypress.$(cy.state('window')).height() as number;
  const rect = subject[0].getBoundingClientRect();

  expect(rect.top).not.to.be.greaterThan(bottom);
  expect(rect.bottom).not.to.be.greaterThan(bottom);

  return subject;
});

/*Cypress.Commands.add(
  'hasEventListeners',
  { prevSubject: true },
  (subject, options) => {
    const selector = subject.selector;
    cy.hasEventListeners(selector, options);
  }
);*/

/*Cypress.Commands.add('hasEventListeners', (selector, options = {}) => {
  cy.get(selector, { log: false });
});*/
