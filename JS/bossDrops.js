"use strict";

function rollRandomNumber(max) {
  return Math.floor(Math.random() * max) + 1;
}

function rollItemQuantity(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Now we gotta set up the bosses. To keep it in line with OSRS, unfortunatly every boss gets it's own individual drop tables.

const bosses = {
  Zulrah: {
    doubleRoll: true,
    tripleRoll: false,
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
