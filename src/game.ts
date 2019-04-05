import { Player } from "./classes/Player/Player";
import { Warrior } from "./classes/Warrior/Warrior";
import { Party } from "./classes/Party/Party";
import characterImages from "./images/characters/*.jpg";
import { Combat } from "./classes/Combat/Combat";

const warrior1 = new Warrior(characterImages.warrior1, 'dude awesome', 'warrior', 1000);
const warrior2 = new Warrior(characterImages.warrior2, 'mehdude', 'warrior', 500);
const warrior3 = new Warrior(characterImages.warrior1, 'girl power', 'warrior', 700);
const party = new Party([warrior1, warrior2, warrior3]);

// warrior1.sufferAttack({damage: 66, type: 'normal'});
// warrior1.sufferAttack({damage: 111, type: 'normal'});
// warrior2.healPlayer(55);
// console.log(party.getRandomMember());

// party.attackAllMembers(100);
// party.attackAllMembers(100);

// warrior1.specialAttack();

// warrior1.showPlayer('warrior1');
// warrior2.showPlayer('warrior2');

const combat = new Combat();

warrior1.attack(combat, warrior2, {damage: 50, type: 'normal'})
let atkDmg = warrior2.attack(combat, warrior1, {damage: 50, type: 'normal'})
console.log(atkDmg);

let totalDmg = warrior1.attackMultiplePlayers(combat, party.members, {damage: 50, type: 'normal'});
console.log(totalDmg);