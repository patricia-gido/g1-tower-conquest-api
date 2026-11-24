// What the Library Game Hub shows about YOUR game (Hub Contract, rule 1).
// Lab Step 6: replace every CHANGE_ME value with your own.
const pkg = require('../../package.json');

module.exports = {
  slug: 'g1-tower-conquest-api',
  name: 'Tower Conquest',
  team: 'G10 (3-2)',
  developer: 'patricia-gido',
  description: 'My build for Bibliopolis: Tower Conquest, a tactical multiplayer quiz game for CS 313',
  min_players: 1,
  max_players: 30,
  version: pkg.version,
};