"use strict";

export class Raid {
  constructor(name, config = {}) {
    this.name = name;
    this.key = config.key || name;
    this.dropFunction = config.dropFunction || null;
    this.doubleRoll = config.doubleRoll || false;
    this.tripleRoll = config.tripleRoll || false;
    this.dropTables = config.dropTables || {};
    this.tertiaryDrops = config.tertiaryDrops || [];
    this.preRoll = config.preRoll || null;
    this.uMod = config.uMod || 0;
    this.uniqueChanceNormal = config.uniqueChanceNormal ?? 0;
    this.uniqueChanceHard = config.uniqueChanceHard ?? 0;
    this.uniqueChance = config.uniqueChance ?? 0;
    // this.divisor = config.divisor ?? 0;
  }
}
