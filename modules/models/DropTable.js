"use strict";

export class DropTable {
  constructor(name, items = []) {
    this.name = name;
    this.items = items; //Array of Item instances
  }

  addItem(item) {
    this.items.push(item);
  }
}
