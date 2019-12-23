import { Character } from "../Character/Character";
import { Attack } from "../interfaces/interfaces";
import { normalStaff } from "../Inventory/items/attack/staff.item";
import { normalRobe } from "../Inventory/items/defense/robe.item";
import { fireBall } from "../Specials/fireBall.special";
import wizardImage from "../../images/characters/wizard.gif";

export class Wizard extends Character {
  protected initialHealth = 60;
  private special: Attack;

  constructor(level: number = 1, name: string = "") {
    super(wizardImage, name, "wizard", level);
    this.init();
  }

  protected init() {
    super.init();

    this.inventory.weapon = normalStaff;
    this.inventory.armor = normalRobe;

    this.specialPower = fireBall.bind(this, 70, 30);
  }
}
