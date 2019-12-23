// Images
import orcImage from "../../images/characters/orc.jpg";
import wizardImage from "../../images/characters/wizard.gif";
import skeletonImage from "../../images/characters/skeleton.jpg";
import warriorImage from "../../images/characters/warrior.jpg";
import clericImage from "../../images/characters/cleric.jpg";

// Weapons
import { normalSword } from "../items/attack/sword.item";
import { normalStaff } from "../items/attack/staff.item";
import { normalMace } from "../items/attack/mace.item";
import { normalClub } from "../items/attack/club.item";

// Armors
import { normalArmor } from "../items/defense/armor.item";
import { bones } from "../items/defense/bones.item";
import { normalRobe } from "../items/defense/robe.item";

export const charactersConfig = {
  warrior: {
    initialHealth: 100,
    healthExponent: 2,
    healthMultiplier: 5,
    maxSpecial: 50,
    imageSource: "",
    initialWeapon: normalSword,
    initialArmor: normalArmor,
    levelExponent: 2,
    levelMultiplier: 8,
    weakness: {}
  },
  wizard: {
    initialHealth: 60,
    healthExponent: 2,
    healthMultiplier: 5,
    maxSpecial: 100,
    imageSource: "",
    initialWeapon: normalStaff,
    initialArmor: normalRobe,
    levelExponent: 2,
    levelMultiplier: 8
  },
  cleric: {
    initialHealth: 80,
    healthExponent: 2,
    healthMultiplier: 5,
    maxSpecial: 80,
    imageSource: "",
    initialWeapon: normalMace,
    initialArmor: normalArmor,
    levelExponent: 2,
    levelMultiplier: 8
  },
  orc: {
    imageSrc: orcImage,
    initialHealth: 120,
    healthExponent: 2,
    healthMultiplier: 5,
    maxSpecial: 40,
    imageSource: "",
    initialWeapon: normalSword,
    initialArmor: normalArmor,
    levelExponent: 2,
    levelMultiplier: 8,
    weakness: {
      damageType: "fire",
      damageIncrease: 0.3
    }
  },
  skeleton: {
    initialHealth: 40,
    healthExponent: 2,
    healthMultiplier: 5,
    maxSpecial: 0,
    imageSource: "",
    initialWeapon: normalClub,
    initialArmor: bones,
    levelExponent: 2,
    levelMultiplier: 8,
    weakness: {
      damageType: "holy",
      damageIncrease: 0.3
    }
  },
  zombie: {},
  dragon: {}
};
