"use strict";

function rollRandomNumber(max) {
  return Math.floor(Math.random() * max) + 1;
}

//Now we gotta set up the bosses. To keep it in line with OSRS, unfortunatly every boss gets it's own individual drop tables.

const bosses = {};
