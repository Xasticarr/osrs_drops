"use strict";

import { Item } from "../../models/Item.js";
import { DropTable } from "../../models/DropTable.js";
import { Raid } from "../../models/Raid.js";

const unique = new DropTable("unique", [
  new Item("Osmumten's fang", 1, 1 / 3.429, {
    cLog: true,
    exclusive: true,
    rare: true,
    chime: true,
  }),
  new Item("Lightbearer", 1, 1 / 3.429, {
    cLog: true,
    exclusive: true,
    rare: true,
    chime: true,
  }),
  new Item("Elidinis' ward", 1, 1 / 8, {
    cLog: true,
    exclusive: true,
    rare: true,
    chime: true,
  }),
  new Item("Masori mask", 1, 1 / 12, {
    cLog: true,
    exclusive: true,
    rare: true,
    chime: true,
  }),
  new Item("Masori body", 1, 1 / 12, {
    cLog: true,
    exclusive: true,
    rare: true,
    chime: true,
  }),
  new Item("Masori chaps", 1, 1 / 12, {
    cLog: true,
    exclusive: true,
    rare: true,
    chime: true,
  }),
  new Item("Tumeken's shadow (uncharged)", 1, 1 / 24, {
    cLog: true,
    exclusive: true,
    megaRare: true,
    bigChime: true,
  }),
]);

const common = new DropTable("common", [
  new Item("Cache of runes", 1, 3 * (1 / 27)),
  new Item("Coins", [1126, 51285], 3 * (1 / 27), {
    divisor: 1,
  }),
  new Item("Death rune", [57, 2564], 3 * (1 / 27), {
    divisor: 20,
  }),
  new Item("Soul rune", [28, 1282], 3 * (1 / 27), {
    divisor: 40,
  }),
  new Item("Gold ore (noted)", [12, 569], 3 * (1 / 27), {
    divisor: 90,
  }),
  new Item("Dragon dart tip", [11, 512], 3 * (1 / 27), {
    divisor: 100,
  }),
  new Item("Mahogany logs (noted)", [6, 284], 3 * (1 / 27), {
    divisor: 180,
  }),
  new Item("Sapphire (noted)", [5, 256], 3 * (1 / 27), {
    divisor: 200,
  }),
  new Item("Emerald (noted)", [4, 205], 3 * (1 / 27), {
    divisor: 250,
  }),
  new Item("Gold bar (noted)", [4, 205], 3 * (1 / 27), {
    divisor: 250,
  }),
  new Item("Potato cactus (noted)", [4, 205], 3 * (1 / 27), {
    divisor: 250,
  }),
  new Item("Raw shark (noted)", [4, 205], 3 * (1 / 27), {
    divisor: 250,
  }),
  new Item("Ruby (noted)", [3, 170], 3 * (1 / 27), {
    divisor: 300,
  }),
  new Item("Diamond (noted)", [2, 128], 3 * (1 / 27), {
    divisor: 400,
  }),
  new Item("Raw manta ray (noted)", [2, 113], 3 * (1 / 27), {
    divisor: 450,
  }),
  new Item("Cactus spine (noted)", [1, 85], 3 * (1 / 27), {
    divisor: 600,
  }),
  new Item("Dragonstone (noted)", [1, 85], 3 * (1 / 27), {
    divisor: 600,
  }),
  new Item("Battlestaff (noted)", [1, 46], 3 * (1 / 27), {
    divisor: 1100,
  }),
  new Item("Coconut milk (noted)", [1, 46], 3 * (1 / 27), {
    divisor: 1100,
  }),
  new Item("Lily of the sands (noted)", [1, 46], 3 * (1 / 27), {
    divisor: 1100,
  }),
  new Item("Toadflax seed", [1, 36], 3 * (1 / 27), {
    divisor: 2000,
  }),
  new Item("Ranarr seed", [1, 28], 3 * (1 / 27), {
    divisor: 2500,
  }),
  new Item("Torstol seed", [1, 23], 3 * (1 / 27), {
    divisor: 3200,
  }),
  new Item("Snapdragon seed", [1, 23], 3 * (1 / 27), {
    divisor: 3200,
  }),
  new Item("Dragon med helm (noted)", [1, 12], 3 * (1 / 27), {
    divisor: 4000,
  }),
  new Item("Magic seed", [1, 7], 3 * (1 / 27), {
    divisor: 6500,
  }),
  new Item("Blood essence", [1, 6], 3 * (1 / 27), {
    divisor: 7500,
  }),
]);

const tertiary = [
  new Item("Thread of elidinis", 1, 1 / 50, {
    cLog: true,
  }),
  new Item("Eye of the corrupter (red)", 1, 1 / 50, {
    cLog: true,
  }),
  new Item("Jewel of the sun (yellow)", 1, 1 / 50, {
    cLog: true,
  }),
  new Item("Breach of the scarab (blue)", 1, 1 / 50, {
    cLog: true,
  }),
  new Item("Jewel of amascut (black)", 1, 1 / 50, {
    cLog: true,
  }),
  new Item("Tumeken's guardian", 1, null, {
    rare: true,
    cLog: true,
    type: "pet",
    bigChime: true,
  }),
];

export function tombsDropFunction(raid, options = {}, helpers = {}) {
  const { getItems, rollForRaidItem, rollItemQuantity } = helpers;
  if (!raid) return [];

  const drops = [];

  //Check invo level
  const invocationLevel = Number(options.invocationLevel) || 0;

  // Invocations to Points

  let pointsEarned = 0;
  if (invocationLevel === 0) pointsEarned = 10960;
  else if (invocationLevel === 100) pointsEarned = 13522;
  else if (invocationLevel === 150) pointsEarned = 14803;
  else if (invocationLevel === 300) pointsEarned = 19151;
  else if (invocationLevel === 350) pointsEarned = 20823;
  else if (invocationLevel === 400) pointsEarned = 22181;
  else if (invocationLevel === 450) pointsEarned = 24363;
  else if (invocationLevel === 500) pointsEarned = 25779;
  else pointsEarned = 10960; // Fallback

  // Compute valRL (scaled RaidLevel)

  const RL = invocationLevel;

  let valRL = 0;
  if (RL <= 310) {
    valRL = RL;
  } else if (RL > 310 && RL <= 430) {
    valRL = 310 + (RL - 310) / 3;
  } else {
    valRL = 310 + (430 + (RL - 430) / 2 - 310) / 3;
  }

  // Set up Unique Chance

  const denom = 10500 - 20 * valRL;
  const uniqueChance = Math.min((pointsEarned / denom) * 0.01, 1);

  //Set up Pet Chance
  let X = RL < 400 ? RL : 400;
  let Y = RL < 400 ? 0 : RL - 400;

  let petDenom = 350000 - 700 * (X + Y / 3);

  if (petDenom < 1) petDenom = 1;

  const petChance = Math.min((pointsEarned / petDenom) * 0.01, 1);
  //   let X, Y;

  //   if (RL < 400) {
  //     X = RL;
  //     Y = 0;
  //   } else {
  //     X = 400;
  //     Y = RL - 400;
  //   }

  //   const petChance = 350000 - (X + Y / 3);

  // Roll for unique

  const uniqueTableExists = raid.dropTables?.unique;

  if (uniqueTableExists && Math.random() < uniqueChance) {
    const uniqueDrop = rollForRaidItem(raid, "unique");

    if (uniqueDrop) {
      if (Array.isArray(uniqueDrop)) {
        uniqueDrop.forEach((d) => {
          drops.push({
            dropTable: "unique",
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
          dropTable: "unique",
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

    // --- UNIVERSAL TERTIARY ROLLS (fire regardless of unique or common) ---
    for (const tert of raid.tertiaryDrops) {
      // Select correct chance
      const chance =
        tert.name === "Tumeken's guardian" ? petChance : tert.rarity ?? 0;

      if (Math.random() < chance) {
        drops.push({
          dropTable: "tertiary",
          item: tert.name,
          quantity: 1,
          type: tert.type,
          cLog: tert.cLog,
          rare: tert.rare,
          megaRare: tert.megaRare,
          dropInfo: tert,
          tablePath: "tertiary",
        });
      }
    }

    return drops; // Uniques are exclusive
  }

  // --- COMMON DROPS (3 rolls) ---
  const commonEntries = getItems(raid.dropTables.common) ?? [];

  for (let i = 0; i < 3; i++) {
    const roll = rollForRaidItem(raid, "common");
    if (!roll || !roll.item) continue;

    // 🔥 Always force Cache of runes to be qty = 1
    if (roll.item === "Cache of runes") {
      drops.push({
        dropTable: "common",
        item: roll.item,
        quantity: 1,
        tablePath: roll.tablePath,
        type: roll.type,
        cLog: roll.cLog,
      });
      continue; // Skip scaling logic
    }

    // Look up the original item so we can get its divisor
    const sourceEntry = commonEntries.find((e) => e.name === roll.item) ?? {};

    const divisor = sourceEntry.divisor ?? 1;

    let qty;
    if (RL < 300) {
      qty = Math.floor(pointsEarned / divisor);
    } else {
      const scale = 1.15 + 0.01 * Math.floor((RL - 300) / 5);
      qty = Math.floor((pointsEarned / divisor) * scale);
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

  //   // --- COMMON DROPS (3 rolls) ---
  //   const commonEntries = getItems(raid.dropTables.common) ?? [];

  //   for (let i = 0; i < 3; i++) {
  //     const roll = rollForRaidItem(raid, "common");
  //     if (!roll || !roll.item) continue;

  //     // Find the original table entry so we can read the correct divisor
  //     const sourceEntry = commonEntries.find((e) => e.name === roll.item) ?? {};

  //     const divisor = sourceEntry.divisor ?? 1;

  //     let qty;
  //     if (RL < 300) {
  //       qty = Math.floor(pointsEarned / divisor);
  //     } else {
  //       const scale = 1.15 + 0.01 * Math.floor((RL - 300) / 5);
  //       qty = Math.floor((pointsEarned / divisor) * scale);
  //     }

  //     drops.push({
  //       dropTable: "common",
  //       item: roll.item,
  //       quantity: qty,
  //       tablePath: roll.tablePath,
  //       type: roll.type,
  //       cLog: roll.cLog,
  //     });
  //   }

  //Roll for common drops (3 rolls for ToA)
  //   const commonTable = raid.dropTables?.common;
  //   if (!commonTable) return drops;

  //   for (let i = 0; i < 3; i++) {
  //     const roll = rollForRaidItem(raid, "common");
  //     if (!roll || !roll.item) continue;

  //     let qty = Array.isArray(roll.quantity)
  //       ? rollItemQuantity(roll.quantity[0], roll.quantity[1])
  //       : roll.quantity;

  //     //Apply scaling using divisor if provided
  //     const divisor = roll.divisor ?? roll.options?.divisor ?? 1;

  //     if (RL < 300) {
  //       qty = Math.floor(pointsEarned / divisor);
  //     } else {
  //       const scale = 1.15 + 0.01 * Math.floor((RL - 300) / 5);
  //       qty = Math.floor((pointsEarned / divisor) * scale);
  //     }

  //     drops.push({
  //       dropTable: "common",
  //       item: roll.item,
  //       quantity: qty,
  //       tablePath: roll.tablePath,
  //       type: roll.type,
  //       cLog: roll.cLog,
  //     });
  //   }

  //   // --- COMMON DROPS (3 rolls) ---
  //   for (let i = 0; i < 3; i++) {
  //     const roll = rollForRaidItem(raid, "common");
  //     if (!roll || !roll.item) continue;

  //     let divisor = roll.divisor ?? roll.options?.divisor ?? 1;

  //     let qty;

  //     if (RL < 300) {
  //       qty = Math.floor(pointsEarned / divisor);
  //     } else {
  //       const scale = 1.15 + 0.01 * Math.floor((RL - 300) / 5);
  //       qty = Math.floor((pointsEarned / divisor) * scale);
  //     }

  //     drops.push({
  //       dropTable: "common",
  //       item: roll.item,
  //       quantity: qty,
  //       tablePath: roll.tablePath,
  //       type: roll.type,
  //       cLog: roll.cLog,
  //     });
  //   }

  // --- UNIVERSAL TERTIARY ROLLS (fire regardless of unique or common) ---
  for (const tert of raid.tertiaryDrops) {
    // Select correct chance
    const chance =
      tert.name === "Tumeken's guardian" ? petChance : tert.rarity ?? 0;

    if (Math.random() < chance) {
      drops.push({
        dropTable: "tertiary",
        item: tert.name,
        quantity: 1,
        type: tert.type,
        cLog: tert.cLog,
        rare: tert.rare,
        megaRare: tert.megaRare,
        dropInfo: tert,
        tablePath: "tertiary",
      });
    }
  }

  return drops;
}

export const Tombs = new Raid("Tombs", {
  key: "ToA",
  name: "Tombs",
  tripleRoll: true,
  //   preRoll: { table: "unique", everyRoll: false },
  dropFunction: tombsDropFunction,
  dropTables: {
    unique,
    common,
  },
  tertiaryDrops: tertiary,
});

// Pet chance is baked into the pet item
// X = raid levels <= 400
// Y = raid levels >= 400

// Unique chance formulas where valRL is a scaled RaidLevel

// If RaidLevel <= 310, then valRL = RaidLevel
// If RaidLevel is > 310 and <= 430, then valRL = 310 + ((RaidLevel - 310) / 3)
// If RaidLevel is > 430, then valRL = 310 + ((430 + ((RaidLevel - 430) / 2) - 310) / 3)

// Common loot quantity formulas
// If RaidLevel < 300 then ItemQty = Points / divisor
// If RaidLevel >= 300 then ItemQty = Points / divisor * (1.15 + 0.01 * Math.floor((RaidLevel - 300) / 5))

//   Invocation Levels to Points
// Invo 0 = 10960 Points
// Invo 100 = 13522 Points
// Invo 150 = 14803 Points
// Invo 300 = 19151 Points
// Invo 350 = 20823 Points
// Invo 400 = 22181 Points
// Invo 450 = 24363 Points
// Invo 500 = 25779 Points
