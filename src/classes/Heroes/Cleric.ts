import { Player } from "../Player/Player";
import { normalMace } from "../Inventory/items/attack/mace.item";
import { normalArmor } from "../Inventory/items/defense/armor.item";
import { heal } from "../Specials/heal.special";
import clericImage from "../../images/characters/cleric.jpg";

export class Cleric extends Player {
  
  constructor(
    name: string,
    type: string,
    health: number,
    special: number,
    leader: boolean = false
  ) {
    super(clericImage, name, type, health, special, leader);
    this.init();
  }

  protected init() {
    super.init();

    this.inventory.weapon = normalMace;
    this.inventory.armor = normalArmor;

    this.specialPower = heal.bind(this, 40, 50);
  }
}
