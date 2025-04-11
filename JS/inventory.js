"use strict";

//  ========== Inventory Module ==========
const InventoryModule = (function () {
  // ========== Internal Inventory Data ==========
  let inventory = {
    full: {},
    generic: {},
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
    itemName,
    quantity,
    type = "standard",
    killCount = null
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
      inventory.full[category][itemKey] = { name: itemName, quantity: 0 };
    }
    inventory.full[category][itemKey].quantity += quantity;

    // Condensed Boss Drop / Raid Drop logic below, into code above.

    // // Boss Drop Roller
    // if (bossName) {
    //   inventory.bosses[bossName] = inventory.bosses[bossName] || {
    //     kills: 0,
    //     drops: {},
    //   };
    //   // inventory.bosses[bossName].kills += 1;

    //   const itemKey = `${itemName}_${bossName}`;
    //   if (!inventory.bosses[bossName].drops[itemKey]) {
    //     inventory.bosses[bossName].drops[itemKey] = {
    //       name: itemName,
    //       quantity: 0,
    //     };
    //   }
    //   inventory.bosses[bossName].drops[itemKey].quantity += quantity;
    // }

    // // Raid Drop Roller
    // if (raidName) {
    //   inventory.raids[raidName] = inventory.raids[raidName] || {
    //     kills: 0,
    //     drops: {},
    //   };
    //   // inventory.raids[raidName].kills += 1;

    //   const itemKey = `${itemName}_${raidName}`;
    //   if (!inventory.raids[raidName].drops[itemKey]) {
    //     inventory.raids[raidName].drops[itemKey] = {
    //       name: itemName,
    //       quantity: 0,
    //     };
    //   }
    //   inventory.raids[raidName].drops[itemKey].quantity += quantity;
    // }

    // Collection Log and Pet Tracking
    if (type === "cLog" || type === "pet") {
      // Add collection log for all types (generic, bosses, raid)
      const source = bossName
        ? `Boss: ${bossName}`
        : raidName
        ? `Raid: ${raidName}`
        : "generic"; //Determine where item came from

      //Log collection log items and pets
      if (!inventory.collectionLog.uniqueItems[source]) {
        inventory.collectionLog.uniqueItems[source] = [];
      }

      const alreadyLogged = inventory.collectionLog.uniqueItems[source].find(
        (entry) => entry.item === itemName
      );

      if (alreadyLogged) {
        alreadyLogged.quantity = (alreadyLogged.quantity || 1) + quantity;
      } else {
        inventory.collectionLog.uniqueItems[source].push({
          item: itemName,
          type,
          kill:
            killCount ??
            (bossName
              ? inventory.bosses[bossName].kills
              : raidName
              ? inventory.raids[raidName].kills
              : 0),
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
            killNumber:
              killCount ??
              (bossName
                ? inventory.bosses[bossName].kills
                : raidName
                ? inventory.raids[raidName].kills
                : 0),
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
      generic: {},
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
    for (let category in inventory.full) {
      const [dropSim, name = "N/A"] = category.split(": ");
      for (let itemKey in inventory.full[category]) {
        const item = inventory.full[category][itemKey];
        const row = document.createElement("tr");

        // Drop Sim cell
        const simCell = document.createElement("td");
        simCell.textContent = dropSim;
        row.appendChild(simCell);

        // Boss/Raid name cell
        const nameCell = document.createElement("td");
        nameCell.textContent = name;
        row.appendChild(nameCell);

        // Item cell
        const itemCell = document.createElement("td");
        itemCell.textContent = item.name;
        row.appendChild(itemCell);

        // Total Quantity cell
        const quantityCell = document.createElement("td");
        quantityCell.textContent = item.quantity;
        row.appendChild(quantityCell);

        tbody.appendChild(row);
      }
      // Commenting out OLD below to try NEW above
      // const item = inventory.full[itemKey];
      // const row = document.createElement("tr");
      // const itemName = document.createElement("td");

      // itemName.textContent = item.name;
      // const itemQuantity = document.createElement("td");
      // itemQuantity.textContent = item.quantity;

      // row.appendChild(itemName);
      // row.appendChild(itemQuantity);
      // document.getElementById("inventoryItemsTable").appendChild(row);
    }
    itemsTable.appendChild(tbody);

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
    //Commenting out OLD below to try NEW above

    // for (let itemKey in inventory.collectionLog.uniqueItems) {
    // const logSection = document.createElement("div");
    // const itemHeader = document.createElement("h4");
    // itemHeader.textContent = `${itemKey}:`;

    // const logList = document.createElement("ul");
    // inventory.collectionLog.uniqueItems[itemKey].forEach((entry) => {
    //   const logItem = document.createElement("li");
    //   logItem.textContent = `${entry.item} - ${
    //     entry.type === "pet" ? "Pet" : "Unique"
    //   } (Kill #${entry.kill}, Total: ${entry.quantity ?? 1})`;
    //   logList.appendChild(logItem);
    // });

    // logSection.appendChild(itemHeader);
    // logSection.appendChild(logList);
    // document.getElementById("collectionLogSection").appendChild(logSection);
    // }

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
  //Commenting out OLD below to try NEW above

  // const petsSection = document.createElement("div");
  // petsSection.classList.add("pets-section");
  // const petsHeader = document.createElement("h4");
  // petsHeader.textContent = "Pet Collection";
  // petsSection.appendChild(petsHeader);

  // inventory.collectionLog.pets.forEach((pet) => {
  //   const petItem = document.createElement("p");
  //   petItem.textContent = `${pet.name} (First obtained on kill #${pet.killNumber}, Total Found: ${pet.quantity})`;
  //   petsSection.appendChild(petItem);
  // });

  // window.scrollTo({ top: 0, behavior: "smooth" });

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
