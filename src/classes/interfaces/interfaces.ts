
interface specialEffects {
  effect?: "attack" | "healing" | "protection";
}

interface damageModifiers {
  modifier?: "none" | "holy" | "fire" | "cold" | "poison" ;
}

export interface Attack extends damageModifiers, specialEffects {
  damage: number;
  areaAttack?: boolean;
  usageDepletion?: number;
}

export interface Special extends damageModifiers, specialEffects {
  areaEffect: false,
  usageDepletion: 40,
  execute(): void;
}

export interface Weapon extends damageModifiers {
  damage: number;
}

export interface Armor {
  defense: number;
}