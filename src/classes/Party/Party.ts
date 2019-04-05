import { Player } from "../Player/Player";
import { sample } from "lodash"; 

export class Party {

  private members: Player[];

  constructor(members: Player[]) {
    this.members = members;
  }

  getRandomMember (): Player {
    return sample(this.members);
  }

  attackAllMembers (damage: number): void {
    this.members.forEach((member: Player) => {
      member.damagePlayer(damage);
    } )
  }
}