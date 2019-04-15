import { Warrior } from "./components/Classes/Warrior";
import { Wizard } from "./components/Classes/Wizard";
import { Cleric } from "./components/Classes/Cleric";
import { Party } from "./components/Party/Party";
import { Combat } from "./components/Combat/Combat";
import { Orc } from "./components/Classes/Orc";
import { Skeleton } from "./components/Classes/Skeleton";
import { DialogBox } from "./services/view/dialogBox.service";

const warrior1 = new Warrior(
  "dude awesome",
  "warrior"
);
const cleric1 = new Cleric(
  "mehdude",
  "cleric"
);
const wizard1 = new Wizard(
  "girl power",
  "wizard",
  true
);

const enemy1 = new Orc("EVEEELLLL", "orc");
const enemy2 = new Orc("BADDDD", "orc");
const enemy3 = new Orc("UGLYYYYY", "orc", true);
const enemy4 = new Skeleton("BONES", "skeleton");

const goodParty = new Party([warrior1, cleric1, wizard1]);
const badParty = new Party([enemy1, enemy2, enemy3, enemy4]);

// warrior2.healCharacter(55);
// console.log(party.getRandomMember());

// party.attackAllMembers(100);
// party.attackAllMembers(100);

// warrior1.specialAttack();

// warrior1.showCharacter('warrior1');
// warrior2.showCharacter('warrior2');

// warrior1.attack(enemy2, { damage: 50, type: "normal" });
// warrior2.attack(enemy1, { damage: 50, type: "normal" });
// warrior2.attack(enemy1, { damage: 50, type: "normal" });
// warrior2.attack(enemy1, { damage: 50, type: "normal" });

// warrior2.attack(badParty.members, { damage: 50, type: "normal" });

// enemy1.heal(33);
// enemy2.heal(33);

const combat = new Combat(goodParty, badParty);
combat.placeCharacters("game");

const success_cb = (p) => {
  console.log('success', p)
}

const cancel_cb = () => {
  console.log('cancel')
}

const stuff_cb = () => {
  console.log('stuff')
}

const dialogBox = new DialogBox();
const dialogActions = [
  { text: 'Confirm', callback: success_cb.bind(this, wizard1), closeModal: true },
  { text: 'Cancel', callback: cancel_cb, closeModal: true },
  { text: 'Stuff', callback: stuff_cb, closeModal: false },
];
// dialogBox.showDialogBox('New item', 'Check this new item out!', dialogActions);

setInterval(() => {
  goodParty.update();
  badParty.update();
  combat.update();
}, 100);
