import { Character } from "../Character/Character";
import { ClassWeakness } from "../interfaces/interfaces";
import skeletonImage from "../../images/characters/skeleton.jpg";

export class Skeleton extends Character {
  constructor(level: number = 1, name: string = "") {
    super(skeletonImage, name, "skeleton", level);

    this.init();
  }

  protected init() {
    super.init();

  }
}
