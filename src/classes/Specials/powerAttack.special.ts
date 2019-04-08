import { Player } from "../Player/Player";
import { Weapon, Attack } from "../interfaces/interfaces";

export function powerAttack(user: Player, weapon: Weapon, multiplier: number): Attack {

  const specialAttack: Attack = {
    damage: weapon.damage * multiplier,
    type: weapon.type,
    areaAttack: false,
    usageDepletion: 40
  }

  return specialAttack;
};