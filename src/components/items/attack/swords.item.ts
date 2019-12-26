import { Weapon } from "../../interfaces/interfaces";

export const shortSword: Weapon = {
  name: "Short Sword",
  damage: 50,
  damageType: "normal"
};

export const broadSword: Weapon = {
  name: "Broad Sword",
  damage: 70,
  damageType: "normal"
};

export const twoHandedSword: Weapon = {
  name: "Two-Handed Sword",
  damage: 120,
  damageType: "normal",
  doubleHanded: true
};
