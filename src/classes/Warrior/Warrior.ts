import { Player } from "../Player/Player";

export class Warrior extends Player {

  constructor(image: string, name: string, type: string, health: number) {
    super(image, name, type, health);
  }

  public specialAttack (): void {
    console.log('SPECIAL ATTACKKKKKKK!!!!');
  }
}