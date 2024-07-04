export class App {
  static visit() {
    //cy.clearCookies();
    //cy.clearLocalStorage();
    cy.visit('/');
    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');
    cy.wait('@getIngredients');
    cy.viewport(1400, 640); //чтобы ингредиенты не все во viewport попадали
  }

  static findModal() {
    return cy.get(`[data-cy=modal]`);
  }
}
