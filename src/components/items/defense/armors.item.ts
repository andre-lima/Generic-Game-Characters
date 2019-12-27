import { Armor } from "../../interfaces/interfaces";

export const leatherArmor: Armor = {
  name: "Leather Armor",
  defense: 20,
  damageType: "normal",
  damageReduction: 0,
  price: 30
};

export const bones: Armor = {
  name: "Bones",
  defense: 2,
  damageType: "normal",
  damageReduction: 0,
  price: 0
};

export const bearFur: Armor = {
  name: "Bear Fur",
  defense: 30,
  damageType: "cold",
  damageReduction: 0.5,
  price: 40
};

export const dragonScale: Armor = {
  name: "Dragon Scale",
  defense: 100,
  damageType: "fire",
  damageReduction: 0.9,
  price: 300
};

export const normalRobe: Armor = {
  name: "Robe",
  defense: 2,
  price: 10
};

export const paddedRobe: Armor = {
  name: "Padded",
  defense: 10,
  price: 50
};
