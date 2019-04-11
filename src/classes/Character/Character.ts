import { Attack, ClassWeakness } from "../interfaces/interfaces";
import { Party } from "../Party/Party";
import { Inventory } from "../Inventory/Inventory";
import { renderCharacter_DOM } from "./view/character.dom-renderer";


export abstract class Character {
  //////// Character properties

  // Character sheet
  public characterImage: string;
  private characterName: string;
  private characterType: string;
  private characterHealth: number;
  private maxHealth: number;
  private characterLevel: number;
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
    this.characterImage = imageSource;
    this.characterName = name;
    this.characterType = type;

    this.characterHealth = health;
    this.maxHealth = health;

    this.maxSpecial = special;
    this.isLeader = leader;
  }

  protected init() {
    this.specialCharge = 0;
    this.specialPower = null;

    this.inventory = new Inventory();

    this.renderer = new renderCharacter_DOM(this);
  }

  // Getters and Setters
  public get health(): number {
    return this.characterHealth;
  }

  public set health(newHealth: number) {
    this.characterHealth = newHealth;
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

  public attack(target?: Character | Character[], attack?: Attack): number {
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
      return this.attackMultipleCharacters(target, attack);
    } else {
      return this.attackSingleCharacter(target, attack);
    }
  }

  public useSpecial(target?: Character | Character[]): number {
    this.specialPower();

    return 0;
  }

  private attackSingleCharacter(target: Character, attack: Attack): number {
    return target.receiveAttack(attack, this);
  }

  private attackMultipleCharacters(targets: Character[], attack: Attack): number {
    let totalDamage = 0;
    targets.forEach(target => {
      totalDamage += target.receiveAttack(attack, this);
    });

    return totalDamage;
  }

  private chargeSpecial(amount: number): void {
    this.specialCharge = Math.min(this.specialCharge + amount, this.maxSpecial);
  }

  public receiveAttack(attack: Attack, attacker: Character): number {
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

  public healOtherCharacter(healing: number, target: Character): void {
    target.health = target.health + healing;
  }

  // Death logic
  private die(): void {
    console.log(this.characterName, "is dead!");

    this.dead = true;
    this.myParty.removeDeadMember(this);
    
    this.postEffects('death', 200);
  }
  
  private postEffects(type: string, delay: number = 0): void {
    this.renderer.renderPostEffects(type, delay);
  }

  public render(parentElement: Element) {
    this.renderer.renderCharacter(parentElement);
  }

  public update() {
    this.renderer.updateParameters();
  }
}
