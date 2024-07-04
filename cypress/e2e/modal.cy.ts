import { App } from './app';
import { bunOneName } from './constants';

describe('Modal window functionality', () => {
  beforeEach(() => {
    App.visit();
    cy.get(`[data-cy="ingredients-list-${bunOneName}"]`).click();
  });

  it('open dialog', () => {
    App.findModal().should('exist').should('contain.text', bunOneName);
  });

  it('close dialog by click on X button', () => {
    App.findModal().should('exist').find('[data-cy=close-button]').click();
    cy.get('[data-cy="modal"]').should('not.exist');
  });

  it('close dialog by click on overlay', () => {
    App.findModal().should('exist');
    cy.get('body').click(0, 0);
    App.findModal().should('not.exist');
  });
});
