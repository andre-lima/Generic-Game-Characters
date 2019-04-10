import { Attack, ClassWeakness } from "../interfaces/interfaces";
import { Party } from "../Party/Party";
import { Inventory } from "../Inventory";
import { renderPlayer_DOM } from "./render/player.dom-renderer";


export abstract class Player {
  //////// Player properties

  // Character sheet
  private playerName: string;
  private playerType: string;
  private playerHealth: number;
  private maxHealth: number;
  private playerLevel: number;
  public xp: number;
  public classWeakness: ClassWeakness = { damageType: "none" };
  private isLeader: boolean;
  
  // Special Attack
  public specialPower: any;
  private maxSpecial: number;
  private specialCharge: number;
  
  // Inventory
  protected inventory: Inventory;
  
  // State
  private dead: boolean = false;
  private myParty: Party;

  // Render
  private renderer: any;
  
  constructor(
    imageSource: string,
    name: string,
    type: string,
    health: number,
    special: number,
    leader: boolean = false
  ) {
    this.playerName = name;
    this.playerType = type;

    this.playerHealth = health;
    this.maxHealth = health;

    this.maxSpecial = special;
    this.isLeader = leader;
  }

  protected init() {
    this.specialCharge = 0;
    this.specialPower = null;

    this.inventory = new Inventory();

    this.renderer = renderPlayer_DOM(this);
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
      damageType: this.inventory.weapon.damageType
    };
  }

  public attack(target?: Player | Player[], attack?: Attack): number {
    if (!attack) {
      attack = this.regularAttack(); // TODO: Get default attack
    }

    if (!target) {
      target = this.myParty.getRandomEnemy();

      if (!target) {
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
    this.specialPower();

    return 0;
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

  private chargeSpecial(amount: number): void {
    this.specialCharge = Math.min(this.specialCharge + amount, this.maxSpecial);
  }

  public receiveAttack(attack: Attack, attacker: Player): number {
    if (this.dead) return;

    const calculatedDamage = this.calculateDamage(attack);

    this.health = this.health - calculatedDamage;

    if (this.health <= 0) {
      this.health = 0;
      this.die();
    }

    this.postEffects('damage');

    return calculatedDamage;
  }

  public calculateDamage(attack: Attack): number {
    let finalDamage = attack.damage;

    if (attack.damageType !== "none" && attack.damageType === this.classWeakness.damageType) {
      finalDamage *= (1 + this.classWeakness.damageIncrease);
    }

    if (attack.damageType !== "none" && attack.damageType === this.inventory.armor.damageType) {
      finalDamage *= (1 - this.inventory.armor.damageReduction);
    }

    finalDamage -= this.inventory.armor.defense;

    return Math.max(Math.ceil(finalDamage), 0);
  }

  // Healing logic
  public heal(healing: number): void {
    if (this.dead) return;

    this.health = Math.min(this.health + healing, this.maxHealth);
  }

  public healOtherPlayer(healing: number, target: Player): void {
    target.health = target.health + healing;
  }

  // Death logic
  private die(): void {
    console.log(this.playerName, "is dead!");

    this.dead = true;
    this.myParty.removeDeadMember(this);
    
    this.postEffects('death', 200);
  }
  
  private postEffects(type: string, delay: number = 0): void {
    this.renderer.renderPostEffects(type, delay);
  }

  public render(parentElement: Element) {
    this.renderer.renderPlayer(parentElement);
  }

  public update() {
    this.renderer.updateParameters();
  }
}
