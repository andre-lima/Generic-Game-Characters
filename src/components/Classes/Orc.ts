import { Character } from "../Character/Character";
import { ClassWeakness } from "../interfaces/interfaces";
import { powerAttack } from "../Specials/powerAttack.special";
import orcImage from "../../images/characters/orc.jpg";

export class Orc extends Character {
  public classWeakness: ClassWeakness = {
    damageType: "holy",
    damageIncrease: 0.3
  };

  constructor(level: number = 1, name: string = "") {
    super(orcImage, name, "orc", level);

    this.init();
  }

  protected init() {
    super.init();

    this.specialPower = powerAttack.bind(this, 50, 1.5);
  }
}
