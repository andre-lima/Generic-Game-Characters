
interface DamageModifiers {
  damageType?: "none" | "holy" | "fire" | "cold" | "poison" | "stun";
}

export interface ProtectionAgainst extends DamageModifiers {
  damageReduction?: number ; // Between 0 and 1
}

export interface ClassWeakness extends DamageModifiers {
  damageIncrease?: number; // Between 0 and 1
}

export interface Attack extends DamageModifiers {
  damage: number;
}


export interface Weapon extends DamageModifiers {
  damage: number;
}

export interface Armor extends ProtectionAgainst {
  defense: number;
}