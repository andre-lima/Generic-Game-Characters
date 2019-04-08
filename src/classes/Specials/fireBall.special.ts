import { Attack } from "../interfaces/interfaces";

export function fireBall(): Attack {

  const specialAttack: Attack = {
    damage: 50,
    type: 'fire',
    areaAttack: true,
    usageDepletion: 50
  }

  return specialAttack;
};