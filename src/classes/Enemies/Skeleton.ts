import { Player } from "../Player/Player";
import { ClassWeakness } from "../interfaces/interfaces";
import { normalClub } from "../Inventory/items/club.item";

export class Skeleton extends Player {
  
  public classWeakness: ClassWeakness = {
    damageType: "holy",
    damageIncrease: 0.8
  };

  constructor(
    image: string,
    name: string,
    type: string,
    health: number,
    special: number,
    leader: boolean = false
  ) {
    super(image, name, type, health, special, leader);

    this.init();
  }

  protected init() {
    super.init();

    this.inventory.weapon = normalClub;
  }
}
