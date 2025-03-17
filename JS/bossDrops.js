"use strict";

function rollRandomNumber(max) {
  return Math.floor(Math.random() * max) + 1;
}

function rollItemQuantity(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Now we gotta set up the bosses. To keep it in line with OSRS, unfortunatly every boss gets it's own individual drop tables.

const bosses = {};
