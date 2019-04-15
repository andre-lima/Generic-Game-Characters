import { Character } from "../Character/Character";
import { Attack } from "../interfaces/interfaces";
import { normalSword } from "../Inventory/items/attack/sword.item";
import { normalArmor } from "../Inventory/items/defense/armor.item";
import { powerAttack } from "../Specials/powerAttack.special";
import warriorImage from "../../images/characters/warrior.jpg";

export class Warrior extends Character {

  constructor(
    name: string,
    type: string,
    leader: boolean = false
  ) {
    super(warriorImage, name, type, leader);
    this.init();
  }

  protected init() {
    super.init();

    this.inventory.weapon = normalSword;
    this.inventory.armor = normalArmor;

    this.specialPower = powerAttack.bind(this, 50, 2);
  }

}