import { Weapon } from "../../interfaces/interfaces";

export const shortSword: Weapon = {
  name: "Short Sword",
  damage: 50,
  damageType: "normal",
  price: 60
};

export const broadSword: Weapon = {
  name: "Broad Sword",
  damage: 70,
  damageType: "normal",
  price: 120
};

export const twoHandedSword: Weapon = {
  name: "Two-Handed Sword",
  damage: 150,
  damageType: "normal",
  doubleHanded: true,
  price: 200
};
