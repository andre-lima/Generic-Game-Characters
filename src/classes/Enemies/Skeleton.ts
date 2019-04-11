import { Player } from "../Player/Player";
import { ClassWeakness } from "../interfaces/interfaces";
import { normalClub } from "../Inventory/items/attack/club.item";
import { bones } from "../Inventory/items/defense/bones.item";
import skeletonImage from "../../images/characters/skeleton.jpg";

export class Skeleton extends Player {
  
  public classWeakness: ClassWeakness = {
    damageType: "holy",
    damageIncrease: 0.8
  };

  constructor(
    name: string,
    type: string,
    health: number,
    special: number,
    leader: boolean = false
  ) {
    super(skeletonImage, name, type, health, special, leader);

    this.init();
  }

  protected init() {
    super.init();

    this.inventory.weapon = normalClub;
    this.inventory.armor = bones;
  }
}
