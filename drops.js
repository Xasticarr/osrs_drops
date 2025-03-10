"use strict";

function rollRandomNumber(max) {
  return Math.floor(Math.random() * max) + 1;
}

// console.log(rollRandomNumber(5000));

//Now I'll define the drop tables. Will use generic names for the tables until I decide to flesh them out further or make them more specific.

//Decided to go with tables pertaining to each tier of equipment (Bronze through Dragon.)

const dropTables = {
  //   common: ["Coins", "Iron Sword", "Bronze Helmet", "Steel Axe"],
  //   uncommon: ["Black Sword", "Maple Shortbow", "Mithril Pickaxe"],
  low: [
    { item: "Bronze Platebody", weight: 83 },
    { item: "Bronze Kiteshield", weight: 83 },
    { item: "Bronze Platelegs", weight: 83 },
    { item: "Bronze Full Helm", weight: 84 },
    { item: "Bronze Scimitar", weight: 83 },
    { item: "Bronze Boots", weight: 84 },
    { item: "Iron Platebody", weight: 83 },
    { item: "Iron Kiteshield", weight: 83 },
    { item: "Iron Platelegs", weight: 83 },
    { item: "Iron Full Helm", weight: 84 },
    { item: "Iron Scimitar", weight: 83 },
    { item: "Iron Boots", weight: 84 },
  ],
  steel: [
    { item: "Steel Platebody", weight: 145 },
    { item: "Steel Kiteshield", weight: 175 },
    { item: "Steel Scimitar", weight: 175 },
    { item: "Steel Full Helm", weight: 180 },
    { item: "Steel Platelegs", weight: 145 },
    { item: "Steel Boots", weight: 180 },
  ],
  mithril: [
    { item: "Mithril Platebody", weight: 145 },
    { item: "Mithril Kiteshield", weight: 175 },
    { item: "Mithril Scimitar", weight: 175 },
    { item: "Mithril Full Helm", weight: 180 },
    { item: "Mithril Platelegs", weight: 145 },
    { item: "Mithril Boots", weight: 180 },
  ],
  adamant: [
    { item: "Adamant Platebody", weight: 145 },
    { item: "Adamant Kiteshield", weight: 175 },
    { item: "Adamant Scimitar", weight: 175 },
    { item: "Adamant Full Helm", weight: 180 },
    { item: "Adamant Platelegs", weight: 145 },
    { item: "Adamant Boots", weight: 180 },
  ],
  rune: [
    { item: "Rune Platebody", weight: 145 },
    { item: "Rune Kiteshield", weight: 175 },
    { item: "Rune Boots", weight: 180 },
    { item: "Rune Full Helm", weight: 180 },
    { item: "Rune Platelegs", weight: 145 },
    { item: "Rune Scimitar", weight: 175 },
  ],
  dragon: [
    { item: "Dragon Chainbody", weight: 145 },
    { item: "Dragon Platelegs", weight: 145 },
    { item: "Dragon Boots", weight: 180 },
    { item: "Dragon Defender", weight: 175 },
    { item: "Dragon Med Helm", weight: 180 },
    { item: "Dragon Scimitar", weight: 175 },
  ],
  rare: [
    { item: "Neitiznot Faceguard", weight: 180 },
    { item: "Dragon Warhammer", weight: 175 },
    { item: "Abyssal Whip", weight: 175 },
    { item: "Primordial Boots", weight: 180 },
    { item: "Bandos Chestplate", weight: 145 },
    { item: "Justiciar Legguards", weight: 145 },
  ],
};

// console.log(dropTables);

//Added item weights to influence drop chances. This will make certain drops more rare than others. Based weights out of 1000

//Now need to make chances to roll each specific table

const tableChances = [
  { name: "low", chance: 25 },
  { name: "steel", chance: 20 },
  { name: "mithril", chance: 20 },
  { name: "adamant", chance: 15 },
  { name: "rune", chance: 12 },
  { name: "dragon", chance: 7 },
  { name: "rare", chance: 1 },
];

// console.log(tableChances);
// Chance to roll each table will be out of 100

function getDropTable() {
  let roll = rollRandomNumber(100);
  let accumulatedChance = 0;

  for (let table of tableChances) {
    accumulatedChance += table.chance;
    if (roll <= accumulatedChance) {
      return table.name;
    }
  }
  return "low"; //In case we somehow don't hit a table
}

// console.log(getDropTable());
//Nice, this is showing the name of the drop tables

//Now we need to roll for a specific item when we hit a drop table

function rollForItem(tableName) {
  let table = dropTables[tableName];
  let totalWeight = table.reduce((sum, item) => sum + item.weight, 0);
  let roll = rollRandomNumber(totalWeight);

  let cumulativeWeight = 0;
  for (let item of table) {
    cumulativeWeight += item.weight;
    if (roll <= cumulativeWeight) {
      return item.item;
    }
  }
}

// console.log(rollForItem("rare"));
//This is choosing an item from the specific table. Now we just need to make a function that 1. Chooses a table, and 2. Chooses an item from that table.
