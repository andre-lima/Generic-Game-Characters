import { Character } from "../Character/Character";
import { heal } from "../Specials/heal.special";
import clericImage from "../../images/characters/cleric.jpg";

export class Cleric extends Character {
  protected initialHealth = 80;

  constructor(level: number = 1, name: string = "") {
    super(clericImage, name, "cleric", level);
    this.init();
  }

  protected init() {
    super.init();

    this.specialPower = heal.bind(this, 40, 50);
  }
}
