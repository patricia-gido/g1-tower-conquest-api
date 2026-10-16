// What the Library Game Hub shows about YOUR game (Hub Contract, rule 1).
// Lab Step 6: replace every CHANGE_ME value with your own.
const pkg = require('../../package.json');

module.exports = {
  slug: 'tower-conquest',            // your group's game, lower case with hyphens, for example shelf-climb
  name: 'Tower Conquest',            // the name players will see
  team: 'G10 (3-2)',            // your group's name and section, for example Bookworms (3-1)
  developer: 'patricia-gido',       // YOUR GitHub username: this build is yours
  description: 'My build for Bibliopolis: Tower Conquest, a tactical multiplayer quiz game for CS 313',     // one sentence about how the game is played
  min_players: 1,               // change to the limits your game is designed for
  max_players: 30,
  version: pkg.version,         // read from package.json, do not edit here
};
