import { Player } from "../Player/Player";

export class Orc extends Player {
  constructor(
    image: string,
    name: string,
    type: string,
    health: number,
    leader: boolean = false
  ) {
    super(image, name, type, health, leader);
  }

  public specialAttack(): void {
    console.log("SPECIAL ATTACKKKKKKK!!!!");
  }
}
