"use strict";

import { Item } from "../../models/Item.js";
import { DropTable } from "../../models/DropTable.js";
import { Raid } from "../../models/Raid.js";

const normalUnique = new DropTable("normalUnique", [
  new Item("Avernic defender hilt", 1, 1 / 21.61, {
    cLog: true,
    rare: true,
    exclusive: true,
    chime: true,
  }),
  new Item("Ghrazi rapier", 1, 1 / 86.45, {
    cLog: true,
    rare: true,
    exclusive: true,
    chime: true,
  }),
  new Item("Sanguinesti staff (uncharged)", 1, 1 / 86.45, {
    cLog: true,
    rare: true,
    exclusive: true,
    chime: true,
  }),
  new Item("Justiciar faceguard", 1, 1 / 86.45, {
    cLog: true,
    rare: true,
    exclusive: true,
    chime: true,
  }),
  new Item("Justiciar legguards", 1, 1 / 86.45, {
    cLog: true,
    rare: true,
    exclusive: true,
    chime: true,
  }),
  new Item("Justiciar chestguard", 1, 1 / 86.45, {
    cLog: true,
    rare: true,
    exclusive: true,
    chime: true,
  }),
  new Item("Scythe of vitur (uncharged)", 1, 1 / 172.9, {
    cLog: true,
    megaRare: true,
    exclusive: true,
    bigChime: true,
  }),
]);

const hardUnique = new DropTable("hardUnique", [
  new Item("Avernic defender hilt", 1, 1 / 19.8, {
    cLog: true,
    rare: true,
    exclusive: true,
    chime: true,
  }),
  new Item("Ghrazi rapier", 1, 1 / 69.3, {
    cLog: true,
    rare: true,
    exclusive: true,
    chime: true,
  }),
  new Item("Sanguinesti staff (uncharged)", 1, 1 / 69.3, {
    cLog: true,
    rare: true,
    exclusive: true,
    chime: true,
  }),
  new Item("Justiciar faceguard", 1, 1 / 69.3, {
    cLog: true,
    rare: true,
    exclusive: true,
    chime: true,
  }),
  new Item("Justiciar legguards", 1, 1 / 69.3, {
    cLog: true,
    rare: true,
    exclusive: true,
    chime: true,
  }),
  new Item("Justiciar chestguard", 1, 1 / 69.3, {
    cLog: true,
    rare: true,
    exclusive: true,
    chime: true,
  }),
  new Item("Scythe of vitur (uncharged)", 1, 1 / 138.6, {
    cLog: true,
    megaRare: true,
    exclusive: true,
    bigChime: true,
  }),
]);

const common = new DropTable("common", [
  new Item("Vial of blood (noted)", [45, 60], 3 * (1 / 15)),
  new Item("Death rune", [500, 600], 3 * (1 / 30)),
  new Item("Blood rune", [500, 600], 3 * (1 / 30)),
  new Item("Swamp tar", [500, 600], 3 * (1 / 30)),
  new Item("Coal (noted)", [500, 600], 3 * (1 / 30)),
  new Item("Gold ore (noted)", [300, 360], 3 * (1 / 30)),
  new Item("Molten glass (noted)", [200, 240], 3 * (1 / 30)),
  new Item("Adamantite ore (noted)", [130, 156], 3 * (1 / 30)),
  new Item("Runite ore (noted)", [60, 72], 3 * (1 / 30)),
  new Item("Wine of zamorak (noted)", [50, 60], 3 * (1 / 30)),
  new Item("Potato cactus (noted)", [50, 60], 3 * (1 / 30)),
  new Item("Grimy cadantine (noted)", [50, 60], 3 * (1 / 30)),
  new Item("Grimy avantoe (noted)", [40, 48], 3 * (1 / 30)),
  new Item("Grimy toadflax (noted)", [37, 44], 3 * (1 / 30)),
  new Item("Grimy kwuarm (noted)", [36, 43], 3 * (1 / 30)),
  new Item("Grimy irit leaf (noted)", [34, 40], 3 * (1 / 30)),
  new Item("Grimy ranarr weed (noted)", [30, 36], 3 * (1 / 30)),
  new Item("Grimy snapdragon (noted)", [27, 32], 3 * (1 / 30)),
  new Item("Grimy lantadyme (noted)", [26, 31], 3 * (1 / 30)),
  new Item("Grimy dwarf weed (noted)", [24, 28], 3 * (1 / 30)),
  new Item("Grimy torstol (noted)", [20, 24], 3 * (1 / 30)),
  new Item("Battlestaff (noted)", [15, 18], 3 * (1 / 30)),
  new Item("Rune battleaxe (noted)", 4, 3 * (1 / 30)),
  new Item("Rune platebody (noted)", 4, 3 * (1 / 30)),
  new Item("Rune chainbody (noted)", 4, 3 * (1 / 30)),
  new Item("Palm tree seed", 3, 3 * (1 / 30)),
  new Item("Yew seed", 3, 3 * (1 / 30)),
  new Item("Magic seed", 3, 3 * (1 / 30)),
  new Item("Mahogany seed", [10, 12], 3 * (1 / 30)),
]);

