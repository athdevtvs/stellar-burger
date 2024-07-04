import { constructor } from './constructor';
import data from '../fixtures/data.json';

const bunOneName = 'Краторная булка N-200i';
const bunTwoName = 'Флюоресцентная булка R2-D3';
const bioPattyName = 'Биокотлета из марсианской Магнолии';
const souceName = 'Соус традиционный галактический';
const bun = 'Булки';
const main = 'Начинки';
const souce = 'Соусы';

describe('burger constructor', () => {
  beforeEach(() => {
    constructor.visit();
  });

  describe('ingredients list should contain at leat a bun, a souce and an ingredient', () => {
    it('find an ingredient within the ingredients list', () => {
      constructor
        .findItemWithinIngredientsList(bioPattyName)
        .should('have.length', 1)
        .should('contain.text', bioPattyName);
    });
    it('find a sauce within the ingredients list', () => {
      constructor
        .findItemWithinIngredientsList(souceName)
        .should('have.length', 1)
        .should('contain.text', souceName);
    });
    it('find a bun within the ingredients list', () => {
      constructor
        .findItemWithinIngredientsList(bunOneName)
        .should('have.length', 1)
        .should('contain.text', bunOneName);
    });
  });

  describe('should be possible perform the CRUD operations under the ingredients', () => {
    it('add an ingredient to the burger constructor', () => {
      constructor.addItemToConstrucor(bioPattyName);
      constructor
        .findItemWithinConstructor(bioPattyName)
        .should('have.length', 1)
        .should('contain.text', bioPattyName);
    });

    it('add a sauce to the burger constructor', () => {
      constructor.addItemToConstrucor(souceName);
      constructor
        .findItemWithinConstructor(souceName)
        .should('have.length', 1)
        .should('contain.text', souceName);
    });

    it('add a bun to the burger constructor', () => {
      constructor.addItemToConstrucor(bunOneName);
      constructor
        .findBunsWithinConstructor()
        .should('have.length', 2)
        .should('contain.text', bunOneName);
    });

    it('replase one bun with another within the burger constructor', () => {
      constructor.addItemToConstrucor(bunOneName);
      constructor.addItemToConstrucor(bunTwoName);
      constructor.findItemsWithinConstructor(bunOneName).should('be.empty');
      constructor
        .findItemsWithinConstructor(bunTwoName)
        .should('have.length', 2);
    });

    it('add a few ingredients of one type to the burger constructor', () => {
      constructor.addItemToConstrucor(bioPattyName);
      constructor.addItemToConstrucor(bioPattyName);
      constructor
        .findItemsWithinConstructor(bioPattyName)
        .should('have.length', 2);
      constructor.findItemCountWithinIngredientsList(bioPattyName).contains(2);
    });

    it('delete an ingredient from the burger constructor', () => {
      constructor.addItemToConstrucor(bioPattyName);
      constructor.removeItemFromConstrucor(bioPattyName);
      constructor.findItemsWithinConstructor(bioPattyName).should('be.empty');
    });
  });

  describe('autoscroll to the group of ingredients should bring them to the viewport', () => {
    const ingredients = [bunOneName, bioPattyName, souceName];

    Cypress._.each(data.testCases, (testCase) => {
      it(`Invoke autoscroll to the group "${testCase.name}"`, () => {
        cy.get(
          `[data-cy="ingredients-list-tabs"] > div:nth-child(${testCase.id})`
        )
          .then((el) => {
            const classList = Array.from(el[0].classList);
            classList.includes('tab_type_current');
          })
          .click()
          .then(() => {
            cy.isInViewport(
              `[data-cy="ingredients-list-${ingredients[testCase.id - 1]}"]`
            );
          });
      });
    });
  });
});
