import { Attack } from "../interfaces/interfaces";

export function magicArrows(
  usageDepletion: number = 30,
  damage: number = 20
): void {
  if (this.specialCharge < usageDepletion) return;

  const target = this.myParty.getRandomEnemy();

  const specialAttack: Attack = {
    damage: damage,
    damageType: "normal"
  };

  this.specialCharge -= usageDepletion;

  this.attack(target, specialAttack);
}
