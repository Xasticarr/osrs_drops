"use strict";

import { InventoryModule } from "../modules/models/Inventory.js";
import { AllBosses } from "../modules/data/bosses/index.js";
import { DropTable } from "../modules/models/DropTable.js";
import { RareDropTable } from "../modules/data/rareDropTable.js";

function rollRandomNumber(max) {
  return Math.floor(Math.random() * max);
}

function rollItemQuantity(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

Object.keys(AllBosses).forEach((bossName) => {
  const boss = AllBosses[bossName];
});

function getItems(table) {
  if (!table) return [];
  if (Array.isArray(table)) return table;
  return Array.isArray(table.items) ? table.items : [];
}

function calculateTableProbabilities(boss) {
  let tableChances = {};
  const rolls = boss.doubleRoll ? 2 : boss.tripleRoll ? 3 : 1;

  //Add Rare Drop Table if boss has access

  if (boss.rDT && !boss.dropTables.rareDropTable) {
    boss.dropTables.rareDropTable = RareDropTable;
    console.log("Adding Rare Drop Table to boss!");
  }

  for (const [table, items] of Object.entries(boss.dropTables)) {
    const tableItems = getItems(items);

    if (
      table === "always" ||
      !Array.isArray(tableItems) ||
      table === RareDropTable
    ) {
      continue;
    }
    if (boss.preRoll && table === boss.preRoll.table) continue;

    let tableChance = tableItems.reduce(
      (sum, item) => sum + (item.rarity || 0),
      0
    );
    tableChances[table] = tableChance / rolls; //Adjusting for amount of rolls
  }

  //Adding in RareDropTable chances for calculation
  if (boss.rDT) {
    tableChances["rareDropTable"] = boss.rDTChance;
  }

  let totalChance = Object.values(tableChances).reduce(
    (sum, chance) => sum + chance,
    0
  );

  return { tableChances, totalChance };
}

function getBossDropTable(boss) {
  const { tableChances, totalChance } = calculateTableProbabilities(boss);

  if (!tableChances || totalChance <= 0) return "other";

  let roll = Math.random() * totalChance;
  let acc = 0;
  for (const [tableName, weight] of Object.entries(tableChances)) {
    acc += weight;
    if (roll <= acc) {
      return tableName; //returns the string key ("equipment", "rareDropTable", "rare ammo", etc)
    }
  }

  // fallback
  return "other";
}

function rollTableItems(table, tableName) {
  const items = getItems(table);
  if (!items || !Array.isArray(items) || items.length === 0) {
    console.error(
      `Table "${tableName}" is either missing, not an array or empty!`,
      table
    );
    return null;
  }

  let totalWeight = items.reduce((sum, it) => sum + (it?.rarity || 0), 0);
  if (!totalWeight) {
    console.error(`Total weight is 0 for table "${tableName}"`);
    return null;
  }

  let roll = Math.random() * totalWeight;
  let cumulative = 0;
  for (const it of items) {
    cumulative += it?.rarity || 0;
    if (roll <= cumulative) {
      if (it?.type === "table") {
        const nestedName = it.name || it.item;
        console.log(`Type = Table! Entering sub-table: ${nestedName}`);
        const nestedTable = RareDropTable?.[nestedName];
        if (!nestedTable) {
          console.warn(
            `Missing nested table "${nestedName}" referenced from "${tableName}"`
          );
          return null;
        }
        const nestedResult = rollTableItems(nestedTable, nestedName);
        if (nestedResult) {
          nestedResult.tablePath = nestedResult.tablePath
            ? [tableName, ...nestedResult.tablePath]
            : [tableName, nestedName];
          nestedResult.dropTable = "rareDropTable";
        }
        return nestedResult;
      }

      //normal item
      return {
        item: it?.name || it?.item,
        quantity: it?.quantity ?? 1,
        type: it?.type ?? "standard",
        cLog: it?.cLog ?? false,
        bigChime: it?.bigChime ?? false,
        chime: it?.chime ?? false,
        tablePath: [tableName],
      };
    }
  }
  console.warn(
    `No item found in table "${tableName}" after rolling (roll = ${roll}, totalWeight = ${totalWeight})`
  );
}

function rollGroupedTableItems(table, tableName) {
  let groupedDrops = [];
  let groups = {};

  // Organize items by their group
  const items = getItems(table);
  items?.forEach((item) => {
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
          dropTable: tableName,
          item: item.name,
          quantity: finalQuantity,
          chime: item.chime || false,
        });
        break;
      }
    }
  });
  return groupedDrops;
}

function rollForBossItem(boss, tableName) {
  let table;

  if (tableName === "rareDropTable") {
    if (!boss.dropTables.rareDropTable) {
      console.error(
        `Error: RareDropTable is missing for ${
          Object.keys(AllBosses).find((name) => AllBosses[name] === boss) ||
          "Unknown Boss"
        }`
      );

      return null;
    }
    return rollForRDTItem(boss.dropTables.rareDropTable);
  } else if (RareDropTable[tableName]) {
    table = RareDropTable[tableName];
  } else {
    table = boss.dropTables[tableName];
  }

  const items = getItems(table);

  if (!items || !Array.isArray(items)) {
    console.error(
      `Table "${tableName}" is either missing, not an array or empty.`,
      table
    );

    return null;
  }

  const hasGroups = items.some((item) => item.group);
  let droppedItem;

  if (hasGroups) {
    droppedItem = rollGroupedTableItems(items, tableName);
  } else {
    droppedItem = rollTableItems(items, tableName);
  }
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
    console.log(droppedItem.item);
  } else if (droppedItem && droppedItem.bigChime) {
    playLeagueTaskSound();
    console.log("Jingle Jingle: Big Boy Item");
    console.log(droppedItem.item);
  }
  return droppedItem;
}

function rollForTertiaryDrop(boss) {
  if (!boss.tertiaryDrops || boss.tertiaryDrops.length === 0) return null;
  for (const item of boss.tertiaryDrops) {
    const roll = Math.random();
    if (roll <= item.rarity) {
      const droppedItem = { item: item.name, quantity: item.quantity || 1 };

      if (item.bigChime) {
        playLeagueTaskSound();
        console.log("Jingle Jingle, BIG TERTIARY");
        console.log(item.name);
      }

      if (item.chime) {
        playUniqueDropSound();
        console.log("Jingle Jingle, tertiary");
        console.log(item.name);
      }
      return droppedItem;
    }
  }
  return null;
}

//Storing last boss rolled for reroll button functionality
const bossState = {
  lastBossRolled: null,
  lastBossName: "",
};

function generateBossDrop(boss, bossName) {
  let rolls = boss.doubleRoll ? 2 : boss.tripleRoll ? 3 : 1;
  let drops = [];
  let isExclusiveDrop = false;

  if (boss.dropTables.always) {
    getItems(boss.dropTables.always)?.forEach((itemObj) => {
      if (!itemObj.name) return;
      let finalQuantity = Array.isArray(itemObj.quantity)
        ? rollItemQuantity(itemObj.quantity[0], itemObj.quantity[1])
        : itemObj.quantity;
      drops.push({
        dropTable: "always",
        item: itemObj.name,
        quantity: finalQuantity,
        type: itemObj.type ?? "standard",
        cLog: itemObj.cLog ?? false,
      });
    });
  }

  let preRolled = false;
  let uniqueHit = false;

  // Rolling for Drops
  // Pre roll logic
  if (boss.preRoll) {
    let shouldPreRoll = boss.preRoll.everyRoll || !preRolled;

    if (shouldPreRoll) {
      const preRollItems = getItems(boss.dropTables[boss.preRoll.table]);
      const preRollChance = preRollItems?.reduce(
        (sum, item) => sum + (item.rarity || 0),
        0
      );

      if (Math.random() < preRollChance) {
        let preDropTable = boss.preRoll.table;
        let preDrop = rollForBossItem(boss, preDropTable);

        if (preDrop) {
          //Check if item is exclusive
          const entries = getItems(boss.dropTables[preDropTable]);
          const droppedItem = entries?.find(
            (item) => item.name === preDrop.item
          );
          const isExclusive = droppedItem && droppedItem.exclusive === true;
          let finalQuantity = Array.isArray(preDrop.quantity)
            ? rollItemQuantity(preDrop.quantity[0], preDrop.quantity[1])
            : preDrop.quantity;

          drops.push({
            dropTable: boss.preRoll.table,
            item: preDrop.item,
            quantity: finalQuantity,
            type: preDrop.type,
            cLog: preDrop.cLog,
          });

          uniqueHit = true;

          if (isExclusive) {
            isExclusiveDrop = true;
          }
        }
      } else {
        console.log("Pre-roll missed, proceeding with standard rolls only.");
      }
      preRolled = true;
    }
  }

  //Regular drop roll (only if no exclusive drops)
  if (!isExclusiveDrop) {
    for (let i = 0; i < rolls; i++) {
      let dropTable;
      //Exclude the pre-roll table
      do {
        dropTable = getBossDropTable(boss);
        if (dropTable === RareDropTable) dropTable = "rareDropTable";
      } while (preRolled && dropTable === boss.preRoll.table);
      let itemDrop = rollForBossItem(boss, dropTable);

      if (Array.isArray(itemDrop)) {
        itemDrop.forEach((drop) => drops.push(drop));
      } else if (itemDrop) {
        let finalQuantity = Array.isArray(itemDrop.quantity)
          ? rollItemQuantity(itemDrop.quantity[0], itemDrop.quantity[1])
          : itemDrop.quantity;

        if (itemDrop?.item) {
          drops.push({
            dropTable,
            item: itemDrop.item,
            quantity: finalQuantity,
            tablePath: itemDrop.tablePath,
            type: itemDrop.type,
            cLog: itemDrop.cLog,
          });
        } else {
          console.warn("Skipping invalid drop:", itemDrop);
        }
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
      type: tertiaryDrop.type,
      cLog: tertiaryDrop.cLog,
    });
  }
  bossState.lastBossRolled = boss;
  bossState.lastBossName = bossName;

  populateBossDropModal(drops);

  let killLogged = false;

  drops.forEach(({ item, quantity, dropTable, tablePath }) => {
    //Collection log setup
    let type = "standard";
    let rare = false;

    let fullTable;

    if (dropTable === "rareDropTable" && tablePath && tablePath.length > 0) {
      const rdtFinalTable = tablePath[tablePath.length - 1];
      fullTable = getItems(RareDropTable[rdtFinalTable]);
    } else if (dropTable === "tertiary") {
      fullTable = getItems(boss.tertiaryDrops);
    } else {
      fullTable = getItems(boss.dropTables[dropTable]);
    }

    const dropInfo = fullTable?.find((entry) => entry.name === item);

    if (!dropInfo || typeof dropInfo !== "object" || !dropInfo.name) {
      console.warn(
        "dropInfo is invalid or undefined:",
        dropInfo,
        "for item:",
        item,
        "from table:",
        fullTable,
        "at tablePath:",
        tablePath
      );
    }

    const isCLog = dropInfo?.cLog === true;
    const isPet = dropInfo?.type === "pet";

    rare = dropInfo?.rare === true;

    if (!killLogged) {
      InventoryModule.updateInventory(null, boss.name, null, 0);
      killLogged = true;
    }

    if (isCLog && isPet) {
      // Log once for each category
      InventoryModule.updateInventory(
        null,
        boss.name,
        item,
        quantity,
        "pet",
        null,
        rare
      );
    } else if (isCLog) {
      type = "cLog";

      InventoryModule.updateInventory(
        null,
        boss.name,
        item,
        quantity,
        type,
        null,
        rare
      );
    } else if (isPet) {
      type = "pet";

      InventoryModule.updateInventory(
        null,
        boss.name,
        item,
        quantity,
        type,
        null,
        rare
      );
    } else {
      InventoryModule.updateInventory(
        null,
        boss.name,
        item,
        quantity,
        type,
        null,
        rare
      );
    }
  });
}

function rollAgain() {
  if (bossState.lastBossRolled) {
    generateBossDrop(bossState.lastBossRolled, bossState.lastBossName);
  } else {
    console.error("No boss has been rolled yet!");
  }
}

function populateBossDropModal(drops) {
  const bossDropResultText = document.getElementById("bossDropResultText");

  //Clear previous drop content
  bossDropResultText.textContent = "";

  let bossName = bossState.lastBossName;
  let tertiaryDrop = null;

  //Loop through each drop and display it
  drops.forEach(({ dropTable, item, quantity }) => {
    const bossDropTableText = document.createElement("p");

    if (dropTable === "always") {
      bossDropTableText.textContent = `You received ${bossName} drop: ${quantity}x ${item}!`;
      bossDropResultText.appendChild(bossDropTableText);
    } else if (dropTable === "tertiary") {
      //Store the tertiary drop here to append later
      tertiaryDrop = { item, quantity };
    } else {
      let formattedDropTable =
        typeof dropTable === "string"
          ? dropTable.replace(/([a-z])([A-Z])/g, "$1 $2").toUpperCase()
          : (console.warn("DropTable not a string:", dropTable),
            "UNKNOWN TABLE");

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
  const { tableChances, totalChance } = calculateTableProbabilities(boss);
  const rolls = boss.doubleRoll ? 2 : boss.tripleRoll ? 3 : 1;

  // Standard Drop Tables
  for (let tableName in boss.dropTables) {
    //Skip Rare Drop Table here
    if (tableName === "rareDropTable") {
      continue;
    }
    // Adding RDT in separate function

    const rawTable = boss.dropTables[tableName];

    if (!(rawTable instanceof DropTable)) {
      console.error(`Invalid DropTable for ${tableName}`, rawTable);
      continue;
    }

    const tableItems = getItems(rawTable);

    if (!tableItems) {
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
    const formattedItems = tableItems.map((item) => {
      const quantityText =
        Array.isArray(item.quantity) && item.quantity.length === 2
          ? `${item.quantity[0]} - ${item.quantity[1]}`
          : item.quantity !== undefined
          ? item.quantity
          : "Unknown";

      const rawRarity = item.rarity
        ? `${rolls} x (1 / ${((1 / item.rarity) * rolls).toFixed(3)})`
        : "N/A";

      const perKillRarity = item.rarity
        ? `1 / ${(1 / item.rarity).toFixed(3)}`
        : "N/A";

      const rarityInTable =
        item.rarity && totalTableWeight
          ? `${((item.rarity / totalTableWeight) * 100).toFixed(2)}%`
          : "N/A";

      return {
        name: item.name,
        quantity: quantityText,
        perKillRarity,
        rawRarity,
        rarityInTable,
      };
    });

    //Table chance as percentage per roll, scaled by number of rolls
    const tableChancePercent =
      tableChances[tableName] && totalChance
        ? ((tableChances[tableName] / totalChance) * 100).toFixed(2) + "%"
        : "N/A";

    tablesAndItems.push({
      table: tableName,
      items: formattedItems,
      tableChance: tableChancePercent,
    });
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
      const rawRarity = drop.rarity ? `1 / ${1 / drop.rarity}` : "N/A";
      const rarityInTable = rawRarity;

      return {
        name: drop.name,
        quantity: quantityText,
        rawRarity,
        rarityInTable,
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

    toggleButton.style.display = "inline-block";
    toggleButton.textContent = "View Rare Drop Table";
    rdtContainer.style.display = "none";

    setupRdtToggle();
  } else {
    // Hide toggle button if no RDT
    toggleButton.style.display = "none";
  }

  document.getElementById("bossItemModal").style.display = "flex";
}

function toggleRDTHandler() {
  const rdtContainer = document.querySelector("#rdt-container");
  const toggleButton = document.querySelector("#rdt-toggle");
  console.log("RDT Toggle Clicked");
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
}

function setupRdtToggle() {
  const toggleButton = document.querySelector("#rdt-toggle");
  const rdtContainer = document.querySelector("#rdt-container");

  if (toggleButton && rdtContainer) {
    //Remove existing listener to prevent dupes
    toggleButton.removeEventListener("click", toggleRDTHandler);
    toggleButton.addEventListener("click", toggleRDTHandler);
  }
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
      const bossName = event.target.getAttribute("boss-data");
      const selectedBoss = AllBosses[bossName];
      callbackFunction(selectedBoss);
      closeModal(event);
    });
  });
}

function slayBoss(boss) {
  console.log("Selected Boss:", boss);
  generateBossDrop(boss, boss.name);
}

function checkBossItems(boss) {
  console.log("Selected Boss:", boss.name, boss);
  populateBossItemsModal(boss);
}

function setupInventoryModal() {
  const openInventoryBtn = document.getElementById("openInventoryBtn");
  const inventoryModal = document.getElementById("inventoryModal");

  if (!openInventoryBtn || !inventoryModal) {
    console.error("Inventory modal elements not found.");
    return;
  }

  openInventoryBtn.addEventListener("click", () => {
    inventoryModal.style.display = "flex";
  });
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
  if (!rdt || typeof rdt !== "object") {
    console.error("RDT passed to calculateRDTProbabilities is invalid:", rdt);
    return { tableChances: {}, totalChance: 0, subSplit: {}, subSplitTotal: 0 };
  }

  // 1) Read the sub-tables pointer list (the "sub-tables" DropTable entry)
  const subPointers = getItems(rdt["sub-tables"]) || [];
  const subPointerNames = new Set();
  const subSplit = {}; // {"Gem table": 0.156625, "Mega Rare table": 0.1172 } Previously subPointerChances
  let subSplitTotal = 0;

  subPointers.forEach((p) => {
    if (p && p.type === "table" && p.name && typeof p.rarity === "number") {
      subPointerNames.add(p.name);
      subSplit[p.name] = (subSplit[p.name] || 0) + (p.rarity || 0);
      subSplitTotal += p.rarity || 0;
    }
  });

  // 2) For each top-level table (skip 'sub-tables' and skip the actual sub-table keys like "Gem table")
  const tableChances = {}; // raw per-table chance (not normalized)
  let rawTotal = 0;

  for (const [tableName, dropTable] of Object.entries(rdt)) {
    if (tableName === "sub-tables") continue;
    if (subPointerNames.has(tableName)) {
      //skip internal table contents here - those are indicated as pointer chances above
      continue;
    }

    const items = getItems(dropTable);
    if (!Array.isArray(items) || items.length === 0) continue;

    //table chance = sum(item.rarity) for this table
    const sumRarity = items.reduce((s, it) => s + (it?.rarity || 0), 0);
    if (sumRarity > 0) {
      tableChances[tableName] = sumRarity;
      rawTotal += sumRarity;
    }
  }

  // 3) Add the sub-table pointer chances into the same namespace so the map covers every selectable top table outcome
  for (const [subName, chance] of Object.entries(subSplit)) {
    tableChances[subName] = (tableChances[subName] || 0) + chance;
    rawTotal += chance;
  }

  // rawTotal should be ~1.0 for a well formed RDT; but we can normalize it later if we need to
  return {
    tableChances, //raw chance-like numbers for each table (sum = rawTotal)
    totalChance: rawTotal,
    subSplit,
    subSplitTotal,
  };
}

function rollForRDTItem(rdt) {
  if (!rdt) {
    console.error("rollForRDTItem called with undefined RDT!");
    return null;
  }

  const { tableChances, totalChance, subSplit, subSplitTotal } =
    calculateRDTProbabilities(rdt);

  if (!tableChances || totalChance <= 0) {
    console.warn(
      "rollForRDTItem: invalid probabilities",
      tableChances,
      totalChance
    );
    return null;
  }

  const topTotal = Object.values(tableChances).reduce(
    (s, v) => s + (v || 0),
    0
  );
  const roll = Math.random() * totalChance;
  console.log(
    `Rolling for RDT table with roll: ${roll} (topTotal = ${topTotal}, subSplitTotal= ${subSplitTotal})`
  );

  //if roll falls into top-level tables
  let acc = 0;
  for (const [name, weight] of Object.entries(tableChances)) {
    acc += weight;
    if (roll <= acc) {
      //choose this top-level RDT table
      const tableObj = rdt[name] || RareDropTable[name];
      console.log(`Hit top level RDT table: ${name}`);
      return rollTableItems(getItems(tableObj), name);
    }
  }

  //Otherwise roll among sub-tables (Gem table, Mega Rare table)
  if (subSplit && subSplitTotal > 0) {
    const subRoll = roll - topTotal;
    let subAcc = 0;
    for (const [subName, subWeight] of Object.entries(subSplit)) {
      subAcc += subWeight;
      if (subRoll <= subAcc) {
        const nested = rdt[subName] || RareDropTable[subName];
        console.log(`Hit sub-table: ${subName}`);
        return rollTableItems(getItems(nested), subName);
      }
    }
  }

  console.warn("rollForRDTItem: failed to select a table (unexpected)");
  return null;
}

function getRareDropTableItemsWithRarities(rdtChance) {
  const rareTables = [];
  const { tableChances, totalChance } =
    calculateRDTProbabilities(RareDropTable);

  if (!tableChances || !totalChance || totalChance <= 0) {
    return rareTables;
  }

  for (const [tableName, dropTable] of Object.entries(RareDropTable)) {
    if (tableName === "sub-tables") continue;

    const items = getItems(dropTable);
    if (!Array.isArray(items) || items.length === 0) {
      rareTables.push({
        table: tableName,
        tableChance: `${(
          ((tableChances[tableName] || 0) / totalChance) *
          100
        ).toFixed(2)}%`,
        items: [],
      });
      continue;
    }
    // conditional chance of this table given RDT was hit:
    const conditionalTableChance =
      totalChance > 0 ? (tableChances[tableName] || 0) / totalChance : 0;

    const nonTableItems = items.filter((it) => it?.rarity !== "table");

    //sum of rarities inside this table
    const itemRaritySum = nonTableItems.reduce(
      (s, it) => s + (it?.rarity || 0),
      0
    );
    // Build formatted items list for UI
    const formattedItems = nonTableItems.map((it) => {
      const rawItemRarity = it?.rarity || 0; // e.g. 1/42.67 decimal
      const inTablePct =
        itemRaritySum > 0
          ? ((rawItemRarity / itemRaritySum) * 100).toFixed(2) + "%"
          : "N/A";

      // Final per-kill probability = rdtChance * conditionalTableChance * (rawItemRarity / itemRaritySum)
      const finalProbability =
        itemRaritySum > 0
          ? rdtChance * conditionalTableChance * (rawItemRarity / itemRaritySum)
          : 0;

      return {
        name: it.name,
        quantity: Array.isArray(it.quantity)
          ? `${it.quantity[0]} - ${it.quantity[1]}`
          : it.quantity,
        rarityInTable: inTablePct,
        rawRarity:
          finalProbability > 0
            ? `1 / ${(1 / finalProbability).toFixed(2)}`
            : "N/A",
      };
    });

    // Push the table summary (table name, conditional chance, and the internal items)
    rareTables.push({
      table: tableName,
      tableChance: `${(conditionalTableChance * 100).toFixed(2)}%`,
      items: formattedItems,
    });
  }

  // Return arrays where each table is represented and each item contains:
  // - rarityInTable: percentage inside the table
  // - rawRarity: per-kill rarity string (1 / X) using rdtChance * conditionalTableChance * (item fraction)
  return rareTables;
}

function testRDTDistribution(trials = 100000) {
  const counts = {
    "rare ammo": 0,
    "rare equipment": 0,
    "rare other": 0,
    "Gem table": 0,
    "Mega Rare table": 0,
  };

  for (let i = 0; i < trials; i++) {
    const { tableChances, totalChance, subSplit, subSplitTotal } =
      calculateRDTProbabilities(RareDropTable);
    const roll = Math.random() * totalChance;

    const topTotal = Object.values(tableChances).reduce((a, b) => a + b, 0);
    let acc = 0;
    let hit = null;

    // top-level
    for (const [name, weight] of Object.entries(tableChances)) {
      acc += weight;
      if (roll <= acc) {
        hit = name;
        break;
      }
    }

    // sub-tables
    if (!hit && subSplit && subSplitTotal > 0) {
      const subRoll = roll - topTotal;
      let subAcc = 0;
      for (const [name, w] of Object.entries(subSplit)) {
        subAcc += w;
        if (subRoll <= subAcc) {
          hit = name;
          break;
        }
      }
    }

    if (hit && counts[hit] !== undefined) counts[hit]++;
  }

  console.table(
    Object.entries(counts).map(([k, v]) => ({
      Table: k,
      "Observed %": ((v / trials) * 100).toFixed(2) + "%",
    }))
  );
}

//Because we made this whole thing modular, the above function is not in the global scope by default. This means we can't test it.
//The below line of code adds this function to the global scope allowing it to be used.
window.testRDTDistribution = testRDTDistribution;

// ======== Event Listeners ========

// Rare Drop Table Toggle / Inventory Setup
document.addEventListener("DOMContentLoaded", () => {
  // Boss Selection Modal listeners
  document.getElementById("slayBossButton").addEventListener("click", () => {
    openBossSelectionModal(slayBoss, "What boss would you like to slay?");
  });

  document.getElementById("bossItemsButton").addEventListener("click", () => {
    openBossSelectionModal(checkBossItems, "What items can I receive?");
  });

  // Roll Again function listener
  document
    .getElementById("rollAgainButton")
    .addEventListener("click", rollAgain);

  // Close Modal button listener
  document.querySelectorAll(".close-button").forEach((button) => {
    button.addEventListener("click", closeModal);
  });

  setupInventoryModal();
});
