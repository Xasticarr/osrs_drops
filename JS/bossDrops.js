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
      { item: "Jar of Swamp", quantity: 1, rarity: 1 / 3000, bigChime: true },
      {
        item: "Pet Snakeling",
        quantity: 1,
        rarity: 1 / 4000,
        type: "pet",
        bigChime: true,
      },
    ],
    dropTables: {
      always: [{ item: "Zulrah's scales", quantity: [100, 299] }],
      unique: [
        {
          item: "Tanzanite fang",
          quantity: 1,
          rarity: 2 * (1 / 1024),
          chime: true,
        },
        {
          item: "Magic fang",
          quantity: 1,
          rarity: 2 * (1 / 1024),
          chime: true,
        },
        {
          item: "Serpentine visage",
          quantity: 1,
          rarity: 2 * (1 / 1024),
          chime: true,
        },
        {
          item: "Uncut onyx",
          quantity: 1,
          rarity: 2 * (1 / 1024),
          chime: true,
        },
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
  }, //Zulrah ends here
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
      { item: "Jar of Decay", quantity: 1, rarity: 1 / 3000, bigChime: true },
      {
        item: "Vorki",
        quantity: 1,
        rarity: 1 / 3000,
        type: "pet",
        bigChime: true,
      },
      { item: "Draconic Visage", quantity: 1, rarity: 1 / 5000, chime: true },
      { item: "Skeletal Visage", quantity: 1, rarity: 1 / 5000, chime: true },
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
  }, //Vorkath ends here
  Muspah: {
    doubleRoll: true,
    tripleRoll: false,
    rDT: true,
    rDTChance: 5 / 220,
    preRoll: { table: "unique", everyRoll: false },
    tertiaryDrops: [
      { item: "Clue Scroll (Hard)", quantity: 1, rarity: 1 / 30 },
      { item: "Clue Scroll (Elite)", quantity: 1, rarity: 1 / 45 },
      {
        item: "Muphin",
        quantity: 1,
        rarity: 1 / 2500,
        type: "pet",
        bigChime: true,
      },
    ],
    dropTables: {
      unique: [
        { item: "Ancient essence", quantity: [540, 599], rarity: 1 / 1.667 },
        { item: "Ancient essence", quantity: [885, 995], rarity: 1 / 4.348 },
        { item: "Ancient essence", quantity: [1970, 2060], rarity: 1 / 10 },
        { item: "Frozen cache", quantity: 1, rarity: 1 / 25 },
        { item: "Ancient icon", quantity: 1, rarity: 1 / 50 },
        {
          item: "Venator shard",
          quantity: 1,
          rarity: 1 / 100,
          exclusive: true,
          chime: true,
        },
      ],
      supplies: [
        {
          item: "Shark",
          quantity: [4, 6],
          rarity: 1 / 9,
          group: "Sup 1",
        },
        {
          item: "Summer pie",
          quantity: [4, 6],
          rarity: 1 / 9,
          group: "Sup 1",
        },
        {
          item: "Ancient brew(3)",
          quantity: [1, 2],
          rarity: 1 / 9,
          group: "Sup 2",
        },
        {
          item: "Ranging potion(3)",
          quantity: [1, 2],
          rarity: 1 / 9,
          group: "Sup 2",
        },
        {
          item: "Super restore(3)",
          quantity: [1, 2],
          rarity: 1 / 9,
          group: "Sup 3",
        },
        {
          item: "Prayer potion(3)",
          quantity: [1, 2],
          rarity: 1 / 9,
          group: "Sup 3",
        },
      ],
      equipment: [
        { item: "Rune kiteshield (noted)", quantity: 3, rarity: 2 * (1 / 22) },
        { item: "Dragon plateskirt", quantity: 1, rarity: 2 * (1 / 44) },
        { item: "Rune platelegs (noted)", quantity: 3, rarity: 2 * (1 / 44) },
        { item: "Black d'hide body", quantity: 1, rarity: 2 * (1 / 44) },
        { item: "Dragon platelegs", quantity: 2, rarity: 2 * (1 / 55) },
        { item: "Rune sword", quantity: 1, rarity: 2 * (1 / 220) },
      ],
      ammo: [
        { item: "Law rune", quantity: 146, rarity: 2 * (1 / 22) },
        { item: "Soul rune", quantity: 466, rarity: 2 * (1 / 22) },
        { item: "Death rune", quantity: 428, rarity: 2 * (1 / 22) },
        { item: "Smoke rune", quantity: 314, rarity: 2 * (1 / 22) },
        { item: "Chaos rune", quantity: 480, rarity: 2 * (1 / 44) },
        { item: "Fire rune", quantity: 1964, rarity: 2 * (1 / 44) },
        { item: "Cannonball", quantity: 670, rarity: 2 * (1 / 44) },
      ],
      herbs: [
        {
          item: "Grimy toadflax (noted)",
          quantity: 55,
          rarity: 2 * (1 / 73.33),
        },
        { item: "Grimy kwuarm (noted)", quantity: 6, rarity: 2 * (1 / 140.8) },
        { item: "Grimy cadantine (noted)", quantity: 6, rarity: 2 * (1 / 176) },
        {
          item: "Grimy dwarf weed (noted)",
          quantity: 6,
          rarity: 2 * (1 / 176),
        },
        {
          item: "Grimy lantadyme (noted)",
          quantity: 6,
          rarity: 2 * (1 / 234.7),
        },
      ],
      seeds: [
        { item: "Yew seed", quantity: 2, rarity: 2 * (1 / 44) },
        { item: "Torstol seed", quantity: 4, rarity: 2 * (1 / 44) },
        { item: "Palm tree seed", quantity: 2, rarity: 2 * (1 / 44) },
        { item: "Ranarr seed", quantity: 3, rarity: 2 * (1 / 44) },
        { item: "Snapdragon seed", quantity: 5, rarity: 2 * (1 / 55) },
        { item: "Ranarr seed", quantity: 8, rarity: 2 * (1 / 73.33) },
        { item: "Spirit seed", quantity: 1, rarity: 2 * (1 / 110) },
        { item: "Ranarr seed", quantity: 3, rarity: 2 * (1 / 366.7) },
        { item: "Snapdragon seed", quantity: 3, rarity: 2 * (1 / 392.9) },
        { item: "Torstol seed", quantity: 3, rarity: 2 * (1 / 500) },
        { item: "Watermelon seed", quantity: 49, rarity: 2 * (1 / 523.8) },
        { item: "Willow seed", quantity: 3, rarity: 2 * (1 / 550) },
        { item: "Mahogany seed", quantity: 3, rarity: 2 * (1 / 611.1) },
        { item: "Maple seed", quantity: 3, rarity: 2 * (1 / 611.1) },
        { item: "Teak seed", quantity: 3, rarity: 2 * (1 / 611.1) },
        { item: "Yew seed", quantity: 3, rarity: 2 * (1 / 611.1) },
        { item: "Papaya tree seed", quantity: 3, rarity: 2 * (1 / 785.7) },
        { item: "Magic seed", quantity: 3, rarity: 2 * (1 / 1000) },
        { item: "Palm tree seed", quantity: 3, rarity: 2 * (1 / 1100) },
        { item: "Spirit seed", quantity: 3, rarity: 2 * (1 / 1375) },
        { item: "Dragonfruit tree seed", quantity: 3, rarity: 2 * (1 / 1833) },
        { item: "Celastrus seed", quantity: 3, rarity: 2 * (1 / 2750) },
        { item: "Redwood tree seed", quantity: 3, rarity: 2 * (1 / 2750) },
      ],
      resources: [
        { item: "Adamantite ore (noted)", quantity: 22, rarity: 2 * (1 / 22) },
        { item: "Gold ore (noted)", quantity: 180, rarity: 2 * (1 / 22) },
        { item: "Teak plank (noted)", quantity: 22, rarity: 2 * (1 / 22) },
        { item: "Molten glass (noted)", quantity: 89, rarity: 2 * (1 / 22) },
        { item: "Pure essence (noted)", quantity: 2314, rarity: 2 * (1 / 44) },
        { item: "Coal (noted)", quantity: 163, rarity: 2 * (1 / 44) },
        { item: "Runite ore (noted)", quantity: 18, rarity: 2 * (1 / 73.33) },
        { item: "Silver ore (noted)", quantity: 101, rarity: 2 * (1 / 110) },
      ],
      other: [
        { item: "Manta ray (noted)", quantity: 28, rarity: 2 * (1 / 22) },
        { item: "Water orb (noted)", quantity: 21, rarity: 2 * (1 / 22) },
        { item: "Dragon bolts (unf)", quantity: 89, rarity: 2 * (1 / 22) },
        {
          item: "Limpwurt root (noted)",
          quantity: 21,
          rarity: 2 * (1 / 73.33),
        },
      ],
    },
  }, //Muspah ends here
};

function calculateTableProbabilities(boss) {
  let tableChances = {};
  const rolls = boss.doubleRoll ? 2 : boss.tripleRoll ? 3 : 1;

  //Add Rare Drop Table if boss has access

  if (boss.rDT && !boss.dropTables.rareDropTable) {
    boss.dropTables.rareDropTable = rareDropTable;
    console.log("Adding Rare Drop Table to boss!");
  }

  for (const [table, items] of Object.entries(boss.dropTables)) {
    if (
      table === "always" ||
      !Array.isArray(items) ||
      table === "rareDropTable"
    )
      //Added "|| table === "rareDropTable""
      continue;

    if (boss.preRoll && table === boss.preRoll.table) continue;

    let tableChance = items.reduce((sum, item) => sum + (item.rarity || 0), 0);
    tableChances[table] = tableChance / rolls; //Adjusting for amount of rolls
    // console.log("TableChance 1: ", tableChance, `${table}`);
    // console.log("TableChances 2: ", tableChances, `${table}`);
    //I initially commented out the adjusting above, but this provides the correct values PER ROLL, so I brought it back.
  }
  //Adding in rareDropTable chances for calculation
  if (boss.rDT) {
    tableChances["rareDropTable"] = boss.rDTChance;
  }

  let totalChance = Object.values(tableChances).reduce(
    (sum, chance) => sum + chance,
    0
  );
  //Hoping line below fixes skewed drop rates
  // console.log("TableChances: ", tableChances, "TotalChance: ", totalChance);

  return { tableChances, totalChance };

  //Rolling as a percent is actually skewing drop rates for Rare Drop Table
  //Normalizing to 100% was the issue, will try returning raw chances and total

  // let tableChancesPercent = {};
  // for (const [table, chance] of Object.entries(tableChances)) {
  //   tableChancesPercent[table] = (chance / totalChance) * 100;
  // }
  // return tableChancesPercent;
}

function getBossDropTable(boss) {
  let { tableChances, totalChance } = calculateTableProbabilities(boss);
  // console.log("Table Chances:", tableChances, "Total:", totalChance);
  let roll = Math.random() * totalChance; //This should now based on probability function Total Chance
  // console.log("Roll:", roll);
  let accumulatedChance = 0;
  //Check for RDT first
  if (boss.rDT && roll <= boss.rDTChance) {
    return "rareDropTable";
  }
  accumulatedChance = boss.rDTChance; //Offset roll

  for (const [table, chance] of Object.entries(tableChances)) {
    if (table === "rareDropTable") continue;
    accumulatedChance += chance;
    // console.log(
    //   `Table: ${table}, Chance: ${chance}, Accumulated: ${accumulatedChance}`
    // );
    if (roll <= accumulatedChance) {
      //Moving unique drop sound to rollForBossItem function.
      //Tying sound to items and not tables

      // if (table === "unique") {
      //   playUniqueDropSound();
      // }
      return table;
    }
  }
  //Fallback, should never happen
  console.log("This should not be popping up");
  return "other";
}

function rollTableItems(table, tableName) {
  if (!table || !Array.isArray(table) || table.length === 0) {
    console.error(
      `Table "${tableName}" is either missing, not an array or empty!`,
      table
    );
    return null;
  }

  let totalWeight = table.reduce((sum, item) => sum + (item.rarity || 0), 0);
  if (totalWeight === 0) {
    console.error(`Total weight is 0 for table "${tableName}"`);
    return null;
  }

  let roll = Math.random() * totalWeight;
  //debugging
  // console.log(
  //   `Rolling in ${tableName} with roll: ${roll.toFixed(
  //     4
  //   )}, Total Weight: ${totalWeight.toFixed(4)}`
  // );
  let cumulativeWeight = 0;
  for (const item of table) {
    cumulativeWeight += item.rarity;
    if (roll <= cumulativeWeight) {
      //Debugging
      // console.log(
      //   `Selected item: ${item.item} (Cumulative: ${cumulativeWeight.toFixed(
      //     4
      //   )})`
      // );
      if (item.type === "table") {
        console.log(`Type = Table! Entering sub-table: ${item.item}`);
        //This is all being tested and can be deleted if required
        const subResult = rollTableItems(rareDropTable[item.item], item.item);
        if (subResult) {
          subResult.tablePath = [tableName, item.item]; //Tracking nested path
        }
        return subResult;
        //Line below works as intended, just commenting out to try fixing tests (Delete lines above up to comment, and uncomment line below)

        // return rollTableItems(rareDropTable[item.item], item.item);
      }
      return {
        item: item.item,
        quantity: item.quantity || 1,
        chime: item.chime || false,
        tablePath: [tableName], //Add tablePath for direct items (Testing)
      };
    }
  }
  console.warn(`No item found in table: "${tableName}"`);
  return null;
}

