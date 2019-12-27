import { sample, remove, filter } from "lodash";
import { Character } from "../Character/Character";
import { Weapon, Armor } from "../interfaces/interfaces";

export class Party {
  public partyMembers: Character[];
  public alivePartyMembers: Character[];
  private wallet: number;
  private walletMaxAllowed: number;
  private partyVault: any[] = [];

  private enemyParty: Party;
  // public enemyMembers: Character[];
  // public aliveEnemyMembers: Character[];

  constructor(members: Character[]) {
    this.partyMembers = [...members];
    this.alivePartyMembers = [...members];

    this.partyMembers.forEach(member => {
      member.party = this;
    });

    this.walletMaxAllowed = 1000;
    this.money = 0;
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

  public get money(): number {
    return this.wallet;
  }

  public set money(amount: number) {
    this.wallet = Math.min(amount, this.walletMaxAllowed);
  }

  public collectMoney(amount: number): number {
    this.money += amount;

    console.log(this.wallet);
    return this.wallet;
  }

  public spendMoney(amount: number): number {
    if (this.money >= amount) {
      this.money -= amount;
    }
    console.log(this.wallet);
    return this.wallet;
  }

  public hasEnoughMoney(amount: number): boolean {
    return this.wallet >= amount;
  }

  public get vault() {
    return this.partyVault;
  }

  public addToVault(item) {
    this.vault.push(item);
    console.table(this.vault);
  }

  public removeFromVault(itemToRemove) {
    this.partyVault = this.vault.filter(item => item !== itemToRemove);
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
