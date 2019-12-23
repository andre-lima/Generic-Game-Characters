import { Character } from "../Character/Character";
import { Attack } from "../interfaces/interfaces";
import { powerAttack } from "../Specials/powerAttack.special";
import warriorImage from "../../images/characters/warrior.jpg";

export class Warrior extends Character {
  protected initialHealth = 100;

  constructor(level: number = 1, name: string = "") {
    super(warriorImage, name, "warrior", level);
    this.init();
  }

  protected init() {
    super.init();

    this.specialPower = powerAttack.bind(this, 50, 2);
  }
}
