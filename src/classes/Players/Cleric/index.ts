import { Player } from "../Player";
import { Attack } from "../../interfaces/interfaces";
import { normalMace } from "../../Inventory/items/mace.item";
import { normalArmor } from "../../Inventory/items/armor.item";
import { heal } from "../../Specials/heal.special";

export class Wizard extends Player {

  private special: Attack;

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

    this.special = heal();
  }

  public specialAttack(): Attack {
    return this.special;
  }
}
