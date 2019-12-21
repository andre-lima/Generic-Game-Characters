import { Party } from "../Party/Party";
import { Character } from "../Character/Character";
import { Orc } from "../Classes/Orc";
import { Skeleton } from "../Classes/Skeleton";

export class Encounter {
  private enemies: Character[] = [];
  private supportedTypes = ["orc", "skeleton"];

  constructor() {}

  public generateEnemies(
    isRandom: boolean = true,
    amount: number = 3,
    types: string[] = []
  ) {
    if (isRandom) {
      types = [];

      while (types.length < amount) {
        types.push(
          this.supportedTypes[
            Math.floor(Math.random() * this.supportedTypes.length)
          ]
        );
      }
    }

    types.forEach(type => {
      let e: Character;
      switch (type) {
        case "orc":
          e = new Orc();
          break;
        case "skeleton":
          e = new Skeleton();
          break;

        default:
          break;
      }
      this.enemies.push(e);
    });

    return new Party(this.enemies);
  }
}
