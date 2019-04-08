export interface Attack {
  damage: number;
  type: string;
  effect?: string;
  areaAttack?: boolean;
  usageDepletion?: number;
}

export interface Weapon {
  damage: number;
  type?: "normal" | "holy" | "fire" | "cold" | "poison" ;
}

export interface Armor {
  defense: number;
  protectionAgainst?: "holy" | "fire" | "cold" | "poison";
}