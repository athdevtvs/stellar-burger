declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.dataCy('greeting')
     */
    isInViewport(value: string): Chainable<Element>;
    closeModalByButton(): Chainable<Element>;
    closeModalByOverlay(): Chainable<Element>;
    state(state: any): any;
  }

  /*declare global {
    namespace Cypress {
      interface Chainable {
        
      }
    }
  }*/
}
