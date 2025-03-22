"use strict";

function rollRandomNumber(max) {
  return Math.floor(Math.random() * max);
}

function rollItemQuantity(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//I actually need to make the Rare Drop Table its own thing because pretty much everything can access it (even though it sucks)

const rareDropTable = {
  "rare ammo": [
    { item: "Nature rune", quantity: 67, rarity: 1 / 42.67 },
    { item: "Adamant javelin", quantity: 20, rarity: 1 / 64 },
    { item: "Death rune", quantity: 45, rarity: 1 / 64 },
    { item: "Law rune", quantity: 45, rarity: 1 / 64 },
    { item: "Rune arrow", quantity: 42, rarity: 1 / 64 },
    { item: "Steel arrow", quantity: 150, rarity: 1 / 64 },
  ],
  "rare equipment": [
    { item: "Rune 2h sword", quantity: 1, rarity: 1 / 42.67 },
    { item: "Rune battleaxe", quantity: 1, rarity: 1 / 42.67 },
    { item: "Rune sq shield", quantity: 1, rarity: 1 / 64 },
    { item: "Dragon med helm", quantity: 1, rarity: 1 / 128 },
    { item: "Rune kiteshield", quantity: 1, rarity: 1 / 128 },
  ],
  "rare other": [
    { item: "Coins", quantity: 3000, rarity: 1 / 6.095 },
    { item: "Loop half of key", quantity: 1, rarity: 1 / 6.4 },
    { item: "Tooth half of key", quantity: 1, rarity: 1 / 6.4 },
    { item: "Runite bar", quantity: 1, rarity: 1 / 25.6 },
    { item: "Dragonstone", quantity: 1, rarity: 1 / 64 },
    { item: "Silver ore (noted)", quantity: 100, rarity: 1 / 64 },
  ],
  "sub-tables": [
    { item: "Gem table", quantity: 1, rarity: 1 / 6.4, type: "table" },
    { item: "Mega Rare table", quantity: 1, rarity: 1 / 8.533, type: "table" },
  ],
  "Gem table": [
    { item: "Nothing", quantity: 1, rarity: 1 / 2.032 },
    { item: "Uncut sapphire", quantity: 1, rarity: 1 / 4 },
    { item: "Uncut emerald", quantity: 1, rarity: 1 / 8 },
    { item: "Uncut ruby", quantity: 1, rarity: 1 / 16 },
    { item: "Chaos talisman", quantity: 1, rarity: 1 / 42.67 },
    { item: "Nature talisman", quantity: 1, rarity: 1 / 42.67 },
    { item: "Uncut diamond", quantity: 1, rarity: 1 / 64 },
    { item: "Rune javelin", quantity: 1, rarity: 1 / 128 },
    { item: "Loop half of key", quantity: 1, rarity: 1 / 128 },
    { item: "Tooth half of key", quantity: 1, rarity: 1 / 128 },
    { item: "Mega Rare table", quantity: 1, rarity: 1 / 128, type: "table" },
  ],
  "Mega Rare table": [
    { item: "Nothing (Mega Rare)", quantity: 1, rarity: 1 / 1.133 },
    { item: "Rune spear", quantity: 1, rarity: 1 / 16 },
    { item: "Shield left half", quantity: 1, rarity: 1 / 32 },
    { item: "Dragon spear", quantity: 1, rarity: 1 / 42.67 },
  ],
};

//Now we gotta set up the bosses. To keep it in line with OSRS, unfortunately every boss gets it's own individual drop tables.

const bosses = {
  Zulrah: {
    doubleRoll: true,
    tripleRoll: false,
    rDT: true,
    rDTChance: 9 / 248,
    tertiaryDrops: [
      { item: "Clue Scroll (Elite)", quantity: 1, rarity: 1 / 75 },
      { item: "Jar of Swamp", quantity: 1, rarity: 1 / 3000 },
      { item: "Pet Snakeling", quantity: 1, rarity: 1 / 4000 },
    ],
    dropTables: {
      always: [{ item: "Zulrah's scales", quantity: [100, 299] }],
      unique: [
        { item: "Tanzanite fang", quantity: 1, rarity: 2 * (1 / 1024) },
        { item: "Magic fang", quantity: 1, rarity: 2 * (1 / 1024) },
        { item: "Serpentine visage", quantity: 1, rarity: 2 * (1 / 1024) },
        { item: "Uncut onyx", quantity: 1, rarity: 2 * (1 / 1024) },
      ],
      mutagen: [
        { item: "Tanzanite mutagen", quantity: 1, rarity: 2 * (1 / 13106) },
        { item: "Magma mutagen", quantity: 1, rarity: 2 * (1 / 13106) },
      ],
      equipment: [
        { item: "Battlestaff (noted)", quantity: 10, rarity: 2 * (1 / 24.8) },
        { item: "Dragon med helm", quantity: 1, rarity: 2 * (1 / 124) },
        { item: "Dragon halberd", quantity: 1, rarity: 2 * (1 / 124) },
      ],
      runes: [
        { item: "Death rune", quantity: 300, rarity: 2 * (1 / 20.67) },
        { item: "Law rune", quantity: 200, rarity: 2 * (1 / 20.67) },
        { item: "Chaos rune", quantity: 500, rarity: 2 * (1 / 20.67) },
      ],
      herbs: [
        { item: "Snapdragon (noted)", quantity: 10, rarity: 2 * (1 / 124) },
        { item: "Dwarf weed (noted)", quantity: 30, rarity: 2 * (1 / 124) },
        { item: "Toadflax (noted)", quantity: 25, rarity: 2 * (1 / 124) },
        { item: "Torstol (noted)", quantity: 10, rarity: 2 * (1 / 124) },
      ],
      seeds: [
        { item: "Palm tree seed", quantity: 1, rarity: 2 * (1 / 41.33) },
        { item: "Papaya tree seed", quantity: 1, rarity: 2 * (1 / 41.33) },
        { item: "Calquat tree seed", quantity: 1, rarity: 2 * (1 / 41.33) },
        { item: "Magic seed", quantity: 1, rarity: 2 * (1 / 62) },
        { item: "Toadflax seed", quantity: 1, rarity: 2 * (1 / 124) },
        { item: "Snapdragon seed", quantity: 1, rarity: 2 * (1 / 124) },
        { item: "Dwarf weed seed", quantity: 1, rarity: 2 * (1 / 124) },
        { item: "Torstol seed", quantity: 1, rarity: 2 * (1 / 124) },
        { item: "Spirit seed", quantity: 1, rarity: 2 * (1 / 248) },
      ],
      resources: [
        { item: "Snakeskin (noted)", quantity: 35, rarity: 2 * (1 / 22.55) },
        { item: "Runite ore (noted)", quantity: 2, rarity: 2 * (1 / 22.55) },
        {
          item: "Pure essence (noted)",
          quantity: 1500,
          rarity: 2 * (1 / 24.8),
        },
        { item: "Flax (noted)", quantity: 1000, rarity: 2 * (1 / 24.8) },
        { item: "Yew logs (noted)", quantity: 35, rarity: 2 * (1 / 24.8) },
        {
          item: "Adamantite bar (noted)",
          quantity: 20,
          rarity: 2 * (1 / 31),
        },
        { item: "Coal (noted)", quantity: 200, rarity: 2 * (1 / 31) },
        { item: "Dragon bones (noted)", quantity: 12, rarity: 2 * (1 / 31) },
        {
          item: "Mahogany logs (noted)",
          quantity: 50,
          rarity: 2 * (1 / 31),
        },
      ],
      other: [
        { item: "Zul-Andra teleport", quantity: 4, rarity: 2 * (1 / 16.53) },
        { item: "Manta ray (noted)", quantity: 35, rarity: 2 * (1 / 20.67) },
        { item: "Antidote++ (noted)", quantity: 10, rarity: 2 * (1 / 20.67) },
        {
          item: "Dragonstone bolt tips",
          quantity: 12,
          rarity: 2 * (1 / 20.67),
        },
        { item: "Grapes (noted)", quantity: 250, rarity: 2 * (1 / 20.67) },
        { item: "Coconut (noted)", quantity: 20, rarity: 2 * (1 / 20.67) },
        { item: "Swamp tar", quantity: 1000, rarity: 2 * (1 / 20.67) },
        { item: "Zulrah's scales", quantity: 500, rarity: 2 * (1 / 20.67) },
      ],
    },
  } /*Zulrah ends here*/,
};

// console.log(typeof bosses.Zulrah.dropTables);
// console.log(typeof bosses.Zulrah.dropTables.unique);
// console.log(bosses.Zulrah.dropTables.unique);

function calculateTableProbabilities(boss) {
  let tableChances = {};

  //Add Rare Drop Table if boss has access

  if (boss.rDT && !boss.dropTables.rareDropTable) {
    boss.dropTables.rareDropTable = rareDropTable;
    console.log("Adding Rare Drop Table to boss!");
  }

  for (const [table, items] of Object.entries(boss.dropTables)) {
    if (table === "always" || !Array.isArray(items)) continue;
    //Might remove everything after || but testing for now.
    let tableChance = items.reduce((sum, item) => sum + (item.rarity || 0), 0);
    tableChances[table] = tableChance;
  }
  //Adding in rareDropTable chances for calculation
  if (boss.rDT) {
    tableChances["rareDropTable"] = boss.rDTChance;
  }

  let totalChance = Object.values(tableChances).reduce(
    (sum, chance) => sum + chance,
    0
  );
  // console.log("total chance:", totalChance);
  // console.log("table chances:", tableChances);
  let tableChancesPercent = {};
  for (const [table, chance] of Object.entries(tableChances)) {
    tableChancesPercent[table] = (chance / totalChance) * 100;
    // console.log(Object.entries(tableChances));
    // parseFloat(((chance / totalChance) * 100).toFixed(2));
  }
  // console.log(tableChancesPercent);
  // console.log("Table Chances Breakdown:", tableChances);
  // console.log("Total Chance Sum:", totalChance);
  // console.log("This is the %", tableChancesPercent);
  return tableChancesPercent;
}
// console.log(calculateTableProbabilities(bosses.Zulrah));
//This shows the % chance for each table accessible by Zulrah

//Okay so this is for sure returning the table chances as %. I might try and make another function to get all these values and get them to 2 decimal places with .toFixed(2) and then just create a table out of them.

//Need drop logic now, will recycle code from genericDrops. Gonna need to change it to work with boss drops though.

function getBossDropTable(boss) {
  let tableChances = calculateTableProbabilities(boss);
  let roll = rollRandomNumber(100);
  let accumulatedChance = 0;

  for (const [table, chance] of Object.entries(tableChances)) {
    accumulatedChance += chance;
    if (roll <= accumulatedChance) {
      if (table === "unique") {
        playUniqueDropSound();
      }
      return table;
    }
  }
  console.log(
    "This should return 'other' from dropTables if nothing else hits, because thats the most common table"
  );
  return "other";
}

//This seems to be rolling correctly for a table.
// console.log("This is getting a table: ", getBossDropTable(bosses.Zulrah));

// This is broken, will have to try and fix.

function rollForBossItem(boss, tableName) {
  let table;

  if (tableName === "rareDropTable") {
    if (
      !boss.dropTables.rareDropTable ||
      !boss.dropTables.rareDropTable["sub-tables"]
    ) {
      console.error(
        `Error: rareDropTable or its sub-tables are missing for ${
          Object.keys(bosses).find((name) => bosses[name] === boss) ||
          "Unknown Boss"
        }`
      );

      return null;
    }

    let roll = Math.random();
    let accumulatedChance = 0;

    for (const subTable of boss.dropTables.rareDropTable["sub-tables"]) {
      accumulatedChance += subTable.rarity;
      if (roll <= accumulatedChance) {
        console.log(`Rolled into RDT Sub-Table: ${subTable.item}`);
        return rollForBossItem(boss, subTable.item);
      }
    }
    console.warn("RDT did not hit any sub-tables");
    return null;
  } else if (rareDropTable[tableName]) {
    table = rareDropTable[tableName];
    //This is saying if its an internal table, we use it

    console.log(`This is the internal  *${tableName}* table of the RDT`);
  } else {
    table = boss.dropTables[tableName];
    //This is saying, otherwise use the normal drop tables
  }

  //This is for testing and failsafe
  if (!table || !Array.isArray(table) || table.length === 0) {
    console.error(
      `Table "${tableName}" is either missing, not an array, or empty!`,
      table
    );
    return null;
  }

  let totalWeight = table.reduce((sum, item) => sum + (item.rarity || 0), 0);
  //This is for testing
  if (totalWeight === 0) {
    console.log("Total Weight is 0 for some reason");
    return null;
  }

  let roll = Math.random() * totalWeight;

  //This was breaking the roll. Fixed it right above.
  // let roll = rollRandomNumber() * totalWeight;
  //Something is breaking right here. Roll shows up as 1 (when function(totalWeight)) or NaN (when function() * totalWeight)

  let cumulativeWeight = 0;
  for (const item of table) {
    cumulativeWeight += item.rarity;
    if (roll <= cumulativeWeight) {
      console.log(`Selected item: ${item.item}`);

      if (item.type === "table") {
        console.log(`Type = Table! Entering sub-table: ${item.item}`);
        return rollForBossItem(boss, item.item);
      }
      return { item: item.item, quantity: item.quantity || 1 };
    }
  }
  console.warn(`No item found in ${tableName}`);
  return null;
}
// console.log(rollForBossItem(bosses.Zulrah));

function rollForTertiaryDrop(boss) {
  if (!boss.tertiaryDrops || boss.tertiaryDrops.length === 0) return null;

  //We're just going to generate a random roll, I feel the issue came when we grouped everything up with totalWeight and cumulativeWeight.

  let roll = Math.random();
  console.log(`Tertiary roll: ${roll}.`);

  //Loop through tertiary items and roll for each INDIVIDUALLY
  for (const item of boss.tertiaryDrops) {
    const roll = Math.random();
    if (roll <= item.rarity) {
      console.log(`Tertiary roll: ${roll}, and result: ${item.item}`);
      return { item: item.item, quantity: item.quantity || 1 };
    }
  }

  //If no item matches, return null (No drop occurs. THIS SHOULD BE COMMON)
  console.log("No tertiary drop.");
  return null;
}

//Nothing below this worked as intended, and caused a tertiary drop to be granted on EVERY kill.

//Leaving it so I can see it for now.

//   /* If we need Scaling we can uncomment these

//   //Need a scaling factor to make the weights more noticeable. Without this we kept rolling a clue drop on EVERY kill

//   const scaleFactor = 10000; //Can adjust if needed */

//   //Scale the rarity IF NEEDED
//   let totalWeight = boss.tertiaryDrops.reduce(
//     (sum, item) => sum + item.rarity,
//     0
//   );
//   //log total weight (scaled)
//   console.log(`Tertiary total weights: ${totalWeight}.`);
//   let roll = Math.random() * totalWeight;
//   //log random roll value
//   console.log(`Tertiary roll: ${roll}.`);

//   let cumulativeWeight = 0;
//   for (const item of boss.tertiaryDrops) {
//     //Scale the cumulative weight IF NEEDED
//     cumulativeWeight += item.rarity /** scaleFactor*/;
//     //log cumulative weight
//     console.log(`Tertiary cumulative weight: ${cumulativeWeight}.`);
//     if (roll <= cumulativeWeight) {
//       console.log(`Tertiary roll: ${roll}, and result: ${item.item}`);
//       return { item: item.item, quantity: item.quantity || 1 };
//     }
//   }
//   console.log("No tertiary drop");
//   return null;
// }

//Using generate function to set up reroll button in the modal later on
let lastBossRolled = null;
let lastBossName = "";
//This is where we'll store the last boss rolled

function generateBossDrop(boss) {
  let rolls = 1; //Default to one roll

  //Check for special drop rules

  if (boss.doubleRoll) {
    rolls = 2;
  }
  if (boss.tripleRoll) {
    rolls = 3;
  }

  let drops = [];
  // console.log("1. drops when it was made", drops);
  //Roll the appropriate number of times

  //Setting up guaranteed drops

  if (boss.dropTables.always) {
    boss.dropTables.always.forEach(({ item, quantity }) => {
      let finalQuantity = Array.isArray(quantity)
        ? rollItemQuantity(quantity[0], quantity[1])
        : quantity;
      drops.push({
        dropTable: "always",
        item,
        quantity: finalQuantity,
      });
    });
  }

  /* This is purely to roll 100 times and check for specific drops
  let rareDrop = null;
  let attempts = 0;
  let maxAttempts = 100;

  while (!rareDrop && attempts < maxAttempts) {
    let dropTable = getBossDropTable(boss);
    let itemDrop = rollForBossItem(boss, dropTable);

    if (itemDrop) {
      let finalQuantity = Array.isArray(itemDrop.quantity)
        ? rollItemQuantity(itemDrop.quantity[0], itemDrop.quantity[1])
        : itemDrop.quantity;

      drops.push({
        dropTable,
        item: itemDrop.item,
        quantity: finalQuantity,
      });

      if (dropTable === "rareDropTable") {
        rareDrop = itemDrop;
      }
    }
    attempts++;
  }

  if (!rareDrop) {
    console.warn("Failed to find a rare drop after", maxAttempts, "attempts");
  }
    */

  //Roll for regular drops

  for (let i = 0; i < rolls; i++) {
    let dropTable = getBossDropTable(boss);
    // console.log("Drop Table in generate boss drop", dropTable);
    let itemDrop = rollForBossItem(boss, dropTable);
    // console.log("Item Drop in generate boss drop", itemDrop);

    // console.log("2. drops ater table and ItemDrop", drops);

    if (itemDrop) {
      let finalQuantity = Array.isArray(itemDrop.quantity)
        ? rollItemQuantity(itemDrop.quantity[0], itemDrop.quantity[1])
        : itemDrop.quantity;

      drops.push({
        dropTable,
        item: itemDrop.item,
        quantity: finalQuantity,
      });
      // console.log("drops INSIDE if:", drops);
    }
  }
  let tertiaryDrop = rollForTertiaryDrop(boss);
  if (tertiaryDrop) {
    drops.push({
      dropTable: "tertiary",
      item: tertiaryDrop.item,
      quantity: tertiaryDrop.quantity,
    });
  }

  //We're gonna populate the modal here using a separate function
  lastBossRolled = boss;
  lastBossName =
    Object.keys(bosses).find((name) => bosses[name] === boss) || "Unknown Boss";
  populateBossDropModal(drops);
}

function populateBossDropModal(drops) {
  const bossDropResultText = document.getElementById("bossDropResultText");

  //Clear previous drop content
  bossDropResultText.textContent = "";

  let bossName = lastBossName;
  // console.log(lastBossName);
  let tertiaryDrop = null;

  //Loop through each drop and display it
  drops.forEach(({ dropTable, item, quantity }) => {
    const bossDropTableText = document.createElement("p");

    if (dropTable === "always") {
      // console.log(bossName);
      bossDropTableText.textContent = `You received ${bossName} drop: ${quantity}x ${item}!`;
      bossDropResultText.appendChild(bossDropTableText);
    } else if (dropTable === "tertiary") {
      //Store the tertiary drop here to append later
      tertiaryDrop = { item, quantity };
    } else {
      let formattedDropTable = dropTable
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .toUpperCase();

      if (dropTable === "rareDropTable") {
        bossDropTableText.textContent = `You hit the RARE DROP TABLE!`;
      } else {
        bossDropTableText.textContent = `You hit the ${formattedDropTable} drop table!`;
      }

      const bossItemDropText = document.createElement("p");
      bossItemDropText.textContent = `You received: ${quantity}x ${item}!`;

      bossDropResultText.appendChild(bossDropTableText);
      bossDropResultText.appendChild(bossItemDropText);
    }
  });

  if (tertiaryDrop) {
    const tertiaryDropText = document.createElement("p");
    tertiaryDropText.textContent = `You rolled a TERTIARY drop: ${tertiaryDrop.quantity}x ${tertiaryDrop.item}!`;
    bossDropResultText.appendChild(tertiaryDropText);
  }

  //pop up the modal
  document.getElementById("bossDropModal").style.display = "flex";
}

function closeModal(event) {
  const modal = event.target.closest(".modal");
  modal.style.display = "none";
}

function openBossSelectionModal() {
  document.getElementById("bossSelectionModal").style.display = "flex";
}

function slayBoss(event) {
  const selectedBoss = event.target.getAttribute("boss-data");
  // console.log("Selected Boss:", selectedBoss);
  const boss = bosses[selectedBoss];
  // console.log(boss);

  closeModal(event);

  generateBossDrop(boss);
}

document.querySelectorAll(".bossSlay").forEach((button) => {
  button.addEventListener("click", slayBoss);
});

//This did not work

// document.querySelectorAll(".bossSlay").forEach((button) => {
//   button.addEventListener("click", function () {
//     const bossName = button.getAttribute("boss-data");
//     const drops = generateBossDrop(bossName);

//     populateBossDropModal(drops);
//   });
// });

function playUniqueDropSound() {
  let audio = new Audio("../assets/Unique_sound.ogg");
  audio.play();
}

function testTertiaryDropRate(boss, runs = 100) {
  let tertiaryCount = 0;

  for (let i = 0; i < runs; i++) {
    let terDrop = rollForTertiaryDrop(boss);

    if (terDrop) {
      tertiaryCount++;
      console.log(
        `Run ${i + 1}: Tertiary drop - ${terDrop.item} x ${terDrop.quantity}`
      );
    }
  }

  console.log(
    `Out of ${runs} kills, tertiary drops occurred ${tertiaryCount} times.`
  );
  console.log(`Drop rate: ${(tertiaryCount / runs) * 100}%`);
}
