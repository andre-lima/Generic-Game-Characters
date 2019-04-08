import { Weapon, Special } from "../interfaces/interfaces";

export function powerAttack(weapon: Weapon, multiplier: number): Special {

  const specialAttack: Special = {
    effect: "attack",
    modifier: weapon.modifier,
    areaEffect: false,
    usageDepletion: 40,
    execute: () => {
      console.log('executing')
    }
    // damage: weapon.damage * multiplier,

  }

  return specialAttack;
};