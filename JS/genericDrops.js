"use strict";

import { InventoryModule } from "./inventory.js";

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
    { item: "Dragon Chainbody", weight: 145, rare: true, cLog: true },
    { item: "Dragon Platelegs", weight: 145, rare: true },
    { item: "Dragon Boots", weight: 180, rare: true, cLog: true },
    { item: "Dragon Defender", weight: 175, rare: true, cLog: true },
    { item: "Dragon Med Helm", weight: 180, rare: true },
    { item: "Dragon Scimitar", weight: 175, rare: true },
  ],
  rare: [
    { item: "Neitiznot Faceguard", weight: 180, rare: true, cLog: true },
    { item: "Dragon Warhammer", weight: 175, rare: true, cLog: true },
    { item: "Abyssal Whip", weight: 175, rare: true, cLog: true },
    { item: "Primordial Boots", weight: 180, rare: true, cLog: true },
    { item: "Bandos Chestplate", weight: 145, rare: true, cLog: true },
    { item: "Justiciar Legguards", weight: 145, rare: true, cLog: true },
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
      return {
        item: item.item,
        rare: item.rare || false,
        cLog: item.cLog || false,
      };
    }
  }
}

// console.log(rollForItem("rare"));
//This is choosing an item from the specific table. Now we just need to make a function that 1. Chooses a table, and 2. Chooses an item from that table.

//Decided to comment out all of the code I was working on and leave comments so I could look at it later, and re-write code below so it looks cleaner

/*
function generateDrop() {
  let dropTable = getDropTable();
  console.log(`You hit the ${dropTable} drop table!`);

  let itemDrop = rollForItem(dropTable);
  console.log(`You looted: ${itemDrop}!`);

  //Trying something besides "alert" because I want the option to roll again right from the box that appears

  //   alert(`You hit the ${dropTable.toLocaleUpperCase()} drop table \nYou received: ${itemDrop}!`);

  let repeat = confirm(
    `You hit the ${dropTable.toLocaleUpperCase()} drop table \nYou received: ${itemDrop}!\n\nWould you like to roll again?`
  );

  if (repeat) {
    generateDrop();
    //Nothing below allowed me to be able to spam click OK in the confirmation box to rapidly call the function

    // let intervalId = setInterval(function () {
    //   generateDrop(); //This should call the function again
    // }, 0); //Start interval to check after a small delay
    // setTimeout(function () {
    //   clearInterval(intervalId); //Stop interval after 1 execution
    // }, 100); //Clear interval after a short delay to allow a retry
  }
}

// generateDrop(); //Running this now Chooses a table, then a drop, and console logs them both!

//The plan is to eventually tie this to a button and make it populate somewhere on the page
*/

//This is where I'll clean up the code, and integrate the custom modal I set up so it will all hopefully look nicer.
function generateDrop() {
  InventoryModule.updateInventory();

  const dropTable = getDropTable();

  const { item, rare, cLog } = rollForItem(dropTable);

  let type = cLog ? "cLog" : "standard";

  InventoryModule.updateInventory(
    null, //raidName
    null, //bossName
    item,
    1, //quantity
    type, //type
    null, //killCount
    rare //rare flag
  );

  //Get the Drop result container
  let dropResultText = document.getElementById("dropResultText");
  //Clear previous drop content
  dropResultText.textContent = "";

  let dropTableText = document.createElement("p");
  dropTableText.textContent = `You hit the ${dropTable.toUpperCase()} drop table!`;

  let itemText = document.createElement("p");
  itemText.textContent = `You received: ${item}!`;

  //This should append them with no issues
  dropResultText.appendChild(dropTableText);
  dropResultText.appendChild(itemText);

  //This SHOULD make the modal appear
  document.getElementById("dropModal").style.display = "flex";
}

function closeModal(event) {
  const modal = event.target.closest(".modal");
  modal.style.display = "none";
}

//Might swap to get element by class name

