"use strict";

//  ========== Inventory Module ==========
const InventoryModule = (function () {
  // ========== Internal Inventory Data ==========
  let inventory = {
    full: {},
    generic: { kills: 0 },
    bosses: {}, //Example: { Zulrah: { kills: x, drops: { " Serp Visage": y}}} Where x and y are quantity values
    raids: {},
    collectionLog: {
      pets: [], //Specific place for pets
      uniqueItems: {}, //Boss Uniques, maybe Raid Uniques
    },
  };

  // ============ Helper Functions ============
  function updateInventory(
    raidName = null,
    bossName = null,
    itemName = null,
    quantity = 0,
    type = "standard",
    killCount = null,
    rare = false //Added for table formatting
  ) {
    if (bossName && !itemName) {
      if (!inventory.bosses[bossName]) {
        inventory.bosses[bossName] = { kills: 0, drops: {} };
      }
      inventory.bosses[bossName].kills += 1;
      saveInventoryToStorage();
      updateInventoryModal();
      return; // Exit early after handling kill
    }

    if (raidName && !itemName) {
      if (!inventory.raids[raidName]) {
        inventory.raids[raidName] = { kills: 0, drops: {} };
      }
      inventory.raids[raidName].kills += 1;
      saveInventoryToStorage();
      updateInventoryModal();
      return; // Exit early after handling kill
    }

    if (!raidName && !bossName && itemName === null) {
      if (!inventory.generic) {
        inventory.generic = { kills: 0 };
      }
      inventory.generic.kills += 1;
      saveInventoryToStorage();
      updateInventoryModal();
      return;
    }

    //Determine the category based on the source
    let category;

    if (bossName) {
      category = `Boss: ${bossName}`;
    } else if (raidName) {
      category = `Raid: ${raidName}`;
    } else {
      category = "Generic";
    }

    // Add or update item in the appropriate category

    if (!inventory.full[category]) {
      inventory.full[category] = {};
    }

    const itemKey = `${itemName}_${category}`;
    if (!inventory.full[category][itemKey]) {
      inventory.full[category][itemKey] = { name: itemName, quantity: 0, rare }; // Storing rare property
    }
    inventory.full[category][itemKey].quantity += quantity;

    // Collection Log and Pet Tracking
    if (type === "cLog" || type === "pet") {
      // Add collection log for all types (generic, bosses, raid)
      const source = bossName
        ? `(Boss) ${bossName}`
        : raidName
        ? `(Raid) ${raidName}`
        : "Generic"; //Determine where item came from

      //Log collection log items and pets
      if (!inventory.collectionLog.uniqueItems[source]) {
        inventory.collectionLog.uniqueItems[source] = [];
      }

      const alreadyLogged = inventory.collectionLog.uniqueItems[source].find(
        (entry) => entry.item === itemName
      );

      const loggedKill =
        killCount ??
        (bossName
          ? inventory.bosses[bossName].kills
          : raidName
          ? inventory.raids[raidName].kills
          : inventory.generic.kills);

      if (alreadyLogged) {
        alreadyLogged.quantity = (alreadyLogged.quantity || 1) + quantity;
      } else {
        inventory.collectionLog.uniqueItems[source].push({
          item: itemName,
          type,
          kill: loggedKill,
          quantity: quantity,
        });
      }
      //Track pets separately
      if (type === "pet") {
        const petAlreadyLogged = inventory.collectionLog.pets.find(
          (petEntry) => petEntry.name === itemName
        );

        if (petAlreadyLogged) {
          petAlreadyLogged.quantity =
            (petAlreadyLogged.quantity || 1) + quantity;
        } else {
          inventory.collectionLog.pets.push({
            name: itemName,
            killNumber: loggedKill,
            quantity: quantity,
          });
        }
      }
    }

    // Handle other types (raid items?) later
    saveInventoryToStorage();
    updateInventoryModal();
  }

  // ========= Save/Load Inventory Functions ==========
  function saveInventoryToStorage() {
    localStorage.setItem("inventoryData", JSON.stringify(inventory));
  }

  // Load inventory data from local storage
  function loadInventoryFromStorage() {
    const savedData = localStorage.getItem("inventoryData");
    if (savedData) {
      inventory = JSON.parse(savedData);
    }
  }

  //  ========== Reset ==========
  function resetInventory() {
    inventory = {
      full: {},
      generic: { kills: 0 },
      bosses: {},
      raids: {},
      collectionLog: {
        pets: [],
        uniqueItems: {},
      },
    };

    //Remove from localStorage
    localStorage.removeItem("inventoryData");

    // Refresh Modal Content
    updateInventoryModal();
  }

  // ========== Modal Update Function ==========
  function updateInventoryModal() {
    //Clear existing content
    clearSectionContent("genericRollsSection");
    clearSectionContent("inventoryItemsTable");
    clearSectionContent("bossKillsSection");
    clearSectionContent("raidKillsSection");
    clearSectionContent("collectionLogSection");

    // Inventory Items Table

    const itemsTable = document.getElementById("inventoryItemsTable");
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    const headers = ["Category", "Boss/Raid", "Item", "Total Quantity"];
    headers.forEach((headerText) => {
      const th = document.createElement("th");
      th.textContent = headerText;
      headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    itemsTable.appendChild(thead);

    // Create table body

    const tbody = document.createElement("tbody");

    // Group and sort items by category (Boss, Raid, Generic)
    const categories = {};
    Object.keys(inventory.full).forEach((category) => {
      const [dropSim, name = "N/A"] = category.split(": ");
      if (!categories[dropSim]) {
        categories[dropSim] = {};
      }
      categories[dropSim][name] = Object.values(inventory.full[category]);
    });

    //Iterate over category types (Boss, Raid, Generic)
    Object.keys(categories)
      .sort()
      .forEach((dropSim) => {
        const categoryItems = categories[dropSim];
        const totalCategoryRows = Object.values(categoryItems).reduce(
          (sum, items) => sum + items.length,
          0
        );

        // Iterate over specific bosses/raids within category
        Object.keys(categoryItems)
          .sort()
          .forEach((name, nameIndex) => {
            const items = categoryItems[name];

            // Sort items: rare items first, then by quantity descending
            items.sort((a, b) => {
              if (a.rare && !b.rare) return -1; //Rare items first
              if (!a.rare && b.rare) return 1;
              return b.quantity - a.quantity; // Highest quantity first
            });

            const rowSpanCount = items.length;
            items.forEach((item, index) => {
              const row = document.createElement("tr");

              // Apply rare item styling
              if (item.rare) {
                row.classList.add("rare-item");
              }

              // Category column (Only on first row of entire category)
              if (nameIndex === 0 && index === 0) {
                const simCell = document.createElement("td");
                simCell.textContent = dropSim;
                simCell.rowSpan = totalCategoryRows;
                simCell.style.verticalAlign = "middle"; //Align to top
                if (dropSim === "Boss") simCell.classList.add("boss-category");
                else if (dropSim === "Raid")
                  simCell.classList.add("raid-category");
                else if (dropSim == "Generic")
                  simCell.classList.add("generic-category");
                row.appendChild(simCell);
              }

              // Boss/Raid name cell (merged with color)
              if (index === 0) {
                const nameCell = document.createElement("td");
                nameCell.textContent = name;
                nameCell.rowSpan = rowSpanCount;
                nameCell.classList.add("boss-name");
                if (name === "Zulrah") nameCell.classList.add("Zulrah");
                else if (name === "Vorkath") nameCell.classList.add("Vorkath");
                else if (name === "Muspah") nameCell.classList.add("Muspah");
                else if (name === "N/A") nameCell.classList.add("Generic");
                row.appendChild(nameCell);
              }

              // Item cell
              const itemCell = document.createElement("td");
              itemCell.textContent = item.name;
              row.appendChild(itemCell);

              // Total Quantity cell
              const quantityCell = document.createElement("td");
              quantityCell.textContent = item.quantity;
              row.appendChild(quantityCell);

              tbody.appendChild(row);
            });
          });
      });

    itemsTable.appendChild(tbody);

    //Populating Generic Rolls
    if (inventory.generic.kills > 0) {
      const genericRow = document.createElement("div");
      genericRow.textContent = `Generic Drops: ${inventory.generic.kills}`;
      document.getElementById("genericRollsSection").appendChild(genericRow);
    }

    // Populating Boss Kills (from Boss Drop Roller)

    for (let bossName in inventory.bosses) {
      const bossRow = document.createElement("div");
      bossRow.textContent = `${bossName}: ${inventory.bosses[bossName].kills} kill(s)`;
      document.getElementById("bossKillsSection").appendChild(bossRow);
    }

    // Populating Raid Clears
    for (let raidName in inventory.raids) {
      const raidRow = document.createElement("div");
      raidRow.textContent = `${raidName}: ${inventory.raids[raidName].kills} clear(s)`;
      document.getElementById("raidKillsSection").appendChild(raidRow);
    }

    // Populating Collection Log (ALL ROLLERS)
    const logContainer = document.createElement("div");
    const logToggle = document.createElement("button");
    logToggle.textContent = "Show Collection Log";
    logToggle.classList.add("toggle-button");
    logToggle.id = "logToggle";
    logContainer.appendChild(logToggle);

    const logContent = document.createElement("div");
    logContent.id = "logContent";
    logContent.style.display = "none";
    for (let source in inventory.collectionLog.uniqueItems) {
      const logSection = document.createElement("div");
      const itemHeader = document.createElement("h4");
      itemHeader.textContent = `${source}:`;
      const logList = document.createElement("ul");

      inventory.collectionLog.uniqueItems[source].forEach((entry) => {
        const logItem = document.createElement("li");
        logItem.textContent = `${entry.item} - ${
          entry.type === "pet" ? "Pet" : "Unique"
        } (Kill #${entry.kill}, Total: ${entry.quantity ?? 1})`;
        logList.appendChild(logItem);
      });

      logSection.appendChild(itemHeader);
      logSection.appendChild(logList);
      document.getElementById("collectionLogSection").appendChild(logSection);
      logContent.appendChild(logSection);
    }
    logContainer.appendChild(logContent);
    document.getElementById("collectionLogSection").appendChild(logContainer);

    // Populating Pets (in a separate section)

    const petContainer = document.createElement("div");
    const petToggle = document.createElement("button");
    petToggle.textContent = "Show Pets";
    petToggle.classList.add("toggle-button");
    petToggle.id = "petToggle";
    petContainer.appendChild(petToggle);

    const petContent = document.createElement("div");
    petContent.id = "petContent";
    petContent.style.display = "none";
    inventory.collectionLog.pets.forEach((pet) => {
      const petItem = document.createElement("p");
      petItem.textContent = `${pet.name} (First obtained on kill #${pet.killNumber}, Total Found: ${pet.quantity})`;
      petContent.appendChild(petItem);
    });
    petContainer.appendChild(petContent);
    document.getElementById("collectionLogSection").appendChild(petContainer);

    // Event Listeners for Toggles
    //Need to set up in a function now because they don't work currently

    setupToggleListeners();
  }
  function setupToggleListeners() {
    const logToggle = document.getElementById("logToggle");
    const logContent = document.getElementById("logContent");
    const petToggle = document.getElementById("petToggle");
    const petContent = document.getElementById("petContent");

    if (logToggle && logContent) {
      // Remove existing listener to prevent duplicates
      logToggle.removeEventListener("click", toggleLogHandler);
      logToggle.addEventListener("click", toggleLogHandler);
    }

    if (petToggle && petContent) {
      petToggle.removeEventListener("click", togglePetHandler);
      petToggle.addEventListener("click", togglePetHandler);
    }

    function toggleLogHandler() {
      console.log("Collection Log toggle clicked");
      if (
        logContent.style.display === "none" ||
        logContent.style.display === ""
      ) {
        logContent.style.display = "block";
        logToggle.textContent = "Hide Collection Log";
      } else {
        logContent.style.display = "none";
        logToggle.textContent = "Show Collection Log";
      }
    }

    function togglePetHandler() {
      console.log("Pet Log toggle clicked");
      if (
        petContent.style.display === "none" ||
        petContent.style.display === ""
      ) {
        petContent.style.display = "block";
        petToggle.textContent = "Hide Pets";
      } else {
        petContent.style.display = "none";
        petToggle.textContent = "Show Pets";
      }
    }
  }

  // Utility function to clear a section (if needed)
  function clearSectionContent(sectionId) {
    const section = document.getElementById(sectionId);
    while (section.firstChild) {
      section.removeChild(section.firstChild);
    }
  }

  // ========== Initialize/Load Inventory ==========
  loadInventoryFromStorage();

  // ========== Public API ==========
  return {
    updateInventory,
    loadInventoryFromStorage,
    resetInventory,
    getInventory: () => JSON.parse(JSON.stringify(inventory)),
    updateInventoryModal,
    setupToggleListeners,
  };
})();

document.addEventListener("DOMContentLoaded", () => {
  const openInventoryBtn = document.getElementById("openInventoryBtn");
  const inventoryModal = document.getElementById("inventoryModal");

  if (openInventoryBtn && inventoryModal) {
    openInventoryBtn.addEventListener("click", () => {
      InventoryModule.updateInventoryModal(); // Update content
      inventoryModal.style.display = "flex"; //Show the modal
    });
  }

  // Close Modal
  document.querySelectorAll(".close-button").forEach((button) => {
    button.addEventListener("click", (event) => {
      const modal = event.target.closest(".modal");
      modal.style.display = "none";
    });
  });

  // Reset Inventory
  const resetButton = document.getElementById("resetInventoryButton");
  if (resetButton) {
    resetButton.addEventListener("click", () => {
      if (
        confirm(
          "Are you sure you want to reset your inventory? This cannot be undone."
        )
      ) {
        InventoryModule.resetInventory();
        InventoryModule.updateInventoryModal();
      }
    });
  }
});

export { InventoryModule };
