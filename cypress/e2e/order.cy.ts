import { App } from './app';
import { Constructor } from './constructor';
import tokens from '../fixtures/tokens.json';
import order from '../fixtures/order.json';
import { setCookie, deleteCookie } from '../../src/utils/cookie';
import {
  bunOneName,
  bioPattyName,
  crispyMineralRingsName,
  souceName
} from './constants';

describe('Modal window functionality', () => {
  before(() => {
    App.visit();
    localStorage.setItem('refreshToken', JSON.stringify(tokens.refreshToken));
    setCookie('accessToken', JSON.stringify(tokens.accessToken));
    cy.intercept('GET', '**/api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', '**/api/orders', { fixture: 'order.json' });
  });

  it('should place an order', () => {
    Constructor.addItemToConstrucor(bunOneName);
    Constructor.addItemToConstrucor(bioPattyName);
    Constructor.addItemToConstrucor(crispyMineralRingsName);
    Constructor.addItemToConstrucor(souceName);
    Constructor.findSubmitOrderButton().contains('Оформить заказ').click();

    App.findModal()
      .should('exist')
      .should('contain.text', 'Ваш заказ начали готовить')
      .find('[data-cy=order-id]')
      .should('have.text', JSON.stringify(order.order.number));

    App.findModal().closeModalByButton().should('not.exist');
    Constructor.findItemsWithinConstructor().should('be.empty');
  });

  after(() => {
    localStorage.clear();
    deleteCookie('accessToken');
  });
});
