declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.dataCy('greeting')
     */
    dataCy(value: string): Chainable<Element>;
    byTestId(value: string): Chainable<Element>;
    typeIfNotEmpty(value: string): Chainable<Element>;
    ifExist(value: string): Chainable<Element>;
    isNotInViewport(value: string): Chainable<Element>;
    isInViewport(value: string): Chainable<Element>;
    isInViewport2(value: string): Chainable<Element>;
    //hasEventListeners(value: string): Chainable<Element>;

    state(state: any): any;
  }

  /*declare global {
    namespace Cypress {
      interface Chainable {
        
      }
    }
  }*/
}
