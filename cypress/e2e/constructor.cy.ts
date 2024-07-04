import { App } from './app';
import { Constructor } from './constructor';
import {
  bunOneName,
  bunTwoName,
  bioPattyName,
  souceName,
  tabs
} from './constants';

describe('burger constructor functionality', () => {
  beforeEach(() => {
    App.visit();
  });

  describe('ingredients list should contain at leat a bun, a souce and an ingredient', () => {
    it('find an ingredient within the ingredients list', () => {
      Constructor.findItemWithinIngredientsList(bioPattyName)
        .should('have.length', 1)
        .should('contain.text', bioPattyName);
    });
    it('find a sauce within the ingredients list', () => {
      Constructor.findItemWithinIngredientsList(souceName)
        .should('have.length', 1)
        .should('contain.text', souceName);
    });
    it('find a bun within the ingredients list', () => {
      Constructor.findItemWithinIngredientsList(bunOneName)
        .should('have.length', 1)
        .should('contain.text', bunOneName);
    });
  });

  describe('should be possible perform the CRUD operations under the ingredients', () => {
    it('add an ingredient to the burger constructor', () => {
      Constructor.addItemToConstrucor(bioPattyName);
      Constructor.findItemWithinConstructor(bioPattyName)
        .should('have.length', 1)
        .should('contain.text', bioPattyName);
    });

    it('add a sauce to the burger constructor', () => {
      Constructor.addItemToConstrucor(souceName);
      Constructor.findItemWithinConstructor(souceName)
        .should('have.length', 1)
        .should('contain.text', souceName);
    });

    it('add a bun to the burger constructor', () => {
      Constructor.addItemToConstrucor(bunOneName);
      Constructor.findBunsWithinConstructor()
        .should('have.length', 2)
        .should('contain.text', bunOneName);
    });

    it('replase one bun with another within the burger constructor', () => {
      Constructor.addItemToConstrucor(bunOneName);
      Constructor.addItemToConstrucor(bunTwoName);
      Constructor.findItemsWithinConstructor(bunOneName).should('be.empty');
      Constructor.findItemsWithinConstructor(bunTwoName).should(
        'have.length',
        2
      );
    });

    it('add a few ingredients of one type to the burger constructor', () => {
      Constructor.addItemToConstrucor(bioPattyName);
      Constructor.addItemToConstrucor(bioPattyName);
      Constructor.findItemsWithinConstructor(bioPattyName).should(
        'have.length',
        2
      );
      Constructor.findItemCountWithinIngredientsList(bioPattyName).contains(2);
    });

    it('delete an ingredient from the burger constructor', () => {
      Constructor.addItemToConstrucor(bioPattyName);
      Constructor.removeItemFromConstrucor(bioPattyName);
      Constructor.findItemsWithinConstructor(bioPattyName).should('be.empty');
    });
  });

  describe('autoscroll to the group of ingredients should bring them to the viewport', () => {
    const ingredients = [bunOneName, bioPattyName, souceName];

    Cypress._.each(tabs, (tab) => {
      it(`Invoke autoscroll to the group "${tab.name}"`, () => {
        cy.get(`[data-cy="ingredients-list-tabs"] > div:nth-child(${tab.id})`)
          .then((el) => {
            const classList = Array.from(el[0].classList);
            classList.includes('tab_type_current');
          })
          .click()
          .then(() => {
            cy.isInViewport(
              `[data-cy="ingredients-list-${ingredients[tab.id - 1]}"]`
            );
          });
      });
    });
  });
});
