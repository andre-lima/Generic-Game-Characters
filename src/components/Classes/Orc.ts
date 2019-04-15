import { Character } from "../Character/Character";
import { ClassWeakness } from "../interfaces/interfaces";
import { normalSword } from "../Inventory/items/attack/sword.item";
import { normalArmor } from "../Inventory/items/defense/armor.item";
import { powerAttack } from "../Specials/powerAttack.special";
import orcImage from "../../images/characters/orc.jpg";

export class Orc extends Character {
  
  public classWeakness: ClassWeakness = {
    damageType: "holy",
    damageIncrease: 0.3
  };

  constructor(
    name: string,
    type: string,
    leader: boolean = false
  ) {
    super(orcImage, name, type, leader);

    this.init();
  }

  protected init() {
    super.init();

    this.inventory.weapon = normalSword;

    this.specialPower = powerAttack.bind(this, 50, 1.5);
  }
}
