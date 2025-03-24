"use strict";

function rollRandomNumber(max) {
  return Math.floor(Math.random() * max);
}

function rollItemQuantity(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

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

const bosses = {
  Zulrah: {
    doubleRoll: true,
    tripleRoll: false,
    rDT: true,
    rDTChance: 9 / 248,
    tertiaryDrops: [
      { item: "Clue Scroll (Elite)", quantity: 1, rarity: 1 / 75 },
      { item: "Jar of Swamp", quantity: 1, rarity: 1 / 3000 },
      { item: "Pet Snakeling", quantity: 1, rarity: 1 / 4000, type: "pet" },
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
  Vorkath: {
    doubleRoll: true,
    tripleRoll: false,
    rDT: true,
    rDTChance: 5 / 150,
    tertiaryDrops: [
      {
        item: "Scaly blue dragonhide",
        quantity: 1,
        rarity: 1 / 10,
      },
      { item: "Vorkath's Head", quantity: 1, rarity: 1 / 50 },
      { item: "Clue Scroll (Elite)", quantity: 1, rarity: 1 / 65 },
      { item: "Dragonbone Necklace", quantity: 1, rarity: 1 / 1000 },
      { item: "Jar of Decay", quantity: 1, rarity: 1 / 3000 },
      { item: "Vorki", quantity: 1, rarity: 1 / 3000, type: "pet" },
      { item: "Draconic Visage", quantity: 1, rarity: 1 / 5000 },
      { item: "Skeletal Visage", quantity: 1, rarity: 1 / 5000 },
    ],
    dropTables: {
      always: [
        { item: "Superior dragon bones", quantity: 2 },
        { item: "Blue dragonhide", quantity: 2 },
      ],
      equipment: [
        { item: "Rune longsword", quantity: [2, 3], rarity: 2 * (1 / 30) },
        { item: "Rune kiteshield", quantity: [2, 3], rarity: 2 * (1 / 30) },
        {
          item: "Battlestaff (noted)",
          quantity: [5, 15],
          rarity: 2 * (1 / 37.5),
        },
        { item: "Dragon battleaxe", quantity: 1, rarity: 2 * (1 / 75) },
        { item: "Dragon longsword", quantity: 1, rarity: 2 * (1 / 75) },
        { item: "Dragon platelegs", quantity: 1, rarity: 2 * (1 / 75) },
        { item: "Dragon plateskirt", quantity: 1, rarity: 2 * (1 / 75) },
      ],
      runes: [
        { item: "Chaos rune", quantity: [650, 1000], rarity: 2 * (1 / 25) },
        { item: "Death rune", quantity: [300, 500], rarity: 2 * (1 / 25) },
        { item: "Wrath rune", quantity: [30, 60], rarity: 2 * (1 / 50) },
      ],
      dragonhide: [
        {
          item: "Blue dragonhide (noted)",
          quantity: [25, 30],
          rarity: 2 * (1 / 18.75),
        },
        {
          item: "Green dragonhide (noted)",
          quantity: [25, 30],
          rarity: 2 * (1 / 21.43),
        },
        {
          item: "Red dragonhide (noted)",
          quantity: [20, 25],
          rarity: 2 * (1 / 21.43),
        },
        {
          item: "Black dragonhide (noted)",
          quantity: [15, 25],
          rarity: 2 * (1 / 21.43),
        },
      ],
      fletching: [
        {
          item: "Dragon bolts (unf)",
          quantity: [50, 100],
          rarity: 2 * (1 / 18.75),
        },
        { item: "Dragon dart tip", quantity: [10, 50], rarity: 2 * (1 / 25) },
        {
          item: "Dragonstone bolt tips",
          quantity: [11, 25],
          rarity: 2 * (1 / 30),
        },
        { item: "Onyx bolt tips", quantity: [5, 10], rarity: 2 * (1 / 37.5) },
        { item: "Rune dart tip", quantity: [75, 100], rarity: 2 * (1 / 50) },
        { item: "Dragon arrowtips", quantity: [25, 50], rarity: 2 * (1 / 50) },
        {
          item: "Diamond bolt tips",
          quantity: [25, 30],
          rarity: 2 * (1 / 111),
        },
        {
          item: "Emerald bolt tips",
          quantity: [25, 30],
          rarity: 2 * (1 / 138.8),
        },
        { item: "Ruby bolt tips", quantity: [25, 30], rarity: 2 * (1 / 138.8) },
        {
          item: "Dragonstone bolt tips",
          quantity: [25, 30],
          rarity: 2 * (1 / 185),
        },
        { item: "Onyx bolt tips", quantity: [25, 30], rarity: 2 * (1 / 370) },
        {
          item: "Sapphire bolt tips",
          quantity: [25, 30],
          rarity: 2 * (1 / 555),
        },
      ],
      seeds: [
        { item: "Snapdragon seed", quantity: 1, rarity: 2 * (1 / 112.3) },
        { item: "Torstol seed", quantity: 1, rarity: 2 * (1 / 118.7) },
        { item: "Ranarr seed", quantity: 1, rarity: 2 * (1 / 416.7) },
        { item: "Watermelon seed", quantity: 15, rarity: 2 * (1 / 595.2) },
        { item: "Willow seed", quantity: 1, rarity: 2 * (1 / 625) },
        { item: "Mahogany seed", quantity: 1, rarity: 2 * (1 / 694.4) },
        { item: "Maple seed", quantity: 1, rarity: 2 * (1 / 694.4) },
        { item: "Teak seed", quantity: 1, rarity: 2 * (1 / 694.4) },
        { item: "Yew seed", quantity: 1, rarity: 2 * (1 / 694.4) },
        { item: "Papaya tree seed", quantity: 1, rarity: 2 * (1 / 892.9) },
        { item: "Magic seed", quantity: 1, rarity: 2 * (1 / 1136) },
        { item: "Palm tree seed", quantity: 1, rarity: 2 * (1 / 1250) },
        { item: "Spirit seed", quantity: 1, rarity: 2 * (1 / 1562) },
        { item: "Dragonfruit tree seed", quantity: 1, rarity: 2 * (1 / 2083) },
        { item: "Celastrus seed", quantity: 1, rarity: 2 * (1 / 3125) },
        { item: "Redwood tree seed", quantity: 1, rarity: 2 * (1 / 3125) },
      ],
      other: [
        {
          item: "Adamantite ore (noted)",
          quantity: [10, 30],
          rarity: 2 * (1 / 21.43),
        },
        { item: "Coins", quantity: [20000, 81000], rarity: 2 * (1 / 30) },
        { item: "Grapes (noted)", quantity: [250, 300], rarity: 2 * (1 / 30) },
        { item: "Magic logs (noted)", quantity: 50, rarity: 2 * (1 / 30) },
        {
          item: "Manta ray (noted)",
          quantity: [35, 55],
          rarity: 2 * (1 / 37.5),
        },
        {
          item: "Dragon bones (noted)",
          quantity: [15, 20],
          rarity: 2 * (1 / 37.5),
        },
        { item: "Diamond (noted)", quantity: [10, 20], rarity: 2 * (1 / 37.5) },
        { item: "Dragonstone (noted)", quantity: [2, 3], rarity: 2 * (1 / 50) },
        { item: "Wrath talisman", quantity: 1, rarity: 2 * (1 / 50) },
      ],
    },
  },
};

function calculateTableProbabilities(boss) {
  let tableChances = {};

  //Add Rare Drop Table if boss has access

  if (boss.rDT && !boss.dropTables.rareDropTable) {
    boss.dropTables.rareDropTable = rareDropTable;
    console.log("Adding Rare Drop Table to boss!");
  }

  for (const [table, items] of Object.entries(boss.dropTables)) {
    if (table === "always" || !Array.isArray(items)) continue;
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
  let tableChancesPercent = {};
  for (const [table, chance] of Object.entries(tableChances)) {
    tableChancesPercent[table] = (chance / totalChance) * 100;
  }
  return tableChancesPercent;
}

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

function rollForTertiaryDrop(boss) {
  if (!boss.tertiaryDrops || boss.tertiaryDrops.length === 0) return null;

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

//Can implement a SCALING FACTOR, but should not be needed

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

  //Roll for regular drops

  for (let i = 0; i < rolls; i++) {
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
