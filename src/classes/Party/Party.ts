import { sample } from "lodash"; 

import { Player } from "../Player/Player";
import { Attack } from "../interfaces/interfaces";

export class Party {

  private partyMembers: Player[];

  constructor(members: Player[]) {
    this.partyMembers = members;
  }

  getRandomMember (): Player {
    return sample(this.members);
  }

  public get members() : Player[] {
    return this.partyMembers;
  }
  
}