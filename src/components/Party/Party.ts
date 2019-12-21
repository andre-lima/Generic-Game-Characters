import { sample, remove, filter } from "lodash";
import { Character } from "../Character/Character";

export class Party {
  public partyMembers: Character[];
  public alivePartyMembers: Character[];

  private enemyParty: Party;
  // public enemyMembers: Character[];
  // public aliveEnemyMembers: Character[];

  constructor(members: Character[]) {
    this.partyMembers = [...members];
    this.alivePartyMembers = [...members];

    this.partyMembers.forEach(member => {
      member.party = this;
    });
  }

  public setEnemyParty(enemyParty: Party) {
    this.enemyParty = enemyParty;
  }

  public getRandomMember(): Character {
    return sample(this.members);
  }

  public getRandomEnemy(): Character {
    return sample(filter(this.enemyParty.members, member => !member.isDead));
  }

  public get members(): Character[] {
    return this.partyMembers;
  }

  public get enemies(): Character[] {
    return this.enemyParty.members;
  }

  public removeDeadMember(member: Character): void {
    this.alivePartyMembers = this.alivePartyMembers.filter(member => {
      return !member.isDead;
    });
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

  public partyLevel() {
    const levelSum = this.members.reduce(
      (sum: number, m: Character) => m.level + sum,
      0
    );
    return levelSum;
  }

  public update() {
    this.members.forEach(member => {
      member.update();
    });
  }
}
