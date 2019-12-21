import { Warrior } from "./components/Classes/Warrior";
import { Wizard } from "./components/Classes/Wizard";
import { Cleric } from "./components/Classes/Cleric";
import { Party } from "./components/Party/Party";
import { Combat } from "./components/Combat/Combat";
import { Orc } from "./components/Classes/Orc";
import { Skeleton } from "./components/Classes/Skeleton";
import { DialogBox } from "./services/view/dialogBox.service";
import { Encounter } from "./components/Combat/Encounter";

// -------------------
// Characters setup
const warrior1 = new Warrior(false, 2, "dude awesome");
const cleric1 = new Cleric(false, 2, "holy girl");
const wizard1 = new Wizard(true, 3, "artritis");

const enemy1 = new Orc(false, 1, "EVEEELLLL");
const enemy2 = new Orc(false, 2, "BADDDD");
const enemy3 = new Orc(true, 3, "UGLYYYYY");
const enemy4 = new Skeleton(false, 4, "BONES");

// -------------------
// Party setup
const goodParty = new Party([warrior1, cleric1, wizard1]);
const badParty = new Encounter().generateEnemies(true, 4); //new Party([enemy1, enemy2, enemy3, enemy4]);
console.log(
  "AVG LEVEL",
  goodParty.partyLevel() + " vs " + badParty.partyLevel()
);

// -------------------
// Combat setup
const combat = new Combat(goodParty, badParty);
combat.placeCharacters("game");

// -------------------
// Random encounter
const encounter = new Encounter();

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

dialogBox.showDialogBox("New item", "Check this new item out!", dialogActions);

// -------------------
// Game loop
setInterval(() => {
  goodParty.update();
  badParty.update();
  combat.update();
}, 100);
