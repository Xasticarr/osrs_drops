"use strict";

export class Item {
  constructor(name, quantity, rarity = null, options = {}) {
    this.name = name;
    this.quantity = quantity;
    this.rarity = rarity;
    this.chime = options.chime || false;
    this.bigChime = options.bigChime || false;
    this.cLog = options.cLog || false;
    this.type = options.type || "standard"; //"standard". "pet", etc.
    this.exclusive = options.exclusive || false;
    this.group = options.group || null;
    this.rare = options.rare || false;
    this.megaRare = options.megaRare || false;
    this.divisor = options.divisor || 0;
  }
}
