import { Weapon, Armor } from "../interfaces/interfaces";

export class Inventory {
  private myWeapon: Weapon;
  private myArmor: Armor;
  private myShield: Armor;
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
    if (newWeapon.doubleHanded && this.shield) {
      alert(
        "You unequipped your shield to be able to wield this double handed weapon."
      );
      this.shield = null;
    }

    this.myWeapon = newWeapon;
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
    if (this.weapon.doubleHanded) {
      alert(
        "Not possible to equip a shield while wielding a double handed weapon!"
      );
      return;
    }
    this.myShield = newShield;
  }
}
