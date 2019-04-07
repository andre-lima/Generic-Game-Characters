export class Inventory {
  private myWeapon: any;
  private myArmor: any;
  private defaultWeapon: any = { damage: 1 };
  private defaultArmor: any = { defense: 0 };

  constructor() {
    this.armor = this.defaultArmor;
    this.weapon = this.defaultWeapon;
  }

  public get weapon(): any {
    return this.myWeapon;
  }

  public set weapon(newWeapon: any) {
    this.myWeapon = newWeapon;
  }

  public get armor(): any {
    return this.myArmor;
  }

  public set armor(newArmor: any) {
    this.myArmor = newArmor;
  }
}