function rollGroupedTableItems(table, tableName) {
  let groupedDrops = [];
  let groups = {};

  // Organize items by their group
  table.forEach((item) => {
    if (item.group) {
      if (!groups[item.group]) {
        groups[item.group] = [];
      }
      groups[item.group].push(item);
    }
  });

  //Roll for one item per group
  Object.keys(groups).forEach((groupName) => {
    let groupItems = groups[groupName];
    let totalWeight = groupItems.reduce(
      (sum, item) => sum + (item.rarity || 0),
      0
    );

    let roll = Math.random() * totalWeight;
    let cumulativeWeight = 0;

    for (const item of groupItems) {
      cumulativeWeight += item.rarity;
      if (roll <= cumulativeWeight) {
        let finalQuantity = Array.isArray(item.quantity)
          ? rollItemQuantity(item.quantity[0], item.quantity[1])
          : item.quantity;

        groupedDrops.push({
          dropTable: tableName, //Keep track of table name
          item: item.item,
          quantity: finalQuantity,
          chime: item.chime || false,
        });
        break;
      }
    }
  });
  return groupedDrops;
  // for (const item of table) {
  //   if (!item.group) {
  //     console.warn(`Item ${item.item} in ${tableName} is missing a group!`);
  //     continue;
  //   }
  //   if (!groupedItems[item.group]) {
  //     groupedItems[item.group] = [];
  //   }
  //   groupedItems[item.group].push(item);
  // }

  // let finalDrops = [];
  // for (const group in groupedItems) {
  //   let selectedItem = rollTableItems(
  //     groupedItems[group],
  //     `${tableName} - ${group}`
  //   );
  //   if (selectedItem) {
  //     let finalQuantity = Array.isArray(selectedItem.quantity)
  //       ? rollItemQuantity(selectedItem.quantity[0], selectedItem.quantity[1])
  //       : selectedItem.quantity;

  //     finalDrops.push({
  //       dropTable: tableName,
  //       item: selectedItem.item,
  //       quantity: finalQuantity,
  //     });
  //   }
  // }

  // return finalDrops.length > 0 ? finalDrops : null;
}

function rollForBossItem(boss, tableName) {
  let table;

  if (tableName === "rareDropTable") {
    if (!boss.dropTables.rareDropTable) {
      console.error(
        `Error: rareDropTable is missing for ${
          Object.keys(bosses).find((name) => bosses[name] === boss) ||
          "Unknown Boss"
        }`
      );

      return null;
    }
    return rollForRDTItem(boss.dropTables.rareDropTable);
  } else if (rareDropTable[tableName]) {
    table = rareDropTable[tableName];
    //This is saying if its an internal table, we use it

    // console.log(`Rolling on internal RDT table:${tableName} (rollForBossItem)`);
  } else {
    table = boss.dropTables[tableName];
    // console.log(`Rolling on boss table: ${tableName}`);
    //This is saying, otherwise use the normal drop tables
  }
  const hasGroups = table.some((item) => item.group);
  let droppedItem;

  if (hasGroups) {
    droppedItem = rollGroupedTableItems(table, tableName);
  } else {
    droppedItem = rollTableItems(table, tableName);
  }
  // console.log("Dropped item:", droppedItem);
  //If dropped item has the chime property, play the unique drop chime
  if (Array.isArray(droppedItem)) {
    droppedItem.forEach((item) => {
      if (item.chime) {
        playUniqueDropSound();
        console.log("Jingle Jingle, but in a group");
      }
    });
  } else if (droppedItem && droppedItem.chime) {
    playUniqueDropSound();
    console.log("Jingle Jingle");
  }
  return droppedItem;
}

function rollForTertiaryDrop(boss) {
  if (!boss.tertiaryDrops || boss.tertiaryDrops.length === 0) return null;
  //Loop through tertiary items and roll for each INDIVIDUALLY
  for (const item of boss.tertiaryDrops) {
    const roll = Math.random();
    if (roll <= item.rarity) {
      // console.log(`Tertiary roll: ${roll}, and result: ${item.item}`);
      let droppedItem = { item: item.item, quantity: item.quantity || 1 };

      if (item.bigChime) {
        playLeagueTaskSound();
        console.log("Jingle Jingle, BIG TERTIARY");
      }

      if (item.chime) {
        playUniqueDropSound();
        console.log("Jingle Jingle, tertiary");
      }
      return droppedItem;
    }
  }

  //If no item matches, return null (No drop occurs. THIS SHOULD BE COMMON)
  // console.log("No tertiary drop.");
  return null;
}

//Can implement a SCALING FACTOR, but should not be needed

//Using generate function to set up reroll button in the modal later on
let lastBossRolled = null;
let lastBossName = "";
//This is where we'll store the last boss rolled

function generateBossDrop(boss) {
  //Condensed roll logic to account for Boss special roll rules, and default to 1 if no rule applies
  let rolls = boss.doubleRoll ? 2 : boss.tripleRoll ? 3 : 1;
  let drops = [];
  let isExclusiveDrop = false; //Track for exclusive items

  //Roll the appropriate number of times

  //Setting up guaranteed drops (happen regardless of exclusivity)

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

  let preRolled = false; //Pre-roll happens only once if "everyRoll" is false
  let uniqueHit = false;

  // Rolling for Drops
  // Pre roll logic
  if (boss.preRoll) {
    //If everyRoll is true, the pre-roll happens every time. Else once.
    let shouldPreRoll = boss.preRoll.everyRoll || !preRolled;

    if (shouldPreRoll) {
      //Define chance to hit pre-roll table
      const preRollTable = boss.dropTables[boss.preRoll.table];
      const preRollChance = preRollTable.reduce(
        (sum, item) => sum + (item.rarity || 0),
        0
      );

      if (Math.random() < preRollChance) {
        let preDropTable = boss.preRoll.table; //"unique" for Muspah

        //Lines below would be after the equals.
        //  getBossDropTable({
        //   dropTables: {
        //     [boss.preRoll.table]: boss.dropTables[boss.preRoll.table],
        //   },
        // });

        let preDrop = rollForBossItem(boss, preDropTable);

        if (preDrop) {
          //Check if item is exclusive
          const tableItems = boss.dropTables[preDropTable];
          const droppedItem = tableItems.find(
            (item) => item.item === preDrop.item
          );
          const isExclusive = droppedItem && droppedItem.exclusive === true;
          let finalQuantity = Array.isArray(preDrop.quantity)
            ? rollItemQuantity(preDrop.quantity[0], preDrop.quantity[1])
            : preDrop.quantity;

          drops.push({
            dropTable: boss.preRoll.table,
            item: preDrop.item,
            quantity: finalQuantity,
          });

          uniqueHit = true; //We hit something on the pre-rolled table
          // console.log(`Pre-roll hit! Dropped ${preDrop.item}`);

          if (isExclusive) {
            isExclusiveDrop = true; //Set flag to skip standard rolls
          }
        }
      } else {
        // console.log("Pre-roll missed, proceeding with standard rolls only.");
      }
      preRolled = true; //Pre-roll only happens once if "everyRoll" is false
    }
  }

  //Regular drop roll (only if no exclusive drops)
  if (!isExclusiveDrop) {
    for (let i = 0; i < rolls; i++) {
      let dropTable;
      //Exclude the pre-roll table
      do {
        dropTable = getBossDropTable(boss);
        // console.log(`Pre-Roll occurred, excluding table!`);
      } while (preRolled && dropTable === boss.preRoll.table); //Exclude pre-roll table

      //Testing new logic above, commenting out current line below
      // let dropTable = getBossDropTable(boss);
      let itemDrop = rollForBossItem(boss, dropTable);
      if (Array.isArray(itemDrop)) {
        //If it's an array (from grouped drops), push each item separately
        itemDrop.forEach((drop) => drops.push(drop));
      } else if (itemDrop) {
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
  } else {
    console.log("Exclusive item dropped, skipping standard rolls");
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

function getBossTablesAndItems(boss) {
  if (!boss || !boss.dropTables) {
    console.error("Invalid boss data:", boss);
    return [];
  }
  let tablesAndItems = [];
  //Attempting to add table chances, item rarities, and rarities within tables
  const { tableChances, totalChance } = calculateTableProbabilities(boss);
  const rolls = boss.doubleRoll ? 2 : boss.tripleRoll ? 3 : 1;

  // Standard Drop Tables
  for (let tableName in boss.dropTables) {
    //Skip Rare Drop Table here
    if (tableName === "rareDropTable") {
      continue;
    }
    // Adding RDT in separate function

    let tableItems = boss.dropTables[tableName];

    if (!Array.isArray(tableItems)) {
      console.error(
        `Unexpected data type for drop table: ${tableName}`,
        tableItems
      );
      continue; // Skip if it's not an array
    }

    //Calculate total weight for "Rarity in Table"
    const totalTableWeight = tableItems.reduce(
      (sum, item) => sum + (item.rarity || 0),
      0
    );
    // console.log("Total Weights", totalTableWeight);
    let formattedItems = tableItems.map((item) => {
      let quantityText =
        Array.isArray(item.quantity) && item.quantity.length === 2
          ? `${item.quantity[0]} - ${item.quantity[1]}`
          : item.quantity !== undefined
          ? item.quantity
          : "Unknown";

      //Raw Item Rarity
      const rawRarity = item.rarity
        ? `${rolls} x (1 / ${((1 / item.rarity) * rolls).toFixed(3)})`
        : "N/A";

      const perKillRarity = item.rarity
        ? `1 / ${(1 / item.rarity).toFixed(3)}`
        : "N/A";

      //Rarity in Table
      const rarityInTable =
        item.rarity && totalTableWeight
          ? `${((item.rarity / totalTableWeight) * 100).toFixed(2)}%`
          : "N/A";

      return {
        name: item.item,
        quantity: quantityText,
        //Adding new objects below
        perKillRarity,
        rawRarity,
        rarityInTable,
        //End of new
      };
    });

    //Table chance as percentage per roll, scaled by number of rolls
    let tableChancePercent =
      tableChances[tableName] && totalChance
        ? ((tableChances[tableName] / totalChance) * 100).toFixed(2) + "%"
        : "N/A";

    // console.log(tableChances[tableName], `${tableName}`);

    tablesAndItems.push({
      table: tableName,
      items: formattedItems,
      tableChance: tableChancePercent,
      //Adding new objects below
      // tableChance: tableChances[tableName]
      //   ? `${((tableChances[tableName] / totalChance) * 100).toFixed(2)}%`
      //   : "N/A",
    });
    //End of new
  }

  //Handle Rare Drop Table
  if (boss.rDT === true) {
    tablesAndItems.push({
      table: "Rare Drop Table",
      items: [
        {
          name: "RDT Access: Yes",
          quantity: "N/A",
          rawRarity: `${rolls} x (1 / ${((1 / boss.rDTChance) * rolls).toFixed(
            2
          )}`,
          rarityInTable: "N/A",
          tableChance: `${(
            (tableChances["rareDropTable"] / totalChance) *
            100
          ).toFixed(2)}%`,
        },
      ],
      tableChance: `${(
        (tableChances["rareDropTable"] / totalChance) *
        100
      ).toFixed(2)}%`,
    });
  }

  // Tertiary drops
  if (Array.isArray(boss.tertiaryDrops) && boss.tertiaryDrops.length > 0) {
    let tertiaryItems = boss.tertiaryDrops.map((drop) => {
      let quantityText =
        Array.isArray(drop.quantity) && drop.quantity.length === 2
          ? `${drop.quantity[0]} - ${drop.quantity[1]}`
          : drop.quantity !== undefined
          ? drop.quantity
          : "Unknown";
      //Adding new below
      const rawRarity = drop.rarity ? `1 / ${1 / drop.rarity}` : "N/A";
      const rarityInTable = rawRarity; //Tertiary is independent
      //End of new

      return {
        name: drop.item,
        quantity: quantityText,
        //Adding new below
        rawRarity,
        rarityInTable,
        //End of new
      };
    });

    tablesAndItems.push({
      table: "Tertiary",
      items: tertiaryItems,
      tableChance: "N/A",
    });
  }

  return tablesAndItems;
}

function populateBossItemsModal(boss) {
  let bossTableContainer = document.querySelector(
    "#bossItemModal #boss-table-container"
  );
  let rdtContainer = document.querySelector("#bossItemModal #rdt-container");
  let toggleButton = document.querySelector("#rdt-toggle");

  while (bossTableContainer.firstChild) {
    bossTableContainer.removeChild(bossTableContainer.firstChild);
  }
  while (rdtContainer.firstChild) {
    rdtContainer.removeChild(rdtContainer.firstChild);
  }

  //Create Boss Tables

  let bossTable = document.createElement("table");
  bossTable.classList.add("boss-drop-table");

  let bossTableHeader = document.createElement("thead");
  let bossHeaderRow = document.createElement("tr");

  let headers = [
    "Drop Table",
    "Table Chance",
    "Items",
    "Quantity",
    "Rarity in Table",
    "Per Kill Rarity",
    "Raw Item Rarity",
  ];
  headers.forEach((headerText) => {
    let headerCell = document.createElement("th");
    headerCell.textContent = headerText;
    bossHeaderRow.appendChild(headerCell);
  });

  bossTableHeader.appendChild(bossHeaderRow);
  bossTable.appendChild(bossTableHeader);

  let bossTableBody = document.createElement("tbody");

  let rowIndex = 0; //Track alternating rows

  let tablesAndItems = getBossTablesAndItems(boss);
  tablesAndItems.forEach((tableData) => {
    let rowSpanCount = tableData.items.length; //Number of items in the table
    tableData.items.forEach((itemData, index) => {
      let row = document.createElement("tr");

      //Apply alternating background color using rowIndex
      if (tableData.table.toLowerCase() === "unique") {
        row.classList.add("unique-table");
      }
      if (rowIndex % 2 === 0) {
        row.classList.add("even-row"); //Assign class for even rows
      } else {
        row.classList.add("odd-row"); //Assign class for odd rows
      }
      //Only add drop table name in the first row, then merge the rest
      if (index === 0) {
        let tableCell1 = document.createElement("td");
        tableCell1.textContent = tableData.table.toUpperCase();
        tableCell1.rowSpan = rowSpanCount; //Span multiple rows
        tableCell1.style.verticalAlign = "middle"; //Center the text
        row.appendChild(tableCell1);

        let tableCell2 = document.createElement("td");
        tableCell2.textContent = tableData.tableChance;
        tableCell2.rowSpan = rowSpanCount;
        tableCell2.style.verticalAlign = "middle";
        row.appendChild(tableCell2);
      }
      //Moving this into block above to spread cell
      // let tableCell2 = document.createElement("td");
      // tableCell2.textContent = itemData.name;
      // row.appendChild(tableCell2);

      let tableCell3 = document.createElement("td");
      tableCell3.textContent = itemData.name;
      row.appendChild(tableCell3);

      let tableCell4 = document.createElement("td");
      tableCell4.textContent = itemData.quantity;
      row.appendChild(tableCell4);

      let tableCell5 = document.createElement("td");
      tableCell5.textContent = itemData.rarityInTable;
      row.appendChild(tableCell5);

      let tableCell6 = document.createElement("td");
      tableCell6.textContent = itemData.perKillRarity;
      row.appendChild(tableCell6);

      let tableCell7 = document.createElement("td");
      tableCell7.textContent = itemData.rawRarity;
      row.appendChild(tableCell7);

      bossTableBody.appendChild(row);
    });

    rowIndex++;
  });

  bossTable.appendChild(bossTableBody);
  bossTableContainer.appendChild(bossTable);

  //Show RDT separately if boss has access

  if (boss.rDT === true) {
    let rdtItems = getRareDropTableItemsWithRarities(boss.rDTChance);

    let rdtTable = document.createElement("table");
    rdtTable.classList.add("rdt-table");
    let rdtTableHeader = document.createElement("thead");
    let rdtHeaderRow = document.createElement("tr");

    let rdtHeaders = [
      "Rare Drop Table",
      "Table Chance",
      "Items",
      "Quantity",
      "Rarity in Table",
      "Rarity",
    ];
    rdtHeaders.forEach((headerText) => {
      let headerCell = document.createElement("th");
      headerCell.textContent = headerText;
      rdtHeaderRow.appendChild(headerCell);
    });

    rdtTableHeader.appendChild(rdtHeaderRow);
    rdtTable.appendChild(rdtTableHeader);

    let rdtTableBody = document.createElement("tbody");

    let rowIndex = 0;

    rdtItems.forEach((tableData) => {
      let rowSpanCount = tableData.items.length;
      tableData.items.forEach((itemData, index) => {
        let row = document.createElement("tr");

        if (rowIndex % 2 === 0) {
          row.classList.add("rare-even-row");
        } else {
          row.classList.add("rare-odd-row");
        }

        if (index === 0) {
          let tableCell1 = document.createElement("td");
          tableCell1.textContent = tableData.table.toUpperCase();
          tableCell1.rowSpan = rowSpanCount; //Span multiple rows
          tableCell1.style.verticalAlign = "middle"; //Center the text
          row.appendChild(tableCell1);

          let tableCell2 = document.createElement("td");
          tableCell2.textContent = tableData.tableChance;
          tableCell2.rowSpan = rowSpanCount;
          tableCell2.style.verticalAlign = "middle";
          row.appendChild(tableCell2);
        }
        //Moving into block above

        // let tableCell2 = document.createElement("td");
        // tableCell2.textContent = itemData.name;
        // row.appendChild(tableCell2);

        let tableCell3 = document.createElement("td");
        tableCell3.textContent = itemData.name;
        row.appendChild(tableCell3);

        let tableCell4 = document.createElement("td");
        tableCell4.textContent = itemData.quantity;
        row.appendChild(tableCell4);

        let tableCell5 = document.createElement("td");
        tableCell5.textContent = itemData.rarityInTable;
        row.appendChild(tableCell5);

        let tableCell6 = document.createElement("td");
        tableCell6.textContent = itemData.rawRarity;
        row.appendChild(tableCell6);

        rdtTableBody.appendChild(row);
      });

      rowIndex++;
    });
    rdtTable.appendChild(rdtTableBody);
    rdtContainer.appendChild(rdtTable);

    if (toggleButton) {
      toggleButton.style.display = "inline-block";
      //Reset Toggle State
      toggleButton.textContent = "View Rare Drop Table";
      rdtContainer.style.display = "none";
    }
  } else {
    // Hide toggle button if no RDT
    if (toggleButton) {
      toggleButton.style.display = "none";
    }
  }

  document.getElementById("bossItemModal").style.display = "flex";
}

function closeModal(event) {
  const modal = event.target.closest(".modal");
  modal.style.display = "none";
}

function openBossSelectionModal(callbackFunction, titleText) {
  const modal = document.getElementById("bossSelectionModal");
  const modalTitle = modal.querySelector(".modal-header h2");

  // Update title dynamically
  modalTitle.textContent = titleText;

  modal.style.display = "flex";

  // Remove existing event listeners to prevent duplicate bindings
  document.querySelectorAll(".bossSlay").forEach((button) => {
    button.replaceWith(button.cloneNode(true)); //Clone and replace to remove old listeners
  });

  // Reattach event listeners with the new callback
  document.querySelectorAll(".bossButton").forEach((button) => {
    button.addEventListener("click", (event) => {
      const selectedBoss = event.target.getAttribute("boss-data");
      callbackFunction(selectedBoss); // Run the passed function
      closeModal(event);
    });
  });
}

function slayBoss(selectedBoss) {
  const boss = bosses[selectedBoss];
  // Adjusting this function to work better with adjusted selection modal. Changed from slayBoss(event).

  // const selectedBoss = event.target.getAttribute("boss-data");
  // // console.log("Selected Boss:", selectedBoss);
  generateBossDrop(boss);
}

function checkBossItems(selectedBoss) {
  const boss = bosses[selectedBoss];

  populateBossItemsModal(boss);
}

function checkInventory() {
  // const boss = bosses[selectedBoss];
  //function goes here
}

function playUniqueDropSound() {
  let audio = new Audio("../assets/Unique_sound.ogg");
  audio.volume = 0.05; //Adjusted volume (0.1 = 10%)
  audio.play();
}

function playLeagueTaskSound() {
  let audio = new Audio("../assets/League_task.ogg");
  audio.volume = 0.05;
  audio.play();
}

//Rare Drop Table Functions
function calculateRDTProbabilities(rdt) {
  let tableChances = {};
  for (const [tableName, items] of Object.entries(rdt)) {
    if (tableName === "sub-tables") continue;
    if (Array.isArray(items)) {
      let tableChance = items.reduce(
        (sum, item) => sum + (item.rarity || 0),
        0
      );
      tableChances[tableName] = tableChance;
    }
  }
  rdt["sub-tables"].forEach((subTable) => {
    tableChances[subTable.item] = subTable.rarity;
  });
  let totalChance = Object.values(tableChances).reduce(
    (sum, chance) => sum + chance,
    0
  );

  return { tableChances, totalChance };
  // let tableChancesPercent = {};
  // for (const [table, chance] of Object.entries(tableChances)) {
  //   tableChancesPercent[table] = (chance / totalChance) * 100;
  // }
  // //debugging
  // console.log("RDT Probabilities:", tableChancesPercent);
  // return tableChancesPercent;
}

function rollForRDTItem(rdt) {
  const { tableChances, totalChance } = calculateRDTProbabilities(rdt);
  let roll = Math.random() * totalChance;
  //debugging
  console.log(`Rolling for RDT table with roll: ${roll}`);
  let accumulatedChance = 0;
  let selectedTableName = null;
  let table = null;

  for (const [rdtTable, chance] of Object.entries(tableChances)) {
    accumulatedChance += chance;
    if (roll <= accumulatedChance) {
      selectedTableName = rdtTable;
      table = rdt[rdtTable] || rareDropTable[rdtTable];
      //debugging
      console.log(
        `Rolled into RDT, table: ${selectedTableName} (Chance: ${chance.toFixed(
          2
        )}%, Accumulated: ${accumulatedChance.toFixed(2)})`
      );
      break;
    }
  }
  /*
  //This is temporary for testing
  const result = rollTableItems(table, selectedTableName);
  if (result) {
    result.tableName = selectedTableName;
  }
  //Temporary as well, and commenting out main line
  return result;
  */
  return rollTableItems(table, selectedTableName); //Letting tablePath handle tracking instead of (const result)
}

function getRareDropTableItemsWithRarities(rdtChance) {
  let rareTables = [];
  const { tableChances, totalChance } =
    calculateRDTProbabilities(rareDropTable);

  const subTableNames = new Set(
    rareDropTable["sub-tables"].map((subTable) => subTable.item)
  );
  //Loop through main tables

  //New Below
  for (let category in rareDropTable) {
    if (category === "sub-tables" || subTableNames.has(category)) continue;

    const tableItems = rareDropTable[category];
    if (Array.isArray(tableItems)) {
      const totalTableWeight = tableItems.reduce(
        (sum, item) => sum + (item.rarity || 0),
        0
      );
      let tableChance = (tableChances[category] || 0) / totalChance;
      let formattedItems = tableItems.map((item) => {
        const quantityText = Array.isArray(item.quantity)
          ? `${item.quantity[0]} - ${item.quantity[1]}`
          : item.quantity;

        // //Raw Rarity in RDT (item.rarity)
        // const rawRarityWithinRDT = item.rarity
        //   ? `1 / ${(1 / item.rarity).toFixed(2)}`
        //   : "N/A";

        //Adjusted rarity considering rDTChance and sub-table probabilities

        const adjustedRarity = item.rarity
          ? `1 / ${(1 / (item.rarity * rdtChance)).toFixed(2)}`
          : "N/A";

        const rarityInTable =
          item.rarity && totalTableWeight
            ? `${((item.rarity / totalTableWeight) * 100).toFixed(2)}%`
            : "N/A";

        return {
          name: item.item,
          quantity: quantityText,
          rawRarity: adjustedRarity,
          rarityInTable,
        };
      });

      rareTables.push({
        table: category,
        tableChance: (tableChance * 100).toFixed(2) + "%",
        items: formattedItems,
      });
    }
    //Commenting out below, to update above

    // if (category !== "sub-tables") {
    //   //Skip sub-tables for now
    //   rareTables[category] = rareDropTable[category].map((item) => ({
    //     name: item.item,
    //     quantity: Array.isArray(item.quantity)
    //       ? `${item.quantity[0]} - ${item.quantity[1]}`
    //       : item.quantity,
    //   }));
    // }
  }

  //Handle sub-tables

  //New below

  rareDropTable["sub-tables"].forEach((subTable) => {
    if (subTable.type === "table") {
      const tableItems = rareDropTable[subTable.item];
      const totalTableWeight = tableItems.reduce(
        (sum, item) => sum + (item.rarity || 0),
        0
      );
      let tableChance = (tableChances[subTable.item] || 0) / totalChance;
      let formattedItems = tableItems.map((item) => {
        const quantityText = Array.isArray(item.quantity)
          ? `${item.quantity[0]} - ${item.quantity[1]}`
          : item.quantity;

        // const rawRarityWithinRDT = item.rarity
        //   ? `1 / ${(1 / item.rarity).toFixed(2)}`
        //   : "N/A";

        //Adjusted rarity: rDTChance * sub-table chance * item.rarity
        const adjustedRarity = item.rarity
          ? `1 / ${(1 / (item.rarity * tableChance * rdtChance)).toFixed(2)}`
          : "N/A";

        const rarityInTable =
          item.rarity && totalTableWeight
            ? `${((item.rarity / totalTableWeight) * 100).toFixed(2)}%`
            : "N/A";

        return {
          name: item.item,
          quantity: quantityText,
          rawRarity: adjustedRarity,
          rarityInTable,
        };
      });

      rareTables.push({
        table: subTable.item,
        tableChance: (tableChance * 100).toFixed(2) + "%",
        items: formattedItems,
      });
    }
  });

  return rareTables;
}

//Commenting out below to update above
// if (rareDropTable["sub-tables"]) {
//   rareDropTable["sub-tables"].forEach((subTable) => {
//     if (subTable.type === "table") {
//       rareTables[subTable.item] = rareDropTable[subTable.item].map(
//         (item) => ({
//           name: item.item,
//           quantity: Array.isArray(item.quantity)
//             ? `${item.quantity[0]} - ${item.quantity[1]}`
//             : item.quantity,
//         })
//       );
//     }
//   });
// }

// //Convert rareTables object into an array for easier handling

// return Object.entries(rareTables).map(([table, items]) => ({
//   table,
//   items,
// }));
// }

//Test Functions

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

//Run below test with testRareDropRate(bosses.bossName, runAmount);, example testRareDropRate(bosses.Zulrah, 1000);

function testRareDropRate(boss, runs = 100) {
  let rdtCount = 0; // Total RDT hits
  let uniqueCount = 0; // Total Unique hits
  let rdtItems = {}; // Track RDT items and their counts
  let rolls = boss.doubleRoll ? 2 : boss.tripleRoll ? 3 : 1; // Define rolls outside loop

  for (let i = 0; i < runs; i++) {
    for (let j = 0; j < rolls; j++) {
      let dropTable = getBossDropTable(boss);
      let drop = rollForBossItem(boss, dropTable);

      if (drop) {
        if (dropTable === "rareDropTable") {
          rdtCount++;
          let itemKey = `${drop.item} (from ${
            drop.tablePath ? drop.tablePath.join(" -> ") : "Unknown"
          })`;
          rdtItems[itemKey] = (rdtItems[itemKey] || 0) + 1;
        } else if (dropTable === "unique") {
          uniqueCount++;
        }
      }
    }
  }

  // Calculate observed rates without rounding first
  let observedRDT = (rdtCount / (runs * rolls)) * 100;
  let expectedRDT = boss.rDTChance * 100;
  let observedUnique = (uniqueCount / (runs * rolls)) * 100;
  let expectedUnique = (1 / 256) * 100;

  // Display results with rounding only in the console output
  console.log(`\nTest Results (${runs} kills):`);
  console.log("---------------------------------------------");
  console.log(`Total RDT hits: ${rdtCount}`);
  console.log(`Observed RDT rate: ${observedRDT.toFixed(4)}%`);
  console.log(
    `Expected RDT rate: ${expectedRDT.toFixed(4)}% (based on ${boss.rDTChance})`
  );
  console.log(`Total Unique hits: ${uniqueCount}`);
  console.log(`Observed Unique rate: ${observedUnique.toFixed(4)}%`);
  console.log(
    `Expected Unique rate: ${expectedUnique.toFixed(4)}% (1 / 256 per roll)`
  );
  console.log("RDT items received:", rdtItems);
}

function testRDTSubTables(rdt, iterations = 10000) {
  let results = {
    "Gem table": { hits: 0, items: {} },
    "Mega Rare table": { hits: 0, items: {} },
    other: { hits: 0, items: {} },
  };
  let megaFromGem = 0;

  for (let i = 0; i < iterations; i++) {
    const drop = rollForRDTItem(rdt);
    if (!drop) continue;

    const tablePath = drop.tablePath || ["other"];
    const item = drop.item;
    const initialTable = tablePath[0];

    if (initialTable === "Gem table") {
      results["Gem table"].hits++;
      results["Gem table"].items[item] =
        (results["Gem table"].items[item] || 0) + 1;
      if (tablePath.includes("Mega Rare table")) {
        megaFromGem++;
        results["Mega Rare table"].items[item] =
          (results["Mega Rare table"].items[item] || 0) + 1;
      }
    } else if (initialTable === "Mega Rare table") {
      results["Mega Rare table"].hits++;
      results["Mega Rare table"].items[item] =
        (results["Mega Rare table"].items[item] || 0) + 1;
    } else {
      results.other.hits++;
      results.other.items[item] = (results.other.items[item] || 0) + 1;
    }
  }

  // Calculate expected values without rounding
  let gemExpected = iterations / 6.4;
  let megaExpected = iterations / 8.533;
  let expectedMegaFromGem = results["Gem table"].hits / 128;

  // Display results with rounding only at output
  console.log(`\nRDT Sub-Table Test Results (${iterations} iterations):`);
  console.log("---------------------------------------------");
  console.log(
    `Gem table hits: ${results["Gem table"].hits} (${(
      (results["Gem table"].hits / iterations) *
      100
    ).toFixed(4)}%)`
  );
  console.log(
    `Expected Gem table hits: ~${gemExpected.toFixed(4)} (${(100 / 6.4).toFixed(
      4
    )}%)`
  );
  console.log("Gem table items:", results["Gem table"].items);

  console.log(
    `Mega Rare table hits (direct): ${results["Mega Rare table"].hits} (${(
      (results["Mega Rare table"].hits / iterations) *
      100
    ).toFixed(4)}%)`
  );
  console.log(
    `Expected Mega Rare table hits: ~${megaExpected.toFixed(4)} (${(
      100 / 8.533
    ).toFixed(4)}%)`
  );
  console.log("Mega Rare table items:", results["Mega Rare table"].items);

  console.log(
    `Other table hits: ${results.other.hits} (${(
      (results.other.hits / iterations) *
      100
    ).toFixed(4)}%)`
  );
  console.log("Other table items:", results.other.items);

  console.log(`\nMega Rare table hits from Gem table: ${megaFromGem}`);
  console.log(
    `Expected Mega Rare from Gem: ~${expectedMegaFromGem.toFixed(4)} (${(
      100 / 128
    ).toFixed(4)}% of Gem hits)`
  );
}
// */

/* OLD COMMENTED OUT FOR TESTING

//Code below is the first test created, but it rounds a lot throughout. 
//Created updated code above to make test more accurate

function testRareDropRate(boss, runs = 100) {
  let rdtCount = 0; // Total RDT hits
  let uniqueCount = 0; // Total Tanzanite Fang hits
  let rdtItems = {}; // Track RDT items and their counts
  let rolls = boss.doubleRoll ? 2 : boss.tripleRoll ? 3 : 1; // Define rolls outside loop

  for (let i = 0; i < runs; i++) {
    for (let j = 0; j < rolls; j++) {
      let dropTable = getBossDropTable(boss);
      let drop = rollForBossItem(boss, dropTable);
      if (drop) {
        if (dropTable === "rareDropTable") {
          rdtCount++;
          let itemKey = `${drop.item} (from ${
            drop.tablePath ? drop.tablePath.join(" -> ") : "Unknown"
          })`;
          rdtItems[itemKey] = (rdtItems[itemKey] || 0) + 1;
          console.log(
            `Run ${i + 1}, Roll ${j + 1}: RDT Drop - ${drop.item} x ${
              drop.quantity
            } (from ${
              drop.tablePath ? drop.tablePath.join(" -> ") : "Unknown"
            })`
          );
        } else if (dropTable === "unique") {
          uniqueCount++;
          console.log(
            `Run ${i + 1}, Roll ${j + 1}: Unique Drop - ${drop.item} x ${
              drop.quantity
            }`
          );
        }
      }
    }
  }

  // Calculate and display results
  console.log(`\nTest Results (${runs} kills):`);
  console.log("---------------------------------------------");
  console.log(`Total RDT hits: ${rdtCount}`);
  console.log(
    `Observed RDT rate: ${((rdtCount / (runs * rolls)) * 100).toFixed(2)}%`
  );
  console.log(
    `Expected RDT rate: ${(boss.rDTChance * 100).toFixed(2)}% (based on ${
      boss.rDTChance
    })`
  );
  console.log(`Total Unique hits: ${uniqueCount}`);
  console.log(
    `Observed Unique rate: ${((uniqueCount / (runs * rolls)) * 100).toFixed(
      2
    )}%`
  );
  console.log(
    `Expected Unique rate: ${((1 / 256) * 100).toFixed(2)}% (1 / 256 per roll)`
  );
  console.log("RDT items received:", rdtItems);
}




function testRDTSubTables(rdt, iterations = 10000) {
  // Track results
  let results = {
    "Gem table": { hits: 0, items: {} },
    "Mega Rare table": { hits: 0, items: {} },
    other: { hits: 0, items: {} },
  };
  let megaFromGem = 0;

  // Run iterations
  for (let i = 0; i < iterations; i++) {
    const drop = rollForRDTItem(rdt);
    if (!drop) {
      console.warn(`Iteration ${i + 1}: No drop returned`);
      continue;
    }

    // Determine which table was hit (requires some inference from logs or modification) (We modified rollTableItems to track)
    const tablePath = drop.tablePath || ["other"];
    const item = drop.item;

    const initialTable = tablePath[0];
    if (initialTable === "Gem table") {
      results["Gem table"].hits++;
      results["Gem table"].items[item] =
        (results["Gem table"].items[item] || 0) + 1;
      if (tablePath.includes("Mega Rare table")) {
        megaFromGem++;
        results["Mega Rare table"].items[item] =
          (results["Mega Rare table"].items[item] || 0) + 1;
      }
    } else if (initialTable === "Mega Rare table") {
      results["Mega Rare table"].hits++;
      results["Mega Rare table"].items[item] =
        (results["Mega Rare table"].items[item] || 0) + 1;
    } else {
      results.other.hits++;
      results.other.items[item] = (results.other.items[item] || 0) + 1;
    }
  }

  // Analyze results
  console.log(`\nRDT Sub-Table Test Results (${iterations} iterations):`);
  console.log("---------------------------------------------");

  // Gem table
  const gemHits = results["Gem table"].hits;
  const gemExpected = (1 / 6.4) * iterations; // Expected hits based on rarity
  console.log(
    `Gem table hits: ${gemHits} (${((gemHits / iterations) * 100).toFixed(2)}%)`
  );
  console.log(
    `Expected Gem table hits: ~${Math.round(gemExpected)} (${(
      (1 / 6.4) *
      100
    ).toFixed(2)}%)`
  );
  console.log("Gem table items:", results["Gem table"].items);

  // Mega Rare table (direct hits from RDT)
  const megaHits = results["Mega Rare table"].hits;
  const megaExpected = (1 / 8.533) * iterations;
  console.log(
    `Mega Rare table hits (direct): ${megaHits} (${(
      (megaHits / iterations) *
      100
    ).toFixed(2)}%)`
  );
  console.log(
    `Expected Mega Rare table hits: ~${Math.round(megaExpected)} (${(
      (1 / 8.533) *
      100
    ).toFixed(2)}%)`
  );
  console.log("Mega Rare table items:", results["Mega Rare table"].items);

  // Other tables
  console.log(
    `Other table hits: ${results.other.hits} (${(
      (results.other.hits / iterations) *
      100
    ).toFixed(2)}%)`
  );
  console.log("Other table items:", results.other.items);

  // Check nested Mega Rare table from Gem table (requires deeper tracking)
  console.log(`\nMega Rare table hits from Gem table: ${megaFromGem}`);
  console.log(
    `Expected Mega Rare from Gem: ~${Math.round(gemHits * (1 / 128))} (${(
      (1 / 128) *
      100
    ).toFixed(2)}% of Gem hits)`
  );
}

*/

//Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.querySelector("#rdt-toggle");
  const rdtContainer = document.querySelector("#rdt-container");

  if (toggleButton && rdtContainer) {
    toggleButton.addEventListener("click", () => {
      if (
        rdtContainer.style.display === "none" ||
        rdtContainer.style.display === ""
      ) {
        rdtContainer.style.display = "block";
        toggleButton.textContent = "Hide Rare Drop Table";
      } else {
        rdtContainer.style.display = "none";
        toggleButton.textContent = "View Rare Drop Table";
      }
    });
  }
});

//Moving only event listener into openBossSelectionModal function, because I'm trying to make the modal multipurposed

// document.querySelectorAll(".bossSlay").forEach((button) => {
//   button.addEventListener("click", (event) => {
//     const selectedBoss = event.target.getAttribute("boss-data");
//     callbackFunction(selectedBoss); // Run the passed function
//     closeModal(event);
//   });
// });
