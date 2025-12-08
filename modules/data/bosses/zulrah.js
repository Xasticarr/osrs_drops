"use strict";

import { Item } from "../../models/Item.js";
import { DropTable } from "../../models/DropTable.js";
import { Boss } from "../../models/Boss.js";
import { RareDropTable } from "../rareDropTable.js";

const always = new DropTable("always", [
  new Item("Zulrah's scales", [100, 299]),
]);

const unique = new DropTable("unique", [
  new Item("Tanzanite fang", 1, 2 * (1 / 1024), {
    chime: true,
    cLog: true,
    rare: true,
  }),
  new Item("Magic fang", 1, 2 * (1 / 1024), {
    chime: true,
    cLog: true,
    rare: true,
  }),
  new Item("Serpentine visage", 1, 2 * (1 / 1024), {
    chime: true,
    cLog: true,
    rare: true,
  }),
  new Item("Uncut onyx", 1, 2 * (1 / 1024), {
    chime: true,
    cLog: true,
    rare: true,
  }),
]);

const mutagen = new DropTable("mutagen", [
  new Item("Tanzanite mutagen", 1, 2 * (1 / 13106), {
    bigChime: true,
    cLog: true,
    rare: true,
  }),
  new Item("Magma mutagen", 1, 2 * (1 / 13106), {
    bigChime: true,
    cLog: true,
    rare: true,
  }),
]);

const equipment = new DropTable("equipment", [
  new Item("Battlestaff (noted)", 10, 2 * (1 / 24.8)),
  new Item("Dragon med helm", 1, 2 * (1 / 124)),
  new Item("Dragon halberd", 1, 2 * (1 / 124)),
]);

const runes = new DropTable("runes", [
  new Item("Death rune", 300, 2 * (1 / 20.67)),
  new Item("Law rune", 200, 2 * (1 / 20.67)),
  new Item("Chaos rune", 500, 2 * (1 / 20.67)),
]);

const herbs = new DropTable("herbs", [
  new Item("Snapdragon (noted)", 10, 2 * (1 / 124)),
  new Item("Dwarf weed (noted)", 30, 2 * (1 / 124)),
  new Item("Toadflax (noted)", 25, 2 * (1 / 124)),
  new Item("Torstol (noted)", 10, 2 * (1 / 124)),
]);

const seeds = new DropTable("seeds", [
  new Item("Palm tree seed", 1, 2 * (1 / 41.33)),
  new Item("Papaya tree seed", 1, 2 * (1 / 41.33)),
  new Item("Calquat tree seed", 1, 2 * (1 / 41.33)),
  new Item("Magic seed", 1, 2 * (1 / 62)),
  new Item("Toadflax seed", 1, 2 * (1 / 124)),
  new Item("Snapdragon seed", 1, 2 * (1 / 124)),
  new Item("Dwarf weed seed", 1, 2 * (1 / 124)),
  new Item("Torstol seed", 1, 2 * (1 / 124)),
  new Item("Spirit seed", 1, 2 * (1 / 248)),
]);

const resources = new DropTable("resources", [
  new Item("Snakeskin (noted)", 35, 2 * (1 / 22.55)),
  new Item("Runite ore (noted)", 2, 2 * (1 / 22.55)),
  new Item("Pure essence (noted)", 1500, 2 * (1 / 24.8)),
  new Item("Flax (noted)", 1000, 2 * (1 / 24.8)),
  new Item("Yew logs (noted)", 35, 2 * (1 / 24.8)),
  new Item("Adamantite bard (noted)", 20, 2 * (1 / 31)),
  new Item("Coal (noted)", 200, 2 * (1 / 31)),
  new Item("Dragon bones (noted)", 12, 2 * (1 / 31)),
  new Item("Mahogany logs (noted)", 50, 2 * (1 / 31)),
]);

const other = new DropTable("other", [
  new Item("Zul-Andra teleport", 4, 2 * (1 / 16.53)),
  new Item("Manta ray (noted)", 35, 2 * (1 / 20.67)),
  new Item("Antidote++ (noted)", 10, 2 * (1 / 20.67)),
  new Item("Dragonstone bolt tips", 12, 2 * (1 / 20.67)),
  new Item("Grapes (noted)", 250, 2 * (1 / 20.67)),
  new Item("Coconut (noted)", 20, 2 * (1 / 20.67)),
  new Item("Swamp tar", 1000, 2 * (1 / 20.67)),
  new Item("Zulrah's scales", 500, 2 * (1 / 20.67)),
]);

const tertiary = [
  new Item("Clue Scroll (Elite)", 1, 1 / 75),
  new Item("Jar of Swamp", 1, 1 / 3000, {
    bigChime: true,
    cLog: true,
    rare: true,
  }),
  new Item("Pet Snakeling", 1, 1 / 4000, {
    type: "pet",
    bigChime: true,
    cLog: true,
    rare: true,
  }),
];

export const Zulrah = new Boss("Zulrah", {
  doubleRoll: true,
  rDT: true,
  rDTChance: 9 / 248,
  dropTables: {
    always,
    unique,
    mutagen,
    equipment,
    runes,
    herbs,
    seeds,
    resources,
    other,
    rareDropTable: RareDropTable,
  },
  tertiaryDrops: tertiary,
});
