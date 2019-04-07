import { Player } from "../Player/Player";
import { Attack } from "../interfaces/interfaces";
import { Inventory } from "../Inventory/Inventory";
import { normalSword } from "../Inventory/items/sword.item";
import { normalArmor } from "../Inventory/items/armor.item";
import { powerAttack } from "../Specials/powerAttack.special";

export class Warrior extends Player {

  private powerAttack: Attack;

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

    this.powerAttack = powerAttack(this, this.inventory.weapon, 3);
  }

  public specialAttack(): Attack {
    console.log("Power Attack!", this.powerAttack);
    return this.powerAttack;
  }
}
