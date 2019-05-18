import { Warrior } from "./components/Classes/Warrior";
import { Wizard } from "./components/Classes/Wizard";
import { Cleric } from "./components/Classes/Cleric";
import { Party } from "./components/Party/Party";
import { Combat } from "./components/Combat/Combat";
import { Orc } from "./components/Classes/Orc";
import { Skeleton } from "./components/Classes/Skeleton";
import { DialogBox } from "./services/view/dialogBox.service";

// -------------------
// Characters setup
const warrior1 = new Warrior(
  "dude awesome",
  "warrior"
);
const cleric1 = new Cleric(
  "holy girl",
  "cleric"
);
const wizard1 = new Wizard(
  "artritis",
  "wizard",
  true
);

const enemy1 = new Orc("EVEEELLLL", "orc");
const enemy2 = new Orc("BADDDD", "orc");
const enemy3 = new Orc("UGLYYYYY", "orc", true);
const enemy4 = new Skeleton("BONES", "skeleton");

// -------------------
// Party setup
const goodParty = new Party([warrior1, cleric1, wizard1]);
const badParty = new Party([enemy1, enemy2, enemy3, enemy4]);

// -------------------
// Combat setup
const combat = new Combat(goodParty, badParty);
combat.placeCharacters("game");

// -------------------
// Notification

// Notification button callbacks
const success_cb = (p) => {
  console.log('success', p)
}
const cancel_cb = () => {
  console.log('cancel')
}
const stuff_cb = () => {
  console.log('stuff')
}

// Notification setup
const dialogBox = new DialogBox();
const dialogActions = [
  { text: 'Confirm', callback: success_cb.bind(this, wizard1), closeModal: true },
  { text: 'Cancel', callback: cancel_cb, closeModal: true },
  { text: 'Stuff', callback: stuff_cb, closeModal: false },
];

// dialogBox.showDialogBox('New item', 'Check this new item out!', dialogActions);

// -------------------
// Game loop
setInterval(() => {
  goodParty.update();
  badParty.update();
  combat.update();
}, 100);
