export interface Attack {
  damage: number;
  type: string;
  effect?: string;
  areaAttack?: boolean;
  usageDepletion?: number;
}

export interface Weapon {
  damage: number;
  type?: "normal";
}

export interface Armor {
  defense: number;
  type?: "normal";
}