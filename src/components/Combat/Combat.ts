import { Party } from "../Party/Party";

export class Combat {
  private heroesParty: Party;
  private enemyParty: Party;
  private battleActive: boolean;

  constructor(yourParty: Party, enemyParty: Party) {
    this.heroesParty = yourParty;
    this.enemyParty = enemyParty;

    this.heroesParty.setEnemyParty(this.enemyParty);
    this.enemyParty.setEnemyParty(this.heroesParty);

    this.battleActive = true;
  }

  public placeCharacters(id: string): void {
    const gameCanvas = document.getElementById(id);
    const enemiesSpot = document.createElement("div");
    const myPartySpot = document.createElement("div");

    gameCanvas.appendChild(enemiesSpot);
    gameCanvas.appendChild(myPartySpot);

    this.enemyParty.placeMembers(enemiesSpot);
    this.heroesParty.placeMembers(myPartySpot);
  }

  private checkEndOfBattle(): void {
    if (this.battleActive) {
      if (this.heroesParty.areAllMembersDead()) {
        console.log("ENEMIES victory");
        this.battleActive = false;
      } else if (this.enemyParty.areAllMembersDead()) {
        console.log("HEROES victory");
        this.battleActive = false;
      }
    } else {
      console.log("END OF BATTLE");
    }
  }

  public update(): void {
    this.checkEndOfBattle();
  }
}
