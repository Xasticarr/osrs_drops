"use strict";

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
        if (dropTable === RareDropTable) {
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
