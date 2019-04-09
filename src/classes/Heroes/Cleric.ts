import { Player } from "../Player/Player";
import { normalMace } from "../Inventory/items/mace.item";
import { normalArmor } from "../Inventory/items/armor.item";
import { heal } from "../Specials/heal.special";

export class Cleric extends Player {
  
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

    this.inventory.weapon = normalMace;
    this.inventory.armor = normalArmor;

    this.specialPower = heal.bind(this, 40, 50);
  }
}
