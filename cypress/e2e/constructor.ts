export class Constructor {
  static findItemWithinIngredientsList(itemName: string) {
    return cy.get(`[data-cy="ingredients-list-${itemName}"]`);
  }

  static addItemToConstrucor(itemName: string) {
    cy.get(`[data-cy="ingredients-list-${itemName}"]`)
      .contains('Добавить')
      .click();
  }

  static removeItemFromConstrucor(itemName: string) {
    cy.get(
      `[data-cy="constructor-item-${itemName}"] .constructor-element__action`
    ).click();
  }

  static findItemCountWithinIngredientsList(itemName: string) {
    return cy.get(`[data-cy="ingredients-list-${itemName}"] .counter`);
  }

  static findItemWithinConstructor(itemName: string) {
    return cy.get(`[data-cy="constructor-item-${itemName}"]`);
  }

  static findBunsWithinConstructor() {
    return cy.get('[data-cy="constructor-item-bun"]');
  }

  static findItemsWithinConstructor(itemName: string) {
    const constructorItemsSelector =
      '*[data-cy^="constructor-item-"] .constructor-element__text';

    return cy
      .get('[data-cy="constructor"]')
      .then((item) =>
        item.find(constructorItemsSelector).length > 0
          ? cy
              .get(constructorItemsSelector)
              .then((item) =>
                Array.from(item).filter((item) =>
                  item.innerText.includes(`${itemName}`)
                )
              )
          : []
      );
  }

  //static find;
  static findTrashOfItemWithinConstructor(itemName: string) {}
}
