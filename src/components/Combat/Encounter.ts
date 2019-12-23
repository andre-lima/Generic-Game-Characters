import { Party } from "../Party/Party";
import { Character } from "../Character/Character";
import { Orc } from "../Classes/Orc";
import { Skeleton } from "../Classes/Skeleton";

export class Encounter {
  private enemies: Character[] = [];
  private supportedTypes = ["orc", "skeleton"];

  constructor() {}

  public generateRandomEnemies(
    amount: number = 3,
    level: number = 1,
    levelVariation: number = 0,
    allowedTypes: string[] = []
  ) {
    const types = [];
    const onlyUseTypes = allowedTypes.length
      ? this.supportedTypes.filter(type => allowedTypes.includes(type))
      : [...this.supportedTypes];

    if (onlyUseTypes.length === 0) {
      console.error(
        "Your desired types are not supported.",
        this.supportedTypes,
        allowedTypes
      );
    }

    while (types.length < amount) {
      types.push(onlyUseTypes[Math.floor(Math.random() * onlyUseTypes.length)]);
    }

    types.forEach(type => {
      const useLevel = Math.round(
        level + (Math.random() - 0.5) * 2 * levelVariation
      );

      let e: Character;
      switch (type) {
        case "orc":
          e = new Orc(useLevel);
          break;
        case "skeleton":
          e = new Skeleton(useLevel);
          break;

        default:
          break;
      }
      this.enemies.push(e);
    });

    return new Party(this.enemies);
  }
}
