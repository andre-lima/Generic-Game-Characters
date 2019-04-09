import { Warrior } from "./classes/Heroes/Warrior";
import { Wizard } from "./classes/Heroes/Wizard";
import { Cleric } from "./classes/Heroes/Cleric";
import { Party } from "./classes/Party/Party";
import { Combat } from "./classes/Combat";
import { Orc } from "./classes/Enemies/Orc";
import characterImages from "./images/characters/*.*";

const warrior1 = new Warrior(
  characterImages.warrior1.jpg,
  "dude awesome",
  "warrior",
  100, 
  50,
);
const cleric1 = new Cleric(
  characterImages.cleric.jpg,
  "mehdude",
  "cleric",
  80, 
  80,
);
const wizard1 = new Wizard(
  characterImages.wizard.gif,
  "girl power",
  "cleric",
  60, 
  100,
  true
);

const enemy1 = new Orc(characterImages.orc.jpg, "EVEEELLLL", "warrior", 70, 50);
const enemy2 = new Orc(characterImages.orc.jpg, "BADDDD", "warrior", 70, 50);
const enemy3 = new Orc(characterImages.orc.jpg, "UGLYYYYY", "warrior", 100, 50, true);
const enemy4 = new Orc(characterImages.orc.jpg, "BLERGH", "warrior", 100, 50, true);

const goodParty = new Party([warrior1, cleric1, wizard1]);
const badParty = new Party([enemy1, enemy2, enemy3, enemy4]);

// warrior2.healPlayer(55);
// console.log(party.getRandomMember());

// party.attackAllMembers(100);
// party.attackAllMembers(100);

// warrior1.specialAttack();

// warrior1.showPlayer('warrior1');
// warrior2.showPlayer('warrior2');

// warrior1.attack(enemy2, { damage: 50, type: "normal" });
// warrior2.attack(enemy1, { damage: 50, type: "normal" });
// warrior2.attack(enemy1, { damage: 50, type: "normal" });
// warrior2.attack(enemy1, { damage: 50, type: "normal" });

// warrior2.attack(badParty.members, { damage: 50, type: "normal" });

// enemy1.heal(33);
// enemy2.heal(33);

const combat = new Combat(goodParty, badParty);
combat.placePlayers("game");

setInterval(() => {
  goodParty.update();
  badParty.update();
}, 33);
