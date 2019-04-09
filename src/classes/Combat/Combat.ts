import { Party } from "../Party/Party";

export class Combat {

  private heroesParty: Party;
  private enemyParty: Party;
  private battleActive: boolean;

  constructor(yourParty: Party, enemyParty: Party) {
    this.heroesParty = yourParty;
    this.enemyParty = enemyParty;

    this.heroesParty.setEnemyMembers(this.enemyParty.members);
    this.enemyParty.setEnemyMembers(this.heroesParty.members);

    this.battleActive = true;
  }

  public placePlayers(id: string) {
    const gameCanvas = document.getElementById(id);
    const enemiesSpot = document.createElement('div');
    const myPartySpot = document.createElement('div');

    gameCanvas.appendChild(enemiesSpot);
    gameCanvas.appendChild(myPartySpot);

    this.enemyParty.placeMembers(enemiesSpot);
    this.heroesParty.placeMembers(myPartySpot);
  }

  private checkEndOfBattle() {
console.log(this.battleActive)
    if (this.battleActive) {
      if (this.heroesParty.areAllMembersDead()) {
        console.log('ENEMIES victory');
        this.battleActive = false;
      } else if (this.enemyParty.areAllMembersDead()) {
        console.log('HEROES victory');
        this.battleActive = false;
      }
    } else {
      console.log('END OF BATTLE');
    }
  }

  public update() {
    this.checkEndOfBattle();
  }

}