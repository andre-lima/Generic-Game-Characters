import { Player } from "./classes/Player/Player";
import { Warrior } from "./classes/Warrior/Warrior";
import { Party } from "./classes/Party/Party";
import characterImages from "./images/characters/*.jpg";

const warrior1 = new Warrior(characterImages.warrior1, 'dude awesome', 'warrior', 1000);
const warrior2 = new Warrior(characterImages.warrior2, 'mehdude', 'warrior', 500);
const warrior3 = new Warrior(characterImages.warrior1, 'girl power', 'warrior', 700);
const party = new Party([warrior1, warrior2, warrior3]);

console.log(warrior1.health, warrior2.health);
warrior1.damagePlayer(66);
warrior1.damagePlayer(111);
warrior2.healPlayer(55);
console.log(party.getRandomMember());

party.attackAllMembers(100);
party.attackAllMembers(100);

warrior1.specialAttack();

warrior1.showPlayer('warrior1');
warrior2.showPlayer('warrior2');