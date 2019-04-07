import { Attack } from "../interfaces/interfaces";
import { playerTemplate } from "./PlayerTemplate";
import { Party } from "../Party/Party";

export abstract class Player {
  //////// Player properties

  // Character sheet
  private playerName: string;
  private playerType: string;
  private playerHealth: number;
  private maxHealth: number;
  private playerDefense: number = 10;
  private playerLevel: number;
  private isLeader: boolean;

  // Special Attack
  private playerSpecial: number;
  private specialCharge: number;

  // State
  private dead: boolean = false;
  private myParty: Party;

  // Render
  private characterImage: string;
  private element: Element;
  private healthBarElement: Element;
  private attackButtonElement: Element;
  private controls: Element;

  constructor(
    imageSource: string,
    name: string,
    type: string,
    health: number,
    leader: boolean
  ) {
    this.characterImage = imageSource;
    this.playerName = name;
    this.playerType = type;
    this.playerHealth = health;
    this.isLeader = leader;
  }

  protected abstract specialAttack(): void;

  private init() {

  }

  public get health(): number {
    return this.playerHealth;
  }

  public set health(newHealth: number) {
    this.playerHealth = newHealth;
  }

  public get isDead(): boolean {
    return this.dead;
  }

  public set party(party: Party) {
    this.myParty = party;
  }

  public attack(target?: Player | Player[], attack?: Attack): number {
    if (!target) {
      target = this.myParty.getRandomEnemy();
      console.log(target)
    }

    if (!attack) {
      attack = { damage: 22, type: "normal" }; // TODO: Get default attack
    }

    if (Array.isArray(target)) {
      return this.attackMultiplePlayers(target, attack);
    } else {
      return this.attackSinglePlayer(target, attack);
    }
  }

  public heal(healing: number): void {
    if (this.dead) return;

    this.health = this.health + healing;
    console.log(this.playerName, "yay", this.health);
  }

  public healOtherPlayer(healing: number, target: Player): void {
    target.health = target.health + healing;
    console.log(target.playerName, "yay", target.health);
  }

  public receiveAttack(attack: Attack, attacker: Player): number {
    if (this.dead) return;

    this.health = this.health - Math.max(attack.damage - this.playerDefense, 0);
    console.log(this.playerName, "ouch", this.health);

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
    targets.forEach(target => {
      totalDamage += target.receiveAttack(attack, this);
    });

    return totalDamage;
  }

  private die(): void {
    console.log(this, "is dead!");
    this.dead = true;
  }

  public renderPlayer(parentElement: Element): void {

    const playerElement = document.createElement("div");

    playerElement.innerHTML = playerTemplate({
      characterImage: this.characterImage,
      playerName: this.playerName,
      playerHeath: this.health
    });

    this.healthBarElement = playerElement.getElementsByClassName('playerHealth')[0];
    this.attackButtonElement = playerElement.getElementsByClassName('attackButton')[0];

    this.attackButtonElement.addEventListener('click', () => this.attack());

    parentElement.append(playerElement);
  }

  public UpdateParameters() {
    this.healthBarElement.innerHTML = this.health.toString();
  }

  public update() {
    this.UpdateParameters();
  }
}
