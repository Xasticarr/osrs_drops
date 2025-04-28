"use strict";

import { InventoryModule } from "./inventory.js";

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("openInventoryBtn").addEventListener("click", () => {
    InventoryModule.updateInventoryModal();
    document.getElementById("inventoryModal").style.display = "flex";
  });

  document.querySelectorAll(".close-button").forEach((button) => {
    button.addEventListener("click", closeModal);
  });
});