const normalTertiary = [
  new Item("Clue scroll (elite)", 1, 3 / 25),
  new Item("Lil' zik", 1, 1 / 650, {
    cLog: true,
    rare: true,
    type: "pet",
    bigChime: true,
  }),
];

const hardTertiary = [
  new Item("Clue scroll (elite)", 1, 3.5 / 25),
  new Item("Holy ornament kit", 1, 1 / 100, {
    cLog: true,
    rare: true,
    chime: true,
  }),
  new Item("Sanguine ornament kit", 1, 1 / 150, {
    cLog: true,
    rare: true,
    chime: true,
  }),
  new Item("Sanguine dust", 1, 1 / 275, {
    cLog: true,
    rare: true,
    chime: true,
  }),
  new Item("Lil' zik", 1, 1 / 500, {
    cLog: true,
    rare: true,
    type: "pet",
    bigChime: true,
  }),
];

export function theatreDropFunction(raid, options = {}, helpers = {}) {
  const { getItems, rollForRaidItem, rollItemQuantity } = helpers;
  if (!raid) return [];

  const drops = [];
  const difficulty = options.difficulty === "Hard" ? "Hard" : "Normal";

  // Unique Chance
  const uniqueChance =
    difficulty === "Hard"
      ? raid.uniqueChanceHard ?? 0
      : raid.uniqueChanceNormal ?? 0;

  const uniqueTableName = difficulty === "Hard" ? "hardUnique" : "normalUnique";
  const tertiaryList =
    difficulty === "Hard" ? raid.tertiaryDrops.hard : raid.tertiaryDrops.normal;

  const uniqueTableExists = raid.dropTables?.[uniqueTableName];

  //roll for unique
  if (uniqueTableExists && Math.random() < uniqueChance) {
    console.log("Unique chance passed. Rolling table: ", uniqueTableName);
    const uniqueDrop = rollForRaidItem(raid, uniqueTableName);
    console.log("UniqueDrop result:", uniqueDrop);

    if (uniqueDrop) {
      if (Array.isArray(uniqueDrop)) {
        uniqueDrop.forEach((d) => {
          drops.push({
            dropTable: uniqueTableName,
            item: d.item,
            quantity: Array.isArray(d.quantity)
              ? rollItemQuantity(d.quantity[0], d.quantity[1])
              : d.quantity,
            tablePath: d.tablePath,
            type: d.type,
            cLog: d.cLog,
          });
        });
      } else if (uniqueDrop.item) {
        drops.push({
          dropTable: uniqueTableName,
          item: uniqueDrop.item,
          quantity: Array.isArray(uniqueDrop.quantity)
            ? rollItemQuantity(uniqueDrop.quantity[0], uniqueDrop.quantity[1])
            : uniqueDrop.quantity,
          tablePath: uniqueDrop.tablePath,
          type: uniqueDrop.type,
          cLog: uniqueDrop.cLog,
        });
      }
    }

    // Roll Tertiary AFTER unique (only for chosen difficulty)
    for (const tert of tertiaryList) {
      const chance = tert.rarity ?? 0;
      if (Math.random() < chance) {
        drops.push({
          dropTable: "tertiary",
          item: tert.name,
          quantity: 1,
          type: tert.type,
          cLog: tert.cLog,
          rare: tert.rare,
          megaRare: tert.megaRare,
          dropInfo: tert, // ← attach the full item object
          tablePath: `tertiary.${difficulty}`,
        });
      }
    }

    // Unique is exclusive, no common drops
    return drops;
  }

  //Common drops (Missed unique chance)

  const commonTable = raid.dropTables?.common;
  if (!commonTable) return drops;

  for (let i = 0; i < 3; i++) {
    const roll = rollForRaidItem(raid, "common");
    if (!roll || !roll.item) continue;

    let qty = Array.isArray(roll.quantity)
      ? rollItemQuantity(roll.quantity[0], roll.quantity[1])
      : roll.quantity;

    //Hard mode: +15% quantity
    if (difficulty === "Hard") {
      qty = Math.ceil(qty * 1.15);
    }

    drops.push({
      dropTable: "common",
      item: roll.item,
      quantity: qty,
      tablePath: roll.tablePath,
      type: roll.type,
      cLog: roll.cLog,
    });
  }

  // Tertiary drops (No Unique)
  for (const tert of tertiaryList) {
    const chance = tert.rarity ?? 0;
    if (Math.random() < chance) {
      drops.push({
        dropTable: "tertiary",
        item: tert.name,
        quantity: 1,
        type: tert.type,
        cLog: tert.cLog,
        rare: tert.rare,
        megaRare: tert.megaRare,
        dropInfo: tert, // ← attach the full item object
        tablePath: `tertiary.${difficulty}`,
      });
    }
  }

  return drops;
}

export const Theatre = new Raid("Theatre", {
  key: "ToB",
  name: "Theatre",
  tripleRoll: true,
  dropFunction: theatreDropFunction,
  uniqueChanceNormal: 1 / 9.1,
  uniqueChanceHard: 1 / 7.7,
  dropTables: {
    normalUnique,
    hardUnique,
    common,
  },
  tertiaryDrops: {
    normal: normalTertiary,
    hard: hardTertiary,
  },
});
