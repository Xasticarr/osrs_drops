"use strict";

import { Item } from "../models/Item.js";
import { DropTable } from "../models/DropTable.js";

// === Sub Tables ===

const gemTable = new DropTable("Gem table", [
  new Item("Nothing", 1, 1 / 2.032),
  new Item("Uncut sapphire", 1, 1 / 4),
  new Item("Uncut emerald", 1, 1 / 8),
  new Item("Uncut ruby", 1, 1 / 16),
  new Item("Chaos talisman", 1, 1 / 42.67),
  new Item("Nature talisman", 1, 1 / 42.67),
  new Item("Uncut diamond", 1, 1 / 64),
  new Item("Rune javelin", 1, 1 / 128),
  new Item("Loop half of key", 1, 1 / 128),
  new Item("Tooth half of key", 1, 1 / 128),
  new Item("Mega Rare table", 1, 1 / 128, { type: "table" }),
]);

const megaRareTable = new DropTable("Mega Rare table", [
  new Item("Nothing (Mega Rare)", 1, 1 / 1.133),
  new Item("Rune spear", 1, 1 / 16),
  new Item("Shield left half", 1, 1 / 32),
  new Item("Dragon spear", 1, 1 / 42.67),
]);

// === Main Tables ===

const rareAmmo = new DropTable("rare ammo", [
  new Item("Nature rune", 67, 1 / 42.67),
  new Item("Adamant javelin", 20, 1 / 64),
  new Item("Death rune", 45, 1 / 64),
  new Item("Law rune", 45, 1 / 64),
  new Item("Rune arrow", 42, 1 / 64),
  new Item("Steel arrow", 150, 1 / 64),
]);

const rareEquipment = new DropTable("rare equipment", [
  new Item("Rune 2h sword", 1, 1 / 42.67),
  new Item("Rune battleaxe", 1, 1 / 42.67),
  new Item("Rune sq shield", 1, 1 / 64),
  new Item("Dragon med helm", 1, 1 / 128),
  new Item("Rune kiteshield", 1, 1 / 128),
]);

const rareOther = new DropTable("rare other", [
  new Item("Coins", 3000, 1 / 6.095),
  new Item("Loop half of key", 1, 1 / 6.4),
  new Item("Tooth half of key", 1, 1 / 6.4),
  new Item("Runite bar", 1, 1 / 25.6),
  new Item("Dragonstone", 1, 1 / 64),
  new Item("Silver ore (noted)", 100, 1 / 64),
]);

const subTables = new DropTable("sub-tables", [
  new Item("Gem table", 1, 1 / 6.4, { type: "table" }),
  new Item("Mega Rare table", 1, 1 / 8.533, { type: "table" }),
]);

export const RareDropTable = {
  "rare ammo": rareAmmo,
  "rare equipment": rareEquipment,
  "rare other": rareOther,
  "sub-tables": subTables,
  "Gem table": gemTable,
  "Mega Rare table": megaRareTable,
};
