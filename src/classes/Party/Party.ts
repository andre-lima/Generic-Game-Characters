import { sample, remove, filter } from "lodash";
import { Character } from "../Character/Character";

export class Party {
  public partyMembers: Character[];
  public alivePartyMembers: Character[];

  public enemyMembers: Character[];
  public aliveEnemyMembers: Character[];

  constructor(members: Character[]) {
    this.partyMembers = [...members];
    this.alivePartyMembers = [...members];

    this.partyMembers.forEach(member => {
      member.party = this;
    });
  }

  public setEnemyMembers(members: Character[]) {
    this.enemyMembers = members;
  }

  public getRandomMember(): Character {
    return sample(this.members);
  }

  public getRandomEnemy(): Character {
    return sample(filter(this.enemyMembers, member => !member.isDead));
  }

  public get members(): Character[] {
    return this.partyMembers;
  }

  public get enemies(): Character[] {
    return this.enemyMembers;
  }

  public removeDeadMember(member: Character): void {
    this.alivePartyMembers = this.alivePartyMembers.filter((member) => {
      return !member.isDead;
    })
  }

  public areAllMembersDead(): boolean {
    return !this.alivePartyMembers.length;
  }

  public placeMembers(element: Element) {
    // Putting leaders on the middle of the party
    const leaders = remove(this.members, member => member.isLeader);
    this.members.splice(Math.floor(this.members.length / 2), 0, ...leaders);

    this.members.forEach(member => {
      member.render(element);
    });
  }

  public update() {
    this.members.forEach(member => {
      member.update();
    });
  }
}