function getAllDropTablesAndItems() {
  let tablesAndItems = [];
  let totalTableChance = tableChances.reduce(
    (sum, table) => sum + table.chance,
    0
  );

  for (let tableName in dropTables) {
    let tableItems = dropTables[tableName];
    let totalItemWeight = tableItems.reduce(
      (sum, item) => sum + item.weight,
      0
    );

    let tableChanceData = tableChances.find((t) => t.name === tableName);
    let tableChancePercent = tableChanceData
      ? ((tableChanceData.chance / totalTableChance) * 100).toFixed(2) + "%"
      : "N/A";

    let formattedItems = tableItems.map((item) => {
      let itemChance = ((item.weight / totalItemWeight) * 100).toFixed(2);
      let cumulativeChance = (
        (item.weight / totalItemWeight) *
        (tableChanceData ? tableChanceData.chance / totalTableChance : 0) *
        100
      ).toFixed(3);

      return {
        name: item.item,
        itemChance: itemChance + "%",
        cumulativeChance: cumulativeChance + "%",
        rarityInTable: itemChance + "%", //This can be removed
        rawRarity: item.weight
          ? `1 / ${(totalItemWeight / item.weight).toFixed(2)}`
          : "N/A",
      };
    });

    tablesAndItems.push({
      table: tableName,
      items: formattedItems,
      tableChance: tableChancePercent,
    });
  }
  return tablesAndItems;
}

function populateGenericItemsModal() {
  let tablesAndItems = getAllDropTablesAndItems();
  let tableContainer = document.querySelector("#genericItemModal .modal-body");

  while (tableContainer.firstChild) {
    tableContainer.removeChild(tableContainer.firstChild);
  }

  let table = document.createElement("table");
  table.classList.add("generic-drop-table");

  let tableHeader = document.createElement("thead");
  let headerRow = document.createElement("tr");

  let headers = [
    "Drop Table",
    "Table Chance",
    "Item",
    "Rarity In Table",
    "Chance Per Roll",
    "Item Rarity",
  ];
  headers.forEach((headerText) => {
    let headerCell = document.createElement("th");
    headerCell.textContent = headerText;
    headerRow.appendChild(headerCell);
  });

  tableHeader.appendChild(headerRow);
  table.appendChild(tableHeader);

  let tableBody = document.createElement("tbody");
  let rowIndex = 0;

  tablesAndItems.forEach((tableData) => {
    let rowSpanCount = tableData.items.length;
    tableData.items.forEach((itemData, index) => {
      let row = document.createElement("tr");

      if (tableData.table.toLowerCase() === "rare") {
        row.classList.add("unique-table");
      }
      if (rowIndex % 2 === 0) {
        row.classList.add("even-row");
      } else {
        row.classList.add("odd-row");
      }

      if (index === 0) {
        let tableCell1 = document.createElement("td");
        tableCell1.textContent = tableData.table.toUpperCase();
        tableCell1.rowSpan = rowSpanCount;
        tableCell1.style.verticalAlign = "middle";
        row.appendChild(tableCell1);

        let tableCell2 = document.createElement("td");
        tableCell2.textContent = tableData.tableChance;
        tableCell2.rowSpan = rowSpanCount;
        tableCell2.style.verticalAlign = "middle";
        row.appendChild(tableCell2);
      }

      let tableCell3 = document.createElement("td");
      tableCell3.textContent = itemData.name;
      row.appendChild(tableCell3);

      let tableCell4 = document.createElement("td");
      tableCell4.textContent = itemData.rarityInTable;
      row.appendChild(tableCell4);

      let tableCell5 = document.createElement("td");
      tableCell5.textContent = itemData.cumulativeChance;
      row.appendChild(tableCell5);

      let tableCell6 = document.createElement("td");
      tableCell6.textContent = itemData.rawRarity;
      row.appendChild(tableCell6);

      tableBody.appendChild(row);
    });

    rowIndex++;
  });

  table.appendChild(tableBody);
  tableContainer.appendChild(table);

  document.getElementById("genericItemModal").style.display = "flex";
}

// Event Listeners

document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("rollDropButton")
    .addEventListener("click", generateDrop);

  document
    .getElementById("rollAgainButton")
    .addEventListener("click", generateDrop);

  document
    .getElementById("itemsButton")
    .addEventListener("click", populateGenericItemsModal);

  document.getElementById("openInventoryBtn").addEventListener("click", () => {
    InventoryModule.updateInventoryModal();
    document.getElementById("inventoryModal").style.display = "flex";
  });

  document.querySelectorAll(".close-button").forEach((button) => {
    button.addEventListener("click", closeModal);
  });
});
