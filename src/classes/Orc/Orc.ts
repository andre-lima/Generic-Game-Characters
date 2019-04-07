import { Player } from "../Player/Player";
import { Attack } from "../interfaces/interfaces";
import { normalSword } from "../Inventory/items/sword.item";
import { normalArmor } from "../Inventory/items/armor.item";

export class Orc extends Player {
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
  }

  public specialAttack(): void {
    console.log("SPECIAL ATTACKKKKKKK!!!!");
  }
}
