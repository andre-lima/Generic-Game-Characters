import { Character } from "../Character/Character";
import { ClassWeakness } from "../interfaces/interfaces";
import { normalClub } from "../Inventory/items/attack/club.item";
import { bones } from "../Inventory/items/defense/bones.item";
import skeletonImage from "../../images/characters/skeleton.jpg";

export class Skeleton extends Character {
  public classWeakness: ClassWeakness = {
    damageType: "holy",
    damageIncrease: 0.8
  };

  constructor(leader: boolean = false, level: number = 1, name: string = "") {
    super(skeletonImage, name, "skeleton", level, leader);

    this.init();
  }

  protected init() {
    super.init();

    this.inventory.weapon = normalClub;
    this.inventory.armor = bones;
  }
}
