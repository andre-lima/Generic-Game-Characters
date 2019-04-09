import { Player } from "../Player/Player";
import { Attack, ClassWeakness } from "../interfaces/interfaces";
import { normalSword } from "../Inventory/items/sword.item";
import { normalArmor } from "../Inventory/items/armor.item";
import { powerAttack } from "../Specials/powerAttack.special";

export class Orc extends Player {
  
  public classWeakness: ClassWeakness = {
    damageType: "holy",
    damageIncrease: 0.3
  };

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

    this.specialPower = powerAttack.bind(this, 50, 1.5);
  }
}
