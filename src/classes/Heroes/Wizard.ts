import { Character } from "../Character/Character";
import { Attack } from "../interfaces/interfaces";
import { normalStaff } from "../Inventory/items/attack/staff.item";
import { normalRobe } from "../Inventory/items/defense/robe.item";
import { fireBall } from "../Specials/fireBall.special";
import wizardImage from "../../images/characters/wizard.gif";

export class Wizard extends Character {

  private special: Attack;

  constructor(
    name: string,
    type: string,
    health: number,
    special: number,
    leader: boolean = false
  ) {
    super(wizardImage, name, type, health, special, leader);
    this.init();
  }

  protected init() {
    super.init();

    this.inventory.weapon = normalStaff;
    this.inventory.armor = normalRobe;

    this.specialPower = fireBall.bind(this, 70, 30);
  }

}
