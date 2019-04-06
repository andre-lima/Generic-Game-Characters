export interface Attack {
  damage: number;
  type: string;
  effect?: string;
}

export interface SpecialAttack {
  damage: number;
  type: string;
  effect: string;
  chargeRequired: number;
}