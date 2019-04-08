import { Weapon, Armor } from "../interfaces/interfaces";

export class Inventory {
  private myWeapon: Weapon;
  private myArmor: Armor;
  private defaultWeapon: Weapon = { damage: 1 };
  private defaultArmor: Armor = { defense: 0 };

  constructor() {
    this.armor = this.defaultArmor;
    this.weapon = this.defaultWeapon;
  }

  public get weapon(): Weapon {
    return this.myWeapon;
  }

  public set weapon(newWeapon: Weapon) {
    this.myWeapon = newWeapon;
  }

  public get armor(): Armor {
    return this.myArmor;
  }

  public set armor(newArmor: Armor) {
    this.myArmor = newArmor;
  }
}
