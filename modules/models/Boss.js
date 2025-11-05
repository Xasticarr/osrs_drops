"use strict";

export class Boss {
  constructor(name, config = {}) {
    this.name = name;
    this.doubleRoll = config.doubleRoll || false;
    this.tripleRoll = config.tripleRoll || false;
    this.rDT = config.rDT || false;
    this.rDTChance = config.rDTChance || 0;
    this.dropTables = config.dropTables || {};
    this.tertiaryDrops = config.tertiaryDrops || [];
    this.preRoll = config.preRoll || null;
  }
}
