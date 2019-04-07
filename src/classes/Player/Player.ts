import { Attack } from "../interfaces/interfaces";
import { playerTemplate } from "./player.template";
import { Party } from "../Party/Party";
import { Inventory } from "../Inventory/Inventory";
import { normalSword } from "../Inventory/items/sword.item";
import { normalArmor } from "../Inventory/items/armor.item";

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
  private attackButtonElement: Element;
  private controls: Element;

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

    this.specialCharge = special;
    this.isLeader = leader;
  }


  protected init() {
    this.maxSpecial = this.specialCharge;
    this.maxHealth = this.playerHealth;

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
    return this.inventory.weapon;
  }

  protected abstract specialAttack(): void;

  public attack(target?: Player | Player[], attack?: Attack): number {
    if (!target) {
      target = this.myParty.getRandomEnemy();

      if(!target) {
        return 0;
      }
    }

    if (!attack) {
      attack = this.regularAttack(); // TODO: Get default attack
      console.log(attack)
    }

    if (Array.isArray(target)) {
      return this.attackMultiplePlayers(target, attack);
    } else {
      return this.attackSinglePlayer(target, attack);
    }
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

  public receiveAttack(attack: Attack, attacker: Player): number {
    if (this.dead) return;

    const playerDefense = this.inventory.armor.defense;
    console.log(playerDefense)

    this.health = this.health - Math.max(attack.damage - playerDefense, 0);
    console.log(this.playerName, "ouch", this.health);

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
    console.log(this.playerName, "yay", this.health);
  }

  public healOtherPlayer(healing: number, target: Player): void {
    target.health = target.health + healing;
    console.log(target.playerName, "yay", target.health);
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
    this.attackButtonElement = playerElement.getElementsByClassName('attackButton')[0];

    this.attackButtonElement.addEventListener('click', () => this.attack());

    parentElement.append(playerElement);
  }

  public UpdateParameters() {
    this.healthBarElement.innerHTML = `${this.health.toString()} / ${this.maxHealth.toString()} `;
  }

  public update() {
    this.UpdateParameters();
  }
}
