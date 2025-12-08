"use strict";

import { Item } from "../../models/Item.js";
import { DropTable } from "../../models/DropTable.js";
import { Boss } from "../../models/Boss.js";
import { RareDropTable } from "../rareDropTable.js";

const unique = new DropTable("unique", [
  new Item("Ancient essence", [540, 599], 1 / 1.667, {
    cLog: true,
  }),
  new Item("Ancient essence", [885, 995], 1 / 4.348, {
    cLog: true,
  }),
  new Item("Ancient essence", [1970, 2060], 1 / 10, {
    cLog: true,
  }),
  new Item("Frozen cache", 1, 1 / 25, {
    cLog: true,
    rare: true,
  }),
  new Item("Ancient icon", 1, 1 / 50, {
    cLog: true,
    rare: true,
  }),
  new Item("Venator shard", 1, 1 / 100, {
    cLog: true,
    rare: true,
    chime: true,
    exclusive: true,
  }),
]);

const supplies = new DropTable("supplies", [
  new Item("Shark", [4, 6], 1 / 9, {
    group: "Sup 1",
  }),
  new Item("Summer pie", [4, 6], 1 / 9, {
    group: "Sup 1",
  }),
  new Item("Ancient brew(3)", [1, 2], 1 / 9, {
    group: "Sup 2",
  }),
  new Item("Ranging potion(3)", [1, 2], 1 / 9, {
    group: "Sup 2",
  }),
  new Item("Super restore(3)", [1, 2], 1 / 9, {
    group: "Sup 3",
  }),
  new Item("Prayer potion(3)", [1, 2], 1 / 9, {
    group: "Sup 3",
  }),
]);

const equipment = new DropTable("equipment", [
  new Item("Rune kiteshield (noted)", 3, 2 * (1 / 23.5)),
  new Item("Dragon plateskirt", 1, 2 * (1 / 47)),
  new Item("Rune platelegs (noted)", 3, 2 * (1 / 47)),
  new Item("Black d'hide body", 1, 2 * (1 / 47)),
  new Item("Dragon platelegs", 2, 2 * (1 / 58.75)),
  new Item("Rune sword", 1, 2 * (1 / 235)),
]);

const ammo = new DropTable("ammo", [
  new Item("Smoke rune", 314, 2 * (1 / 15.67)),
  new Item("Law rune", 146, 2 * (1 / 23.5)),
  new Item("Soul rune", 380, 2 * (1 / 23.5)),
  new Item("Death rune", 428, 2 * (1 / 23.5)),
  new Item("Chaos rune", 480, 2 * (1 / 47)),
  new Item("Fire rune", 1964, 2 * (1 / 47)),
  new Item("Cannonball", 670, 2 * (1 / 47)),
]);

const herbs = new DropTable("herbs", [
  new Item("Grimy toadflax (noted)", 40, 2 * (1 / 78.33)),
  new Item("Grimy kwuarm (noted)", 6, 2 * (1 / 150.4)),
  new Item("Grimy dwarf weed (noted)", 6, 2 * (1 / 188)),
  new Item("Grimy cadantine (noted)", 6, 2 * (1 / 188)),
  new Item("Grimy lantadyme (noted)", 6, 2 * (1 / 250.7)),
]);

const seeds = new DropTable("seeds", [
  new Item("Yew seed", 2, 2 * (1 / 47)),
  new Item("Torstol seed", 2, 2 * (1 / 47)),
  new Item("Palm tree seed", 2, 2 * (1 / 47)),
  new Item("Ranarr seed", 3, 2 * (1 / 47)),
  new Item("Snapdragon seed", 5, 2 * (1 / 58.75)),
  new Item("Ranarr seed", 5, 2 * (1 / 78.33)),
  new Item("Spirit seed", 1, 2 * (1 / 117.5)),
  new Item("Ranarr seed", 3, 2 * (1 / 391.7)),
  new Item("Snapdragon seed", 3, 2 * (1 / 419.6)),
  new Item("Torstol seed", 3, 2 * (1 / 534.1)),
  new Item("Watermelon seed", 49, 2 * (1 / 559.5)),
  new Item("Willow seed", 3, 2 * (1 / 587.5)),
  new Item("Mahogany seed", 3, 2 * (1 / 652.8)),
  new Item("Maple seed", 3, 2 * (1 / 652.8)),
  new Item("Teak seed", 3, 2 * (1 / 652.8)),
  new Item("Yew seed", 3, 2 * (1 / 652.8)),
  new Item("Papaya tree seed", 3, 2 * (1 / 839.3)),
  new Item("Magic seed", 3, 2 * (1 / 1068)),
  new Item("Palm tree seed", 3, 2 * (1 / 1175)),
  new Item("Spirit seed", 3, 2 * (1 / 1469)),
  new Item("Dragonfruit tree seed", 3, 2 * (1 / 1958)),
  new Item("Celastrus seed", 3, 2 * (1 / 2938)),
  new Item("Redwood tree seed", 3, 2 * (1 / 2938)),
]);

const resources = new DropTable("resources", [
  new Item("Molten glass (noted)", 89, 2 * (1 / 15.67)),
  new Item("Water orb (noted)", 21, 2 * (1 / 15.67)),
  new Item("Adamantite ore (noted)", 22, 2 * (1 / 23.5)),
  new Item("Gold ore (noted)", 180, 2 * (1 / 23.5)),
  new Item("Teak plank (noted)", 22, 2 * (1 / 23.5)),
  new Item("Dragon bolts (unf)", 89, 2 * (1 / 23.5)),
  new Item("Pure essence (noted)", 2314, 2 * (1 / 47)),
  new Item("Coal (noted)", 163, 2 * (1 / 47)),
  new Item("Runite ore (noted)", 18, 2 * (1 / 78.33)),
  new Item("Limpwurt root (noted)", 21, 2 * (1 / 78.33)),
  new Item("Silver ore (noted)", 101, 2 * (1 / 117.5)),
]);

const shark = new DropTable("shark", [
  new Item("Raw shark (noted)", 28, 2 * (1 / 62.67)),
  new Item("Shark lure", 56, 2 * (1 / 62.67)),
  new Item("Manta ray (noted)", 28, 2 * (1 / 94)),
]);

const tertiary = [
  new Item("Clue scroll (hard)", 1, 1 / 30),
  new Item("Clue scroll (elite)", 1, 1 / 45),
  new Item("Muphin", 1, 1 / 2500, {
    type: "pet",
    cLog: true,
    rare: true,
    bigChime: true,
  }),
];

export const Muspah = new Boss("Muspah", {
  doubleRoll: true,
  rDT: true,
  rDTChance: 5 / 220,
  preRoll: { table: "unique", everyRoll: false },
  dropTables: {
    unique,
    supplies,
    equipment,
    ammo,
    resources,
    seeds,
    herbs,
    shark,
    rareDropTable: RareDropTable,
  },
  tertiaryDrops: tertiary,
});
