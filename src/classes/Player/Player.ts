import { Attack } from "../interfaces/interfaces";
import { Combat } from "../Combat/Combat";

export abstract class Player {

  // Character properties
  private characterImage: string;

  // Game properties
  private playerName: string;
  private playerType: string;
  private playerHealth: number;
  private playerDefense: number;
  private playerSpecial: number;
  private playerExperience: number;
  private playerLevel: number;

  constructor(imageSource: string, 
              name: string, 
              type: string, 
              health: number) {
    this.characterImage = imageSource;
    this.playerName = name;
    this.playerType = type;
    this.playerHealth = health;
  }

  abstract specialAttack(): void;

  public get health(): number {
    return this.playerHealth;
  }

  public set health(newHealth: number) {
    this.playerHealth = newHealth;
  }

  public sufferAttack(attack: Attack): number {
    this.health = this.health - attack.damage;
    console.log(this.playerName, 'ouch', this.health);
    return attack.damage; // Update with value after reducers from armor, etc...
  }

  public attack(combatSession: Combat, target: Player, attack: Attack): number {
    return combatSession.attackPlayer(this, target, attack);
  }

  public attackMultiplePlayers(combatSession: Combat, targets: Player[], attack: Attack): number {
    return combatSession.attackMultiplePlayers(this, targets, attack);
  }

  public healPlayer(healing: number): void {
    this.health = this.health + healing;
    console.log(this.playerName, 'yay', this.health);
  }

  showPlayer (displayId: string): void {
    let element: Element = document.getElementById(displayId);
    const imgElement = document.createElement('img');
    imgElement.src = this.characterImage;
    element.append(imgElement);
  }

}