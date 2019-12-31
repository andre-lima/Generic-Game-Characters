import { Party } from "./components/Party/Party";
import { Combat } from "./components/Combat/Combat";
import { ConfirmationBox } from "./services/confirmationBox.service";
import { Encounter } from "./components/Combat/Encounter";
import { Character } from "./components/Character/Character";
import {
  twoHandedSword,
  broadSword
} from "./components/items/attack/swords.item";
import {
  woodenShield,
  towerShield
} from "./components/items/defense/shields.item";
import { Weapon } from "./components/interfaces/interfaces";
import {
  confirmSwapItem,
  alertBox,
  dialogBox,
  buyItems
} from "./services/confirmationActions";
import { paddedRobe } from "./components/items/defense/armors.item";
import story from "./dialog/stories/demo.json";
import { Dialog } from "./dialog/Dialog";
const inkStory = new Dialog(story);

dialogBox(inkStory);

// https://github.com/y-lohse/inkjs/blob/master/templates/browser_with_server/main.js

// -------------------
// Characters setup
const warrior1 = new Character("warrior", 1, "Wehr Ior");
const cleric1 = new Character("cleric", 2, "Klor Ik");
const wizard1 = new Character("wizard", 3, "Uiz Erd");

const enemy1 = new Character("orc", 1);
const enemy2 = new Character("orc", 1);
const enemy3 = new Character("orc", 1);
const enemy4 = new Character("skeleton", 1);

// -------------------
// Party setup
const goodParty = new Party([warrior1, cleric1, wizard1]);
const badParty = new Encounter().generateRandomEnemies(3, 10, 2); //new Party([enemy1, enemy2, enemy3, enemy4]);

console.log(
  "LEVEL SUM",
  goodParty.partyLevel() + " vs " + badParty.partyLevel()
);

console.log(goodParty.money + " gold");

// -------------------
// Combat setup
const combat = new Combat(goodParty, badParty);
combat.placeCharacters("game");
// alertBox("Combat Started").then(value => {
//   alertBox("yooooooooooooooo");
// });

// -------------------
// Notification
// confirmSwapItem(warrior1, "weapon", twoHandedSword);
// goodParty.collectMoney(500);
// buyItems(goodParty, [broadSword, paddedRobe]);

// -------------------
// Game loop
setInterval(() => {
  goodParty.update();
  badParty.update();
  combat.update();
}, 100);
