import { Attack, Special } from "../../interfaces/interfaces";
import { playerTemplate } from "./player.template";
import { Party } from "../../Party";
import { Inventory } from "../../Inventory";

export abstract class Player {
  //////// Player properties

  // Character sheet
  private playerName: string;
  private playerType: string;
  private playerHealth: number;
  private maxHealth: number;
  private playerDefense: number;
  private playerLevel: number;
  private isLeader: boolean;

  // Special Attack
  public specialPower: Special;
  private maxSpecial: number;
  private specialCharge: number;

  // Inventory
  protected inventory: Inventory;

  // State
  private dead: boolean = false;
  private myParty: Party;

  // Render
  private characterImage: string;
  private element: Element;
  private healthBarElement: Element;
  private specialBarElement: Element;
  private attackButtonElement: Element;
  private specialButtonElement: Element;
  private chargeButtonElement: Element;

  constructor(
    imageSource: string,
    name: string,
    type: string,
    health: number,
    special: number,
    leader: boolean = false
  ) {
    this.characterImage = imageSource;
    this.playerName = name;
    this.playerType = type;

    this.playerHealth = health;
    this.maxHealth = health;

    this.maxSpecial = special;
    this.isLeader = leader;
  }

  protected init() {
    this.specialCharge = 0;

    this.inventory = new Inventory();
  }

  // Getters and Setters
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

  // Attack logic
  public regularAttack(): Attack {
    return {
      damage: this.inventory.weapon.damage,
      modifier: this.inventory.weapon.modifier
    }
  }

  public attack(target?: Player | Player[], attack?: Attack): number {

    if (!attack) {
      attack = this.regularAttack(); // TODO: Get default attack
    }

    if (!target) {
      target = this.myParty.getRandomEnemy();

      if(!target) {
        return 0;
      }
    }

    if (Array.isArray(target)) {
      return this.attackMultiplePlayers(target, attack);
    } else {
      return this.attackSinglePlayer(target, attack);
    }
  }

  public useSpecial(target?: Player | Player[]): number {

    this.specialPower.execute();

    // if (attack.usageDepletion > this.specialCharge) {
    //   console.log('not enough mana!');
    //   return 0;
    // }

    // this.specialCharge -= attack.usageDepletion;

    // attack.areaAttack ? target = this.myParty.enemyMembers : target = this.myParty.getRandomEnemy();

    return 0 //this.attack(target, attack);
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

  private chargeSpecial (amount: number): void {
    console.log('charging ', amount);
    this.specialCharge = Math.min(this.specialCharge + amount, this.maxSpecial);
  }

  public receiveAttack(attack: Attack, attacker: Player): number {
    if (this.dead) return;

    const playerDefense = this.inventory.armor.defense;

    this.health = this.health - Math.max(attack.damage - playerDefense, 0);

    if (this.health <= 0) {
      this.health = 0;
      this.die();
    }
    return attack.damage; // Update with value after reducers from armor, etc...
  }

  // Healing logic
  public heal(healing: number): void {
    if (this.dead) return;

    this.health = this.health + healing;
  }

  public healOtherPlayer(healing: number, target: Player): void {
    target.health = target.health + healing;
  }

  // Death logic
  private die(): void {
    console.log(this.playerName, "is dead!");
    this.dead = true;
  }

  // Render logic
  public renderPlayer(parentElement: Element): void {

    const playerElement = document.createElement("div");

    playerElement.innerHTML = playerTemplate({
      characterImage: this.characterImage,
      playerName: this.playerName,
      playerHeath: this.health,
      maxHealth: this.maxHealth,
      specialCharge: this.specialCharge,
      maxSpecial: this.maxSpecial
    });

    this.healthBarElement = playerElement.getElementsByClassName('playerHealth')[0];
    this.specialBarElement = playerElement.getElementsByClassName('playerSpecial')[0];
    this.attackButtonElement = playerElement.getElementsByClassName('attackButton')[0];
    this.specialButtonElement = playerElement.getElementsByClassName('specialButton')[0];
    this.chargeButtonElement = playerElement.getElementsByClassName('chargeSpecialButton')[0];

    this.attackButtonElement.addEventListener('click', () => this.attack());
    this.specialButtonElement.addEventListener('click', () => this.useSpecial());
    this.chargeButtonElement.addEventListener('click', () => this.chargeSpecial(20));

    parentElement.append(playerElement);
  }

  public UpdateParameters() {
    this.healthBarElement.innerHTML = `${this.health.toString()} / ${this.maxHealth.toString()} `;
    this.specialBarElement.innerHTML = `${this.specialCharge.toString()} / ${this.maxSpecial.toString()} `;
  }

  public update() {
    this.UpdateParameters();
  }
}
