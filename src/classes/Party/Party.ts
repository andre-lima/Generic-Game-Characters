import { sample, remove } from "lodash"; 
import { Player } from "../Player/Player";

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

  public placeMembers(element: Element) {

    // Putting leaders on the middle of the party
    const leaders = remove(this.members, (member) => member.isLeader);
    this.members.splice(Math.floor(this.members.length / 2), 0, ...leaders);

    this.members.forEach((member) => {
      member.renderPlayer(element);
    });
  }
  
}