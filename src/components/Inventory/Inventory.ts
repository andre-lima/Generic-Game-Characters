import { Weapon, Armor } from "../interfaces/interfaces";
import { ConfirmationBox } from "../../services/confirmationBox.service";
import {
  confirmUnnequipShield,
  alertBox
} from "../../services/confirmationActions";

export class Inventory {
  private myWeapon: Weapon;
  private myArmor: Armor;
  private myShield: Armor;
  private noWeapon: Weapon = { name: "Bare Hands", damage: 1 };
  private noArmor: Armor = { name: "Naked", defense: 0 };

  constructor() {
    this.armor = this.noArmor;
    this.weapon = this.noWeapon;
  }

  public get weapon(): Weapon {
    return this.myWeapon;
  }

  public set weapon(newWeapon: Weapon) {
    if (newWeapon.doubleHanded && this.shield) {
      confirmUnnequipShield(this, newWeapon);
    } else {
      this.myWeapon = newWeapon;
    }
  }

  public get armor(): Armor {
    return this.myArmor;
  }

  public set armor(newArmor: Armor) {
    this.myArmor = newArmor;
  }

  public get shield(): Armor {
    return this.myShield;
  }

  public set shield(newShield: Armor) {
    if (this.weapon.doubleHanded && newShield) {
      alertBox(
        "Not possible to equip a shield while wielding a double handed weapon!"
      );
      return;
    }
    this.myShield = newShield;
  }
}
