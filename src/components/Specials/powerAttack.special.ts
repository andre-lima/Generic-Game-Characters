import { Attack } from "../interfaces/interfaces";

export function powerAttack(usageDepletion: number = 50, multiplier: number = 2): void {

  if (this.specialCharge < usageDepletion)
    return;

  const damageMultiplier = multiplier;
  const target = this.myParty.getRandomEnemy();

  const specialAttack: Attack = {
    damage: this.inventory.weapon.damage * damageMultiplier,
    damageType: this.inventory.weapon.damageType
  }

  this.specialCharge -= usageDepletion;

  this.attack(target, specialAttack);
};