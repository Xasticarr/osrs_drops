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
    "Bronze Platebody",
    "Bronze Kiteshield",
    "Bronze Platelegs",
    "Bronze Full Helm",
    "Bronze Scimitar",
    "Bronze Boots",
    "Iron Platebody",
    "Iron Kiteshield",
    "Iron Platelegs",
    "Iron Full Helm",
    "Iron Scimitar",
    "Iron Boots",
  ],
  steel: [
    "Steel Platebody",
    "Steel Kiteshield",
    "Steel Scimitar",
    "Steel Full Helm",
    "Steel Platelegs",
    "Steel Boots",
  ],
  mithril: [
    "Mithril Platebody",
    "Mithril Kiteshield",
    "Mithril Scimitar",
    "Mithril Full Helm",
    "Mithril Platelegs",
    "Mithril Boots",
  ],
  adamant: [
    "Adamant Platebody",
    "Adamant Kiteshield",
    "Adamant Scimitar",
    "Adamant Full Helm",
    "Adamant Platelegs",
    "Adamant Boots",
  ],
  rune: [
    "Rune Platebody",
    "Rune Kiteshield",
    "Rune Boots",
    "Rune Full Helm",
    "Rune Platelegs",
    "Rune Scimitar",
  ],
  dragon: [
    "Dragon Chainbody",
    "Dragon Platelegs",
    "Dragon Boots",
    "Dragon Defender",
    "Dragon Med Helm",
    "Dragon Scimitar",
  ],
  rare: [
    "Neitiznot Faceguard",
    "Dragon Warhammer",
    "Abyssal Whip",
    "Primordial Boots",
    "Bandos Chestplate",
    "Justiciar Legguards",
  ],
};

// console.log(dropTables);
