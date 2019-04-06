import { Attack } from "../interfaces/interfaces";
import { Combat } from "../Combat/Combat";

export abstract class Player {

  // Object properties
  private characterImage: string;

  //////// Player properties

  // Character sheet
  private playerName: string;
  private playerType: string;
  private playerHealth: number;
  private maxHealth: number;
  private playerDefense: number = 10;
  private playerLevel: number;

  // Special Attack
  private playerSpecial: number;
  private specialCharge: number;
  
  // State
  private dead: boolean = false;


  constructor(imageSource: string, 
              name: string, 
              type: string, 
              health: number) {
    this.characterImage = imageSource;
    this.playerName = name;
    this.playerType = type;
    this.playerHealth = health;
  }

  protected abstract specialAttack(): void;

  public get health(): number {
    return this.playerHealth;
  }

  public set health(newHealth: number) {
    this.playerHealth = newHealth;
  }

  public get isDead(): boolean {
    return this.isDead;
  }

  public attack(target: Player | Player[], attack: Attack): number {
    if (Array.isArray(target)) {
      return this.attackMultiplePlayers(target, attack);
    } else {
      return this.attackSinglePlayer(target, attack);
    }
  }

  public heal(healing: number): void {
    if (this.dead) return;

    this.health = this.health + healing;
    console.log(this.playerName, 'yay', this.health);
  }

  public healOtherPlayer(healing: number, target: Player): void {
    target.health = target.health + healing;
    console.log(target.playerName, 'yay', target.health);
  }

  public receiveAttack(attack: Attack, attacker: Player): number {
    if (this.dead) return;

    this.health = this.health - Math.max(attack.damage - this.playerDefense, 0);
    console.log(this.playerName, 'ouch', this.health);

    if (this.health <= 0) {
      this.health = 0;
      this.die();
    }
    return attack.damage; // Update with value after reducers from armor, etc...
  }

  private attackSinglePlayer(target: Player, attack: Attack): number {
    return target.receiveAttack(attack, this);
  }

  
  private attackMultiplePlayers(targets: Player[], attack: Attack): number {
    let totalDamage = 0;
    targets.forEach((target) => {
      totalDamage += target.receiveAttack(attack, this);
    })

    return totalDamage;
  }

  private die(): void {
    console.log(this, 'is dead!');
    this.dead = true;
  }

  private showPlayer (displayId: string): void {
    let element: Element = document.getElementById(displayId);
    const imgElement = document.createElement('img');
    imgElement.src = this.characterImage;
    element.append(imgElement);
  }

}