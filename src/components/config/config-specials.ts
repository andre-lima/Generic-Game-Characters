// import { heal } from "../Specials/heal.special";
// import { healAll } from "../Specials/healAll.special";
// import { fireBall } from "../Specials/fireBall.special";
// import { magicArrows } from "../Specials/magicArrows.special";
// import { thickSkin } from "../Specials/thickSkin.special";
// import { powerAttack } from "../Specials/powerAttack.special";

export const specialsConfig = {
  heal: {
    availableOnLevel: 1,
    availableFor: ["cleric"]
  },
  healAll: {
    availableOnLevel: 5,
    availableFor: ["cleric"]
  },
  magicArrows: {
    availableOnLevel: 1,
    availableFor: ["wizard"]
  },
  fireBall: {
    availableOnLevel: 3,
    availableFor: ["wizard"]
  },
  thickSkin: {
    availableOnLevel: 5,
    availableFor: ["wizard"]
  },
  powerAttack: {
    availableOnLevel: 3,
    availableFor: ["orc", "warrior"]
  }
};
