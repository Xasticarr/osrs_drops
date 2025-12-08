"use strict";

import { Item } from "../../models/Item.js";
import { DropTable } from "../../models/DropTable.js";
import { Raid } from "../../models/Raid.js";

const unique = new DropTable("unique", [
  new Item("Dexterous prayer scroll", 1, 1 / 3.45, {
    cLog: true,
    rare: true,
    chime: true,
    exclusive: true,
  }),
  new Item("Arcane prayer scroll", 1, 1 / 3.45, {
    cLog: true,
    rare: true,
    chime: true,
    exclusive: true,
  }),
  new Item("Twisted Buckler", 1, 1 / 17.25, {
    cLog: true,
    rare: true,
    chime: true,
    exclusive: true,
  }),
  new Item("Dragon hunter crossbow", 1, 1 / 17.25, {
    cLog: true,
    rare: true,
    chime: true,
    exclusive: true,
  }),
  new Item("Dinh's bulwark", 1, 1 / 23, {
    cLog: true,
    rare: true,
    chime: true,
    exclusive: true,
  }),
  new Item("Ancestral hat", 1, 1 / 23, {
    cLog: true,
    rare: true,
    chime: true,
    exclusive: true,
  }),
  new Item("Ancestral robe top", 1, 1 / 23, {
    cLog: true,
    rare: true,
    chime: true,
    exclusive: true,
  }),
  new Item("Ancestral robe bottom", 1, 1 / 23, {
    cLog: true,
    rare: true,
    chime: true,
    exclusive: true,
  }),
  new Item("Dragon claws", 1, 1 / 23, {
    cLog: true,
    rare: true,
    chime: true,
    exclusive: true,
  }),
  new Item("Elder maul", 1, 1 / 34.5, {
    cLog: true,
    megaRare: true,
    bigChime: true,
    exclusive: true,
  }),
  new Item("Kodai insignia", 1, 1 / 34.5, {
    cLog: true,
    megaRare: true,
    bigChime: true,
    exclusive: true,
  }),
  new Item("Twisted bow", 1, 1 / 34.5, {
    cLog: true,
    megaRare: true,
    bigChime: true,
    exclusive: true,
  }),
]);

const ammo = new DropTable("ammo", [
  new Item("Death rune", [1, 3640], 2 * (1 / 33)),
  new Item("Blood rune", [1, 4095], 2 * (1 / 33)),
  new Item("Soul rune", [1, 6553], 2 * (1 / 33)),
  new Item("Rune arrow", [1, 9362], 2 * (1 / 33)),
  new Item("Dragon arrow", [1, 648], 2 * (1 / 33)),
]);

const herbs = new DropTable("herbs", [
  new Item("Grimy ranarr weed (noted)", [1, 130], 2 * (1 / 33)),
  new Item("Grimy toadflax (noted)", [1, 199], 2 * (1 / 33)),
  new Item("Grimy irit leaf (noted)", [1, 648], 2 * (1 / 33)),
  new Item("Grimy avantoe (noted)", [1, 324], 2 * (1 / 33)),
  new Item("Grimy kwuarm (noted)", [1, 271], 2 * (1 / 33)),
  new Item("Grimy snapdragon (noted)", [1, 80], 2 * (1 / 33)),
  new Item("Grimy cadantine (noted)", [1, 316], 2 * (1 / 33)),
  new Item("Grimy lantadyme (noted)", [1, 421], 2 * (1 / 33)),
  new Item("Grimy dwarf weed (noted)", [1, 393], 2 * (1 / 33)),
  new Item("Grimy torstol (noted)", [1, 129], 2 * (1 / 33)),
]);

const mining = new DropTable("mining", [
  new Item("Silver ore (noted)", [1, 6553], 2 * (1 / 33)),
  new Item("Coal (noted)", [1, 6553], 2 * (1 / 33)),
  new Item("Gold ore (noted)", [1, 2978], 2 * (1 / 33)),
  new Item("Mithril ore (noted)", [1, 4095], 2 * (1 / 33)),
  new Item("Adamantite ore (noted)", [1, 789], 2 * (1 / 33)),
  new Item("Runite ore (noted)", [1, 65], 2 * (1 / 33)),
  new Item("Uncut sapphire (noted)", [1, 693], 2 * (1 / 33)),
  new Item("Uncut emerald (noted)", [1, 923], 2 * (1 / 33)),
  new Item("Uncut ruby (noted)", [1, 541], 2 * (1 / 33)),
  new Item("Uncut diamond (noted)", [1, 255], 2 * (1 / 33)),
]);

const other = new DropTable("other", [
  new Item("Lizardman fang", [1, 4681], 2 * (1 / 33)),
  new Item("Pure essence (noted)", [1, 65535], 2 * (1 / 33)),
  new Item("Saltpetre (noted)", [1, 5461], 2 * (1 / 33)),
  new Item("Teak plank (noted)", [1, 1365], 2 * (1 / 33)),
  new Item("Mahogany plank (noted)", [1, 548], 2 * (1 / 33)),
  new Item("Dynamite (noted)", [1, 2427], 2 * (1 / 33)),
  new Item("Torn prayer scroll", 1, 2 * (1 / 33)),
  new Item("Dark relic", 1, 2 * (1 / 33)),
]);

const tertiary = [
  new Item("Clue scroll (elite)", 1, 1 / 12),
  new Item("Olmlet", 1, 1 / 53, {
    cLog: true,
    rare: true,
    type: "pet",
    bigChime: true,
    //need some flag to check for unique loot to enable drop
  }),
  new Item("Twisted ancestral colour kit", 1, 1 / 75, {
    cLog: true,
    rare: true,
    chime: true,
  }),
  new Item("Metamorphic dust", 1, 1 / 400, {
    cLog: true,
    rare: true,
    chime: true,
  }),
];

export function chambersDropFunction(raid, options = {}, helpers = {}) {
  const { getItems, rollForRaidItem, rollItemQuantity } = helpers;
  if (!raid) return [];

  const drops = [];
  const pointsEarned = options.pointsEarned ?? 0;

  // ------------------------------------------------------------
  // 1. UNIQUE PRE-ROLL
  // 8676 points = 1% chance
  // uniqueChance = pointsEarned / (uMod * 100)
  // ------------------------------------------------------------
  let uniqueChance = pointsEarned / (raid.uMod * 100);
  if (uniqueChance > 1) uniqueChance = 1;

  const uniqueTableExists = raid.dropTables?.unique;

  if (uniqueTableExists && Math.random() < uniqueChance) {
    // ---- Roll one UNIQUE ----
    const uniqueDrop = rollForRaidItem(raid, "unique");

    if (uniqueDrop) {
      if (Array.isArray(uniqueDrop)) {
        uniqueDrop.forEach((d) =>
          drops.push({
            dropTable: "unique",
            item: d.item,
            quantity: Array.isArray(d.quantity)
              ? rollItemQuantity(d.quantity[0], d.quantity[1])
              : d.quantity,
            tablePath: d.tablePath,
            type: d.type,
            cLog: d.cLog,
          })
        );
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

    // ------------------------------------------------------------
    // 2. UNIQUE-ONLY TERTIARY DROPS
    // Olmlet only rolls if UNIQUE hit
    // ------------------------------------------------------------
    const terts = raid.tertiaryDrops ?? [];
    for (const tert of terts) {
      if (tert.name !== "Olmlet") continue;
      if (Math.random() < (tert.rarity ?? 0)) {
        drops.push({
          dropTable: "tertiary",
          item: tert.name,
          quantity: 1,
          type: tert.type,
          cLog: tert.cLog,
        });
      }
    }

    // UNIQUE is exclusive → no common rolls
    return drops;
  }

  // ------------------------------------------------------------
  // 3. COMMON LOOT (NO UNIQUE HIT)
  // Two rolls from ammo/herbs/mining/other
  // SAME TABLE can roll twice
  // SAME ITEM cannot appear twice
  // ------------------------------------------------------------
  const commonTables = ["ammo", "herbs", "mining", "other"];
  const seenItems = new Set();

  for (let r = 0; r < 2; r++) {
    let attempts = 0;
    let accepted = false;

    while (!accepted && attempts < 40) {
      attempts++;

      const table =
        commonTables[Math.floor(Math.random() * commonTables.length)];
      const rolled = rollForRaidItem(raid, table);
      if (!rolled || !rolled.item) continue;

      const itemName = rolled.item;

      // Prevent duplicate ITEM (table duplication IS allowed)
      if (seenItems.has(itemName)) continue;

      seenItems.add(itemName);

      let qty = Array.isArray(rolled.quantity)
        ? rollItemQuantity(rolled.quantity[0], rolled.quantity[1])
        : rolled.quantity;

      // ------------------------------------------------------------
      // HERB → SEED CONVERSION (1/3 chance)
      // 1 seed per 7 herbs, rounding UP
      // ------------------------------------------------------------
      if (table === "herbs" && Math.random() < 1 / 3) {
        const seedQty = Math.ceil(qty / 7);

        // Herb name → seed name
        // Grimy toadflax (noted) → Toadflax seed (noted)
        let seedName = rolled.item
          .replace(/^Grimy\s+/i, "")
          .replace(/\s*\(noted\)\s*$/i, "")
          .trim();

        seedName = `${seedName} seed${seedQty > 1 ? "s" : ""}`;

        drops.push({
          dropTable: table,
          item: seedName,
          quantity: seedQty,
          tablePath: rolled.tablePath,
          type: rolled.type,
          cLog: rolled.cLog,
          dropInfo: { name: seedName, type: rolled.type }, // minimal info for dynamic drops
        });

        // drops.push({
        //   dropTable: table,
        //   item: seedName,
        //   quantity: seedQty,
        //   tablePath: rolled.tablePath,
        //   type: rolled.type,
        //   cLog: rolled.cLog,
        // });
      } else {
        // Normal drop
        drops.push({
          dropTable: table,
          item: rolled.item,
          quantity: qty,
          tablePath: rolled.tablePath,
          type: rolled.type,
          cLog: rolled.cLog,
        });
      }

      accepted = true;
    }
  }

  // ------------------------------------------------------------
  // 4. TERTIARY DROPS (NO UNIQUE)
  // All tertiaries EXCEPT Olmlet
  // ------------------------------------------------------------
  const tertsNoUnique = raid.tertiaryDrops ?? [];
  for (const tert of tertsNoUnique) {
    if (tert.name === "Olmlet") continue; // unique-only tertiary
    if (Math.random() < (tert.rarity ?? 0)) {
      drops.push({
        dropTable: "tertiary",
        item: tert.name,
        quantity: 1,
        type: tert.type,
        cLog: tert.cLog,
      });
    }
  }
  //   console.log("DEBUG:", pointsEarned, options);
  return drops;
}

// export function chambersDropFunction(raid, options = {}, helpers = {}) {
//   const { getItems, rollForRaidItem, rollItemQuantity } = helpers;
//   if (!raid) return [];

//   const drops = [];
//   const pointsEarned = options.pointsEarned ?? 0;

//   // Unique (pre-roll)
//   if (
//     typeof raid.uMod === "number" &&
//     raid.uMod > 0 &&
//     raid.dropTables?.unique
//   ) {
//     const uniqueChance = Math.min(pointsEarned / (raid.uMod * 100), 1); //did /100 to make it 1%
//     if (Math.random() < uniqueChance) {
//       //Unique rolls exactly 1 unique if hit
//       const uniqueDrop = rollForRaidItem(raid, "unique");
//       if (uniqueDrop) {
//         //handle arrays vs single
//         if (Array.isArray(uniqueDrop)) {
//           uniqueDrop.forEach((d) =>
//             drops.push({
//               dropTable: "unique",
//               item: d.item,
//               quantity: Array.isArray(d.quantity)
//                 ? rollItemQuantity(d.quantity[0], d.quantity[1])
//                 : d.quantity,
//               tablePath: d.tablePath,
//               type: d.type,
//               cLog: d.cLog,
//             })
//           );
//         } else if (uniqueDrop.item) {
//           drops.push({
//             dropTable: "unique",
//             item: uniqueDrop.item,
//             quantity: Array.isArray(uniqueDrop.quantity)
//               ? rollItemQuantity(uniqueDrop.quantity[0], uniqueDrop.quantity[1])
//               : uniqueDrop.quantity,
//             tablePath: uniqueDrop.tablePath,
//             type: uniqueDrop.type,
//             cLog: uniqueDrop.cLog,
//           });
//         }
//       }

//       //Tertiary: Olmlet ONLY when unique
//       const terts = raid.tertiaryDrops ?? [];
//       terts.forEach((tert) => {
//         if (tert.name === "Olmlet") {
//           if (Math.random() < tert.rarity) {
//             drops.push({
//               dropTable: "tertiary",
//               item: tert.name,
//               quantity: 1,
//               type: tert.type,
//               cLog: tert.cLog,
//             });
//           }
//         } else {
//           if (Math.random() < tert.rarity) {
//             drops.push({
//               dropTable: "tertiary",
//               item: tert.name,
//               quantity: 1,
//               type: tert.type,
//               cLog: tert.cLog,
//             });
//           }
//         }
//       });

//       // Unique was exclusive: retuirn only unique + terts
//       return drops;
//     }
//   }

//   // No Unique: Common loot (2 rolls that aren't the same)
//   const commonTables = ["ammo", "herbs", "mining", "other"];
//   const seenItems = new Set();

//   for (let roll = 0; roll < 2; roll++) {
//     let attempts = 0;
//     let accepted = false;

//     while (!accepted && attempts < 30) {
//       attempts++;
//       const table =
//         commonTables[Math.floor(Math.random() * commonTables.length)];
//       const rolled = rollForRaidItem(raid, table);
//       if (!rolled || !rolled.item) continue;

//       const itemName = rolled.item;

//       // Prevent dupes across the two rolls

//       if (seenItems.has(itemName)) {
//         continue; // pick again
//       }

//       // Accept this item
//       seenItems.add(itemName);

//       let finalQuantity = Array.isArray(rolled.quantity)
//         ? rollItemQuantity(rolled.quantity[0], rolled.quantity[1])
//         : rolled.quantity;

//       // Herb -> seed conversion : 1/3 chance to convert herb amount into seeds
//       if (table === "herbs" && Math.random() < 1 / 3) {
//         // We'll convert to seeds. Determine seeds per 7 herbs, rounding up
//         // Need to compute seedCount = ceil(finalQuantity / 7)
//         const seedCount = Math.ceil(finalQuantity / 7);

//         //Replace herb name with seed name
//         let seedName = itemName
//           .replace(/^Grimy\s+/i, "")
//           .replace(/\s*\(noted\)\s*$/i, "")
//           .trim();
//         seedName = `${seedName} seed${seedCount > 1 ? "s" : ""}`;

//         drops.push({
//           dropTable: table,
//           item: seedName,
//           quantity: seedCount,
//           tablePath: rolled.tablePath,
//           type: rolled.type,
//           cLog: rolled.cLog,
//         });
//       } else {
//         // Normal push
//         drops.push({
//           dropTable: table,
//           item: itemName,
//           quantity: finalQuantity,
//           tablePath: rolled.tablePath,
//           type: rolled.type,
//           cLog: rolled.cLog,
//         });
//       }

//       accepted = true;
//     } // end attempts while
//   } //end two-roll loop

//   // Tertiary when no unique
//   const tertsNoUnique = raid.tertiaryDrops ?? [];
//   tertsNoUnique.forEach((tert) => {
//     if (tert.name === "Olmlet") return; // Olmlet only with unique
//     if (Math.random() < tert.rarity) {
//       drops.push({
//         dropTable: "tertiary",
//         item: tert.name,
//         quantity: 1,
//         type: tert.type,
//         cLog: tert.cLog,
//       });
//     }
//   });

//   return drops;
// }

export const Chambers = new Raid("Chambers", {
  key: "CoX",
  name: "Chambers",
  doubleRoll: true,
  preRoll: { table: "unique", everyRoll: false },
  uMod: 8676,
  dropFunction: chambersDropFunction,
  dropTables: {
    unique,
    ammo,
    herbs,
    mining,
    other,
  },
  tertiaryDrops: tertiary,
});

//uMod = Unique Modifier
