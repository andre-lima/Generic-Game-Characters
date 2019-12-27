// Images
import orcImage from "../../images/characters/orc.jpg";
import wizardImage from "../../images/characters/wizard.gif";
import skeletonImage from "../../images/characters/skeleton.jpg";
import warriorImage from "../../images/characters/warrior.jpg";
import clericImage from "../../images/characters/cleric.jpg";

// Weapons
import {
  shortSword,
  broadSword,
  twoHandedSword
} from "../items/attack/swords.item";
import {
  shortDagger,
  longDagger,
  serratedBlade
} from "../items/attack/daggers.item";
import { shortBow } from "../items/attack/bows.item";
import { normalStaff } from "../items/attack/staves.item";
import { normalMace } from "../items/attack/maces.item";
import { normalClub } from "../items/attack/clubs.item";

// Armors
import {
  bones,
  normalRobe,
  leatherArmor,
  bearFur,
  dragonScale
} from "../items/defense/armors.item";
import {
  woodenShield,
  ironShield,
  towerShield
} from "../items/defense/shields.item";

// Specials
import { heal } from "../Specials/heal.special";
import { powerAttack } from "../Specials/powerAttack.special";
import { fireBall } from "../Specials/fireBall.special";

export const charactersConfig = {
  warrior: {
    initialHealth: 100,
    healthMultiplier: 5,
    healthExponent: 2,
    levelMultiplier: 8,
    levelExponent: 2,
    initialMaxSpecial: 50,
    specialMultiplier: 10,
    specialExponent: 1.1,
    imageSource: "",
    initialWeapon: shortSword,
    initialArmor: leatherArmor,
    initialShield: woodenShield,
    special: powerAttack,
    weakness: {}
  },
  wizard: {
    initialHealth: 60,
    healthMultiplier: 5,
    healthExponent: 2,
    levelMultiplier: 8,
    levelExponent: 2,
    initialMaxSpecial: 100,
    specialMultiplier: 10,
    specialExponent: 2.1,
    imageSource: "",
    initialWeapon: normalStaff,
    initialArmor: normalRobe,
    special: fireBall
  },
  cleric: {
    initialHealth: 80,
    healthMultiplier: 5,
    healthExponent: 2,
    levelMultiplier: 8,
    levelExponent: 2,
    initialMaxSpecial: 80,
    specialMultiplier: 5,
    specialExponent: 2,
    imageSource: "",
    initialWeapon: normalMace,
    initialArmor: leatherArmor,
    special: heal
  },
  orc: {
    initialHealth: 120,
    healthMultiplier: 5,
    healthExponent: 2,
    levelMultiplier: 8,
    levelExponent: 2,
    initialMaxSpecial: 40,
    specialMultiplier: 8,
    specialExponent: 1,
    imageSource: "",
    initialWeapon: shortSword,
    initialArmor: leatherArmor,
    special: powerAttack,
    weakness: {
      damageType: "fire",
      damageIncrease: 0.3
    }
  },
  skeleton: {
    initialHealth: 40,
    healthMultiplier: 5,
    healthExponent: 2,
    levelMultiplier: 8,
    levelExponent: 2,
    initialMaxSpecial: 0,
    specialMultiplier: 0,
    specialExponent: 0,
    imageSource: "",
    initialWeapon: normalClub,
    initialArmor: bones,
    special: null,
    weakness: {
      damageType: "holy",
      damageIncrease: 0.3
    }
  },
  zombie: {},
  dragon: {}
};
