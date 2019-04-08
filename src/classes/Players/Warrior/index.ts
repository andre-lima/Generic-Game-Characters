import { Player } from "../Player";
import { Attack } from "../../interfaces/interfaces";
import { normalSword } from "../../Inventory/items/sword.item";
import { normalArmor } from "../../Inventory/items/armor.item";
import { powerAttack } from "../../Specials/powerAttack.special";

export class Warrior extends Player {

  constructor(
    image: string,
    name: string,
    type: string,
    health: number,
    special: number,
    leader: boolean = false
  ) {
    super(image, name, type, health, special, leader);
    this.init();
  }

  protected init() {
    super.init();

    this.inventory.weapon = normalSword;
    this.inventory.armor = normalArmor;

    this.specialPower = powerAttack;
  }

}
