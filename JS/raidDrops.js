"use strict";

import { InventoryModule } from "../modules/models/Inventory.js";
import { AllRaids } from "../modules/data/raids/index.js";
import { DropTable } from "../modules/models/DropTable.js";

function rollRandomNumber(max) {
  return Math.floor(Math.random() * max);
}

function rollItemQuantity(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

Object.keys(AllRaids).forEach((raidName) => {
  const raid = AllRaids[raidName];
});

function getItems(table) {
  if (!table) return [];
  if (Array.isArray(table)) return table;
  return Array.isArray(table.items) ? table.items : [];
}

function calculateTableProbabilities(raid) {
  let tableChances = {};
  const rolls = raid.doubleRoll ? 2 : raid.tripleRoll ? 3 : 1;

  for (const [table, items] of Object.entries(raid.dropTables)) {
    const tableItems = getItems(items);

    if (raid.preRoll && table === raid.preRoll.table) continue;

    let tableChance = tableItems.reduce(
      (sum, item) => sum + (item.rarity || 0),
      0
    );
    tableChances[table] = tableChance / rolls; //Adjusting for amount of rolls
  }

  let totalChance = Object.values(tableChances).reduce(
    (sum, chance) => sum + chance,
    0
  );

  return { tableChances, totalChance };
}

function getRaidDropTable(raid) {
  const { tableChances, totalChance } = calculateTableProbabilities(raid);

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

function rollForRaidItem(raid, tableName) {
  let table;
  table = raid.dropTables[tableName];

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

function rollForTertiaryDrop(raid) {
  if (!raid.tertiaryDrops || raid.tertiaryDrops.length === 0) return null;
  for (const item of raid.tertiaryDrops) {
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

const raidState = {
  lastRaidRolled: null,
  lastRaidName: "",
};

function applyDropsToInventory(drops, raid) {
  let killLogged = false;

  drops.forEach((drop) => {
    const {
      item,
      quantity,
      dropTable,
      tablePath,
      dropInfo: dropInfoFromDrop,
    } = drop;

    // Collection log setup
    let type = "standard";
    let rare = false;
    let megaRare = false;

    // Use dropInfo if already attached
    let dropInfo = dropInfoFromDrop;

    // If no dropInfo, try to find it in the corresponding table
    if (!dropInfo) {
      let fullTable;

      // Standard table
      if (dropTable && raid.dropTables?.[dropTable]) {
        fullTable = getItems(raid.dropTables[dropTable]);
      }
      // Tertiary table
      else if (dropTable === "tertiary") {
        const difficulty = raid.currentDifficulty ?? "Normal";
        let tertiaryArray = [];

        if (raid.tertiaryDrops) {
          if (Array.isArray(raid.tertiaryDrops)) {
            tertiaryArray = raid.tertiaryDrops;
          } else {
            tertiaryArray = raid.tertiaryDrops[difficulty.toLowerCase()] ?? [];
          }
        }

        fullTable = getItems(tertiaryArray);
      }
      // Fallback for dynamic drops
      else {
        fullTable = [{ name: item }];
      }

      dropInfo = fullTable?.find((entry) => entry.name === item);
    }

    // Warn only if we truly have nothing
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

    // Flags
    const isCLog = dropInfo?.cLog === true;
    const isPet = dropInfo?.type === "pet";
    rare = dropInfo?.rare === true;
    megaRare = dropInfo?.megaRare === true;

    // Log the kill once
    if (!killLogged) {
      InventoryModule.updateInventory(raid.name, null, null, 0);
      killLogged = true;
    }

    // Determine type for Inventory update
    if (isCLog && isPet) {
      InventoryModule.updateInventory(
        raid.name,
        null,
        item,
        quantity,
        "pet",
        null,
        rare,
        megaRare
      );
    } else if (isCLog) {
      type = "cLog";
      InventoryModule.updateInventory(
        raid.name,
        null,
        item,
        quantity,
        type,
        null,
        rare,
        megaRare
      );
    } else if (isPet) {
      type = "pet";
      InventoryModule.updateInventory(
        raid.name,
        null,
        item,
        quantity,
        type,
        null,
        rare,
        megaRare
      );
    } else {
      InventoryModule.updateInventory(
        raid.name,
        null,
        item,
        quantity,
        type,
        null,
        rare,
        megaRare
      );
    }
  });
}

function generateRaidDrop(raid, options = {}) {
  if (!raid) {
    console.error("generateRaidDrop called with no raid!");
    return;
  }

  // Save last state/options so rollAgain can use them
  raidState.lastRaidRolled = raid;
  raidState.lastRaidName = raid.name || raid.key || "Unknown";
  raidState.lastOptions = options || {};

  //Building a helpers object to avoid repeating inputs

  const helpers = {
    getItems,
    rollItemQuantity,
    rollForRaidItem,
    rollForTertiaryDrop,
    rollTableItems, //In case the raid needs lower level access
    rollGroupedTableItems,
  };

  let drops = [];

  //If raid defines a dropFunction, we want to use it

  if (typeof raid.dropFunction === "function") {
    try {
      const result = raid.dropFunction(raid, options, helpers);
      if (!Array.isArray(result)) {
        console.error(
          `dropFunction for raid "${
            raid.key ?? raid.name
          }" did not return an array.`
        );
        return;
      }
      drops = result;
    } catch (err) {
      console.error("Error in raid-specific dropFunction", err);
      return;
    }
  } else {
    // No raid-specific function → fallback to the existing universal behavior
    // (Includes pre-roll unique handling, regular rolls, exclusive logic, tertiary roll)

    // Preserve existing logic: compute rolls, check unique via points if provided, pre-roll logic, etc.
    let rolls = raid.doubleRoll ? 2 : raid.tripleRoll ? 3 : 1;
    let isExclusiveDrop = false;

    const pointsEarned = options.pointsEarned ?? null;

    // Universal unique pre-roll (only if raid has uMod and a unique table)
    if (
      pointsEarned &&
      typeof raid.uMod === "number" &&
      raid.uMod > 0 &&
      raid.dropTables &&
      raid.dropTables.unique
    ) {
      const uniqueChance = Math.min(pointsEarned / raid.uMod, 1);
      if (Math.random() <= uniqueChance) {
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
                ? rollItemQuantity(
                    uniqueDrop.quantity[0],
                    uniqueDrop.quantity[1]
                  )
                : uniqueDrop.quantity,
              tablePath: uniqueDrop.tablePath,
              type: uniqueDrop.type,
              cLog: uniqueDrop.cLog,
            });
          }
          isExclusiveDrop = true;
        }
      }
    }

    // Always include 'always' table items
    if (raid.dropTables.always) {
      getItems(raid.dropTables.always)?.forEach((itemObj) => {
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

    // Pre-roll logic (legacy preRoll support)
    let preRolled = false;
    if (raid.preRoll) {
      let shouldPreRoll = raid.preRoll.everyRoll || !preRolled;

      if (shouldPreRoll) {
        const preRollItems = getItems(raid.dropTables[raid.preRoll.table]);
        const preRollChance = preRollItems?.reduce(
          (sum, item) => sum + (item.rarity || 0),
          0
        );

        if (Math.random() < preRollChance) {
          const preDropTable = raid.preRoll.table;
          const preDrop = rollForRaidItem(raid, preDropTable);
          if (preDrop) {
            //Check if item is exclusive
            const entries = getItems(raid.dropTables[preDropTable]);
            const droppedItem = entries?.find(
              (item) => item.name === preDrop.item
            );
            const isExclusive = droppedItem && droppedItem.exclusive === true;
            let finalQuantity = Array.isArray(preDrop.quantity)
              ? rollItemQuantity(preDrop.quantity[0], preDrop.quantity[1])
              : preDrop.quantity;

            drops.push({
              dropTable: preDropTable,
              item: preDrop.item,
              quantity: finalQuantity,
              type: preDrop.type,
              cLog: preDrop.cLog,
            });

            if (isExclusive) {
              isExclusiveDrop = true;
            }
          }
        }
      }
      preRolled = true;
    }

    // Regular rolls (if not exclusive)
    if (!isExclusiveDrop) {
      for (let i = 0; i < rolls; i++) {
        let dropTable;
        do {
          dropTable = getRaidDropTable(raid);
        } while (preRolled && dropTable === raid.preRoll?.table);

        const itemDrop = rollForRaidItem(raid, dropTable);
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

    // Universal tertiary handling (some raids may override in their dropFunction)
    let tertiaryDrop = rollForTertiaryDrop(raid);
    if (tertiaryDrop) {
      drops.push({
        dropTable: "tertiary",
        item: tertiaryDrop.item,
        quantity: tertiaryDrop.quantity,
        type: tertiaryDrop.type,
        cLog: tertiaryDrop.cLog,
      });
    }
  } // end default branch

  // After generating drops (either via dropFunction or default), update modal and inventory

  populateRaidDropModal(drops);
  applyDropsToInventory(drops, raid);

  return drops;
}

function rollAgain() {
  const lastRaid = raidState.lastRaidRolled;
  const lastOptions = raidState.lastOptions;

  if (raidState.lastRaidRolled) {
    generateRaidDrop(lastRaid, lastOptions);
  } else {
    console.error("No raid has been rolled yet!");
  }
}

function populateRaidDropModal(drops) {
  const raidDropResultText = document.getElementById("raidDropResultText");

  //Clear previous drop content
  raidDropResultText.textContent = "";

  let raidName = raidState.lastRaidName;
  let tertiaryDrop = null;

  //Loop through each drop and display it
  drops.forEach(({ dropTable, item, quantity }) => {
    const raidDropTableText = document.createElement("p");

    if (dropTable === "always") {
      raidDropTableText.textContent = `You received ${raidName} drop: ${quantity}x ${item}!`;
      raidDropResultText.appendChild(raidDropTableText);
    } else if (dropTable === "tertiary") {
      //Store the tertiary drop here to append later
      tertiaryDrop = { item, quantity };
    } else {
      let formattedDropTable =
        typeof dropTable === "string"
          ? dropTable.replace(/([a-z])([A-Z])/g, "$1 $2").toUpperCase()
          : (console.warn("DropTable not a string:", dropTable),
            "UNKNOWN TABLE");

      raidDropTableText.textContent = `You hit the ${formattedDropTable} drop table!`;

      const raidItemDropText = document.createElement("p");
      raidItemDropText.textContent = `You received: ${quantity}x ${item}!`;

      raidDropResultText.appendChild(raidDropTableText);
      raidDropResultText.appendChild(raidItemDropText);
    }
  });

  if (tertiaryDrop) {
    const tertiaryDropText = document.createElement("p");
    tertiaryDropText.textContent = `You rolled a TERTIARY drop: ${tertiaryDrop.quantity}x ${tertiaryDrop.item}!`;
    raidDropResultText.appendChild(tertiaryDropText);
  }

  //pop up the modal
  document.getElementById("raidDropModal").style.display = "flex";
}

function getRaidTablesAndItems(raid) {
  if (!raid || !raid.dropTables) {
    console.error("Invalid raid data:", raid);
    return [];
  }
  let tablesAndItems = [];
  const { tableChances, totalChance } = calculateTableProbabilities(raid);
  const rolls = raid.doubleRoll ? 2 : raid.tripleRoll ? 3 : 1;

  // Standard Drop Tables
  for (let tableName in raid.dropTables) {
    const rawTable = raid.dropTables[tableName];

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

  // Tertiary drops
  if (Array.isArray(raid.tertiaryDrops) && raid.tertiaryDrops.length > 0) {
    let tertiaryItems = raid.tertiaryDrops.map((drop) => {
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

function populateRaidItemsModal(raid) {
  let raidTableContainer = document.querySelector(
    "#raidItemModal #raid-table-container"
  );

  while (raidTableContainer.firstChild) {
    raidTableContainer.removeChild(raidTableContainer.firstChild);
  }

  //Create Raid Tables

  let raidTable = document.createElement("table");
  raidTable.classList.add("raid-drop-table");

  let raidTableHeader = document.createElement("thead");
  let raidHeaderRow = document.createElement("tr");

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
    raidHeaderRow.appendChild(headerCell);
  });

  raidTableHeader.appendChild(raidHeaderRow);
  raidTable.appendChild(raidTableHeader);

  let raidTableBody = document.createElement("tbody");

  let rowIndex = 0; //Track alternating rows

  let tablesAndItems = getRaidTablesAndItems(raid);
  tablesAndItems.forEach((tableData) => {
    let rowSpanCount = tableData.items.length; //Number of items in the table
    tableData.items.forEach((itemData, index) => {
      let row = document.createElement("tr");

      //Apply alternating background color using rowIndex
      if (tableData.table.toLowerCase().includes("unique")) {
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

      raidTableBody.appendChild(row);
    });

    rowIndex++;
  });

  raidTable.appendChild(raidTableBody);
  raidTableContainer.appendChild(raidTable);

  document.getElementById("raidItemModal").style.display = "flex";
}

function closeModal(event) {
  const modal = event.target.closest(".modal");
  modal.style.display = "none";
}

function openRaidSelectionModal(callbackFunction, titleText) {
  const modal = document.getElementById("raidSelectionModal");
  const modalTitle = modal.querySelector(".modal-header h2");

  // Update title dynamically
  modalTitle.textContent = titleText;

  modal.style.display = "flex";

  // Remove existing event listeners to prevent duplicate bindings
  document.querySelectorAll(".raidButton").forEach((button) => {
    button.replaceWith(button.cloneNode(true)); //Clone and replace to remove old listeners
  });

  // Reattach event listeners with the new callback
  document.querySelectorAll(".raidButton").forEach((button) => {
    button.addEventListener("click", (event) => {
      const raidName = event.target.getAttribute("raid-data");
      const selectedRaid = AllRaids[raidName];
      callbackFunction(selectedRaid);
      closeModal(event);
    });
  });
}

function showRaidConfigModal(raid) {
  let modal = document.getElementById("raidConfigModal");

  // Create modal once
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "raidConfigModal";
    modal.classList.add("modal");

    const content = document.createElement("div");
    content.classList.add("modal-content");
    modal.appendChild(content);

    // HEADER
    const header = document.createElement("div");
    header.classList.add("modal-header");
    content.appendChild(header);

    const title = document.createElement("h2");
    title.id = "raidConfigModalTitle";
    header.appendChild(title);

    const closeBtn = document.createElement("button");
    closeBtn.classList.add("close-button");
    closeBtn.textContent = "X";
    closeBtn.title = "Close";
    closeBtn.id = "raidConfigModalClose";
    header.appendChild(closeBtn);

    // BODY
    const body = document.createElement("div");
    body.classList.add("modal-body");
    body.id = "raidConfigModalBody";
    content.appendChild(body);

    // FOOTER
    const footer = document.createElement("div");
    footer.classList.add("modal-footer");
    footer.id = "raidConfigModalFooter";
    content.appendChild(footer);

    document.getElementById("raidConfigModalContainer").appendChild(modal);
    // document.querySelector("main").appendChild(modal);
  }

  // --------------------------------------
  // CLEAN OUT OLD CONTENT + OLD LISTENERS
  // --------------------------------------

  const titleEl = modal.querySelector("#raidConfigModalTitle");
  const bodyEl = modal.querySelector("#raidConfigModalBody");
  const footerEl = modal.querySelector("#raidConfigModalFooter");

  // Remove ALL children safely (no innerHTML)
  while (bodyEl.firstChild) bodyEl.removeChild(bodyEl.firstChild);
  while (footerEl.firstChild) footerEl.removeChild(footerEl.firstChild);

  // Remove old event listeners on close + send buttons
  const closeBtn = modal.querySelector("#raidConfigModalClose");
  const cleanClose = closeBtn.cloneNode(true);
  closeBtn.replaceWith(cleanClose);

  // --------------------------------------
  // BUILD RAID-SPECIFIC UI
  // --------------------------------------

  if (raid.key === "CoX") {
    titleEl.textContent = "How many points did you earn?";
    buildCoXPointsUI(bodyEl);
  } else if (raid.key === "ToB") {
    titleEl.textContent = "Select difficulty";
    buildToBDifficultyUI(bodyEl);
  } else if (raid.key === "ToA") {
    titleEl.textContent = "Set invocation level";
    buildToAInvocationsUI(bodyEl);
  } else {
    titleEl.textContent = "Configure Raid";
    const p = document.createElement("p");
    p.textContent = "No special configuration needed.";
    bodyEl.appendChild(p);
  }

  // FOOTER BUTTONS
  let cancelBtn = document.createElement("button");
  cancelBtn.classList.add("modal-button");
  cancelBtn.textContent = "Cancel";

  let sendBtn = document.createElement("button");
  sendBtn.classList.add("modal-button");
  sendBtn.textContent = "Send Raid";

  footerEl.appendChild(cancelBtn);
  footerEl.appendChild(sendBtn);

  // --------------------------------------
  // REMOVE OLD LISTENERS & ATTACH CLEAN ONES
  // --------------------------------------

  const cleanCancel = cancelBtn.cloneNode(true);
  cancelBtn.replaceWith(cleanCancel);

  const cleanSend = sendBtn.cloneNode(true);
  sendBtn.replaceWith(cleanSend);

  cleanClose.addEventListener("click", () => {
    modal.style.display = "none";
  });

  cleanCancel.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // SEND RAID HANDLER
  cleanSend.addEventListener("click", () => {
    let raidOptions = {};

    if (raid.key === "CoX") {
      const selected = modal.querySelector(
        'input[name="pointsEarned"]:checked'
      );
      if (!selected) return alert("Please select points earned.");
      raidOptions.pointsEarned = Number(selected.value);
    }

    if (raid.key === "ToB") {
      const selected = modal.querySelector(
        'input[name="tobDifficulty"]:checked'
      );
      if (!selected) return alert("Please select difficulty.");
      raidOptions.difficulty = selected.value;
    }

    if (raid.key === "ToA") {
      const selected = modal.querySelector(
        'input[name="invocationLevel"]:checked'
      );
      if (!selected) return alert("Please set invocation level");
      raidOptions.invocationLevel = selected.value;
    }

    // ToA will get options later

    modal.style.display = "none";

    raidState.lastOptions = raidOptions;
    sendRaid(raid, raidState.lastOptions);
  });

  modal.style.display = "flex";
}

function buildCoXPointsUI(bodyEl) {
  const pointsOptions = [25000, 30000, 35000, 40000, 45000, 50000];

  const container = document.createElement("div");
  container.classList.add("points-options");

  pointsOptions.forEach((value, index) => {
    const label = document.createElement("label");
    label.classList.add("points-toggle");

    const input = document.createElement("input");
    input.type = "radio";
    input.name = "pointsEarned";
    input.value = value;
    input.id = `raidPoints_${index}`;

    const span = document.createElement("span");
    span.textContent = value.toLocaleString();

    label.appendChild(input);
    label.appendChild(span);
    container.appendChild(label);
  });

  bodyEl.appendChild(container);
}

function buildToBDifficultyUI(bodyEl) {
  const options = [
    { label: "Normal Mode", value: "Normal" },
    { label: "Hard Mode", value: "Hard" },
  ];

  const container = document.createElement("div");
  container.classList.add("difficulty-options");

  options.forEach((opt, index) => {
    const label = document.createElement("label");
    label.classList.add("difficulty-toggle");

    const input = document.createElement("input");
    input.type = "radio";
    input.name = "tobDifficulty";
    input.value = opt.value;
    input.id = `tobDiff_${index}`;

    const span = document.createElement("span");
    span.textContent = opt.label;

    label.appendChild(input);
    label.appendChild(span);
    container.appendChild(label);
  });

  bodyEl.appendChild(container);
}

function buildToAInvocationsUI(bodyEl) {
  const invocationOptions = [0, 100, 150, 300, 350, 400, 450, 500];

  const container = document.createElement("div");
  container.classList.add("invocation-options");

  invocationOptions.forEach((value, index) => {
    const label = document.createElement("label");
    label.classList.add("invocation-toggle");

    const input = document.createElement("input");
    input.type = "radio";
    input.name = "invocationLevel";
    input.value = value;
    input.id = `raidInvocation_${index}`;

    const span = document.createElement("span");
    span.textContent = value.toLocaleString();

    label.appendChild(input);
    label.appendChild(span);
    container.appendChild(label);
  });

  bodyEl.appendChild(container);
}

//Simplifying selectRaid to make it more universal with helper UI functions above

function selectRaid(raid) {
  if (!raid) return console.error("No raid supplied to selectRaid");

  //All UI is routed through the universal modal
  showRaidConfigModal(raid);
}

function sendRaid(raid, options = {}) {
  raidState.lastOptions = options || {};
  // generateRaidDrop now accepts raid + options and returns drops
  generateRaidDrop(raid, options);
}

function checkRaidItems(raid) {
  console.log("Selected raid:", raid.name, raid);
  populateRaidItemsModal(raid);
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

// ======== Event Listeners ========

//Inventory Setup
document.addEventListener("DOMContentLoaded", () => {
  // Raid Selection Modal listeners
  document.getElementById("selectRaidButton").addEventListener("click", () => {
    openRaidSelectionModal(selectRaid, "What raid are we sending?");
  });

  document.getElementById("raidItemsButton").addEventListener("click", () => {
    openRaidSelectionModal(checkRaidItems, "What loot can we receive?");
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
