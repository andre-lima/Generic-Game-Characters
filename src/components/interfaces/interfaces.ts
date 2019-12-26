interface DamageModifiers {
  damageType?: "normal" | "holy" | "fire" | "cold" | "poison" | "stun";
}

export interface ProtectionAgainst extends DamageModifiers {
  damageReduction?: number; // Between 0 and 1
}

export interface ClassWeakness extends DamageModifiers {
  damageIncrease?: number; // Between 0 and 1
}

export interface Attack extends DamageModifiers {
  damage: number;
}

export interface Weapon extends DamageModifiers {
  name: string;
  damage: number;
  doubleHanded?: boolean;
}

export interface Armor extends ProtectionAgainst {
  name: string;
  defense: number;
}
