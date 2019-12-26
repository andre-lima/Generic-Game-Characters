import { Party } from "./components/Party/Party";
import { Combat } from "./components/Combat/Combat";
import { DialogBox } from "./services/view/dialogBox.service";
import { Encounter } from "./components/Combat/Encounter";
import { Character } from "./components/Character/Character";
import { twoHandedSword } from "./components/items/attack/swords.item";
import { woodenShield } from "./components/items/defense/shields.item";

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

// -------------------
// Combat setup
const combat = new Combat(goodParty, badParty);
combat.placeCharacters("game");

setTimeout(() => {
  // warrior1.inventory.weapon = twoHandedSword;
}, 2000);

setTimeout(() => {
  // warrior1.inventory.shield = woodenShield;
  cleric1.inventory.shield = woodenShield;
}, 7000);

// -------------------
// Notification

// Notification button callbacks
const success_cb = p => {
  console.log("success", p);
};
const cancel_cb = () => {
  console.log("cancel");
};
const stuff_cb = () => {
  console.log("stuff");
};

// Notification setup
const dialogBox = new DialogBox();
const dialogActions = [
  {
    text: "Confirm",
    callback: success_cb.bind(this, wizard1),
    closeModal: true
  },
  { text: "Cancel", callback: cancel_cb, closeModal: true },
  { text: "Stuff", callback: stuff_cb, closeModal: false }
];

// dialogBox.showDialogBox("New item", "Check this new item out!", dialogActions);

// -------------------
// Game loop
setInterval(() => {
  goodParty.update();
  badParty.update();
  combat.update();
}, 100);
