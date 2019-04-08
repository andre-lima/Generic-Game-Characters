import { Weapon, Attack } from "../interfaces/interfaces";

export function powerAttack(weapon: Weapon, multiplier: number): Attack {

  const specialAttack: Attack = {
    damage: weapon.damage * multiplier,
    type: weapon.type,
    areaAttack: false,
    usageDepletion: 40
  }

  return specialAttack;
};