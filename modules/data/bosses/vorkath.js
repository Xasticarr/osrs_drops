"use strict";

import { Item } from "../../models/Item.js";
import { DropTable } from "../../models/DropTable.js";
import { Boss } from "../../models/Boss.js";
import { RareDropTable } from "../rareDropTable.js";

const always = new DropTable("always", [
  new Item("Superior dragon bones", 2),
  new Item("Blue dragonhide", 2),
]);

const equipment = new DropTable("equipment", [
  new Item("Rune longsword", [2, 3], 2 * (1 / 30)),
  new Item("Rune kiteshield", [2, 3], 2 * (1 / 30)),
  new Item("Battlestaff (noted)", [5, 15], 2 * (1 / 37.5)),
  new Item("Dragon battleaxe", 1, 2 * (1 / 75)),
  new Item("Dragon longsword", 1, 2 * (1 / 75)),
  new Item("Dragon platelegs", 1, 2 * (1 / 75)),
  new Item("Dragon plateskirt", 1, 2 * (1 / 75)),
]);

const runes = new DropTable("runes", [
  new Item("Chaos rune", [650, 1000], 2 * (1 / 25)),
  new Item("Death rune", [300, 500], 2 * (1 / 25)),
  new Item("Wrath rune", [30, 60], 2 * (1 / 50)),
]);

const dragonhide = new DropTable("dragonhide", [
  new Item("Blue dragonhide (noted)", [25, 30], 2 * (1 / 18.75)),
  new Item("Green dragonhide (noted)", [25, 30], 2 * (1 / 21.43)),
  new Item("Red dragonhide (noted)", [20, 25], 2 * (1 / 21.43)),
  new Item("Black dragonhide (noted)", [15, 25], 2 * (1 / 21.43)),
]);

const fletching = new DropTable("fletching", [
  new Item("Dragon bolts (unf)", [50, 100], 2 * (1 / 18.75)),
  new Item("Dragon dart tip", [10, 50], 2 * (1 / 25)),
  new Item("Dragonstone bolt tips", [11, 25], 2 * (1 / 30)),
  new Item("Onyx bolt tips", [5, 10], 2 * (1 / 37.5)),
  new Item("Rune dart tip", [75, 100], 2 * (1 / 50)),
  new Item("Dragon arrowtips", [25, 50], 2 * (1 / 50)),
  new Item("Diamond bolt tips", [25, 30], 2 * (1 / 109.2)),
  new Item("Emerald bolt tips", [25, 30], 2 * (1 / 136.5)),
  new Item("Ruby bolt tips", [25, 30], 2 * (1 / 136.5)),
  new Item("Dragonstone bolt tips", [25, 30], 2 * (1 / 195)),
  new Item("Onyx bolt tips", [25, 30], 2 * (1 / 390)),
  new Item("Sapphire bolt tips", [25, 30], 2 * (1 / 546)),
]);

const seeds = new DropTable("seeds", [
  new Item("Snapdragon seed", 1, 2 * (1 / 112.3)),
  new Item("Torstol seed", 1, 2 * (1 / 118.7)),
  new Item("Ranarr seed", 1, 2 * (1 / 416.7)),
  new Item("Watermelon seed", 15, 2 * (1 / 595.2)),
  new Item("Willow seed", 1, 2 * (1 / 625)),
  new Item("Mahogany seed", 1, 2 * (1 / 694.4)),
  new Item("Maple seed", 1, 2 * (1 / 694.4)),
  new Item("Teak seed", 1, 2 * (1 / 694.4)),
  new Item("Yew seed", 1, 2 * (1 / 694.4)),
  new Item("Papaya tree seed", 1, 2 * (1 / 892.9)),
  new Item("Magic seed", 1, 2 * (1 / 1136)),
  new Item("Palm tree seed", 1, 2 * (1 / 1250)),
  new Item("Spirit seed", 1, 2 * (1 / 1562)),
  new Item("Dragonfruit tree seed", 1, 2 * (1 / 2083)),
  new Item("Celastrus seed", 1, 2 * (1 / 3125)),
  new Item("Redwood tree seed", 1, 2 * (1 / 3125)),
]);

const shark = new DropTable("shark", [
  new Item("Raw shark (noted)", [35, 55], 2 * (1 / 100)),
  new Item("Shark lure", [70, 110], 2 * (1 / 100)),
  new Item("Manta ray (noted)", [35, 55], 2 * (1 / 150)),
]);

const other = new DropTable("other", [
  new Item("Adamantite ore (noted)", [10, 30], 2 * (1 / 21.43)),
  new Item("Coins", [20000, 80000], 2 * (1 / 30)),
  new Item("Grapes (noted)", [250, 300], 2 * (1 / 30)),
  new Item("Magic logs (noted)", 50, 2 * (1 / 30)),
  new Item("Dragon bones (noted)", [15, 20], 2 * (1 / 37.5)),
  new Item("Diamond (noted)", [10, 20], 2 * (1 / 37.5)),
  new Item("Dragonstone (noted)", [2, 3], 2 * (1 / 50)),
  new Item("Wrath talisman", 1, 2 * (1 / 50)),
]);

const tertiary = [
  new Item("Scaly blue dragonhide", 1, 1 / 10),
  new Item("Vorkath's head", 1, 1 / 50, {
    chime: true,
    cLog: true,
    rare: true,
  }),
  new Item("Clue scroll (elite)", 1, 1 / 65),
  new Item("Dragonbone necklace", 1, 1 / 1000, {
    chime: true,
    cLog: true,
    rare: true,
  }),
  new Item("Jar of Decay", 1, 1 / 3000, {
    bigChime: true,
    cLog: true,
    rare: true,
  }),
  new Item("Vorki", 1, 1 / 3000, {
    type: "pet",
    bigChime: true,
    cLog: true,
    rare: true,
  }),
  new Item("Draconic visage", 1, 1 / 5000, {
    bigChime: true,
    cLog: true,
    rare: true,
  }),
  new Item("Skeletal visage", 1, 1 / 5000, {
    bigChime: true,
    cLog: true,
    rare: true,
  }),
];

export const Vorkath = new Boss("Vorkath", {
  doubleRoll: true,
  rDT: true,
  rDTChance: 5 / 150,
  dropTables: {
    always,
    equipment,
    runes,
    dragonhide,
    fletching,
    seeds,
    shark,
    other,
    rareDropTable: RareDropTable,
  },
  tertiaryDrops: tertiary,
});
