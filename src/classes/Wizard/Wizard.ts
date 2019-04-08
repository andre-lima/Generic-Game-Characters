import { Player } from "../Player/Player";
import { Attack } from "../interfaces/interfaces";
import { normalStaff } from "../Inventory/items/staff.item";
import { normalRobe } from "../Inventory/items/robe.item";
import { fireBall } from "../Specials/fireBall.special";

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

    this.inventory.weapon = normalStaff;
    this.inventory.armor = normalRobe;

    this.special = fireBall();
  }

  public specialAttack(): Attack {
    return this.special;
  }
}
