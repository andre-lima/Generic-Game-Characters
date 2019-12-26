import { Attack, ClassWeakness } from "../interfaces/interfaces";
import { Party } from "../Party/Party";
import { Inventory } from "../Inventory/Inventory";
import { RenderCharacter_DOM } from "./view/character.dom-renderer";
import { charactersConfig } from "../config/config-characters";

export class Character {
  //////// Character properties

  // Model
  public type: string;
  public name: string;
  private characterLevel: number;
  private experience: number;
  private characterAccuracy: number;
  private config;

  // Health
  protected initialHealth;
  protected healthLvlMultiplier;
  protected healthLvlExponent;
  protected maxCharacterHealth;
  private characterHealth;
  private weakness: ClassWeakness;

  // Leveling Up
  private lvlExponent: number;
  private lvlMultiplier: number;

  // Special Attack
  public specialPower: any;
  private characterSpecialCharge: any;
  private characterMaxSpecial: any;

  // Inventory
  protected characterInventory: Inventory;

  // State
  private dead: boolean = false;
  private myParty: Party;

  // Render
  private renderer: any;

  constructor(type: string, level: number = 1, name: string = "") {
    this.config = charactersConfig[type];

    this.type = type;

    this.name = name || type;

    this.lvlExponent = this.config.levelExponent;
    this.lvlMultiplier = this.config.levelMultiplier;

    this.characterLevel = level;
    this.characterAccuracy = level;

    // Minimal XP to be on given level.
    this.experience = this.calculateNeededXp(Math.max(level - 1, 0));

    this.weakness = this.config.weakness || {};

    this.specialPower = this.config.special;

    this.init();
  }

  protected init() {
    this.characterHealth = Math.ceil(
      this.config.initialHealth +
        this.config.healthMultiplier *
          Math.pow(this.level - 1, this.config.healthExponent)
    );

    this.maxCharacterHealth = this.characterHealth;

    this.characterSpecialCharge = 0;
    this.characterMaxSpecial = Math.ceil(
      this.config.initialMaxSpecial +
        this.config.specialMultiplier *
          Math.pow(this.level - 1, this.config.specialExponent)
    );

    this.characterInventory = new Inventory();

    this.inventory.weapon = this.config?.initialWeapon;
    this.inventory.armor = this.config?.initialArmor;
    this.inventory.shield = this.config?.initialShield;

    this.renderer = new RenderCharacter_DOM(this);
  }

  // Getters and Setters
  public get health(): number {
    return this.characterHealth;
  }

  public set health(newHealth: number) {
    this.characterHealth = newHealth;
  }

  public get maxHealth(): number {
    return this.maxCharacterHealth;
  }

  public set specialCharge(amount: number) {
    this.characterSpecialCharge = amount;
  }

  public get specialCharge(): number {
    return this.characterSpecialCharge;
  }

  public get maxSpecial(): number {
    return this.characterMaxSpecial;
  }

  public get isDead(): boolean {
    return this.dead;
  }

  public set party(party: Party) {
    this.myParty = party;
  }

  public get level(): number {
    return this.characterLevel;
  }

  public set level(l: number) {
    this.characterLevel = l;
  }

  public get xp(): number {
    return this.experience;
  }

  public set xp(xp: number) {
    this.experience = xp;
    this.calculateLevel();
  }

  public get inventory(): Inventory {
    return this.characterInventory;
  }

  public get accuracy(): number {
    return this.characterLevel;
  }

  private calculateLevel() {
    const xpNeededToLvlUp = this.calculateNeededXp(this.characterLevel);

    if (xpNeededToLvlUp <= this.experience) {
      // Reverting formula. We can't just ++ because it wouldn't account for a player leveling up more than 1 lvl at a time.
      this.characterLevel =
        1 +
        Math.floor(
          Math.pow(this.experience / this.lvlMultiplier, 1 / this.lvlExponent)
        );

      this.levelingUp();
    }
  }

  private calculateNeededXp(level) {
    return this.lvlMultiplier * Math.pow(level, this.lvlExponent);
  }

  private levelingUp() {
    console.log(this.type, "is now level ", this.characterLevel);
  }

  // Attack logic
  private regularAttack(): Attack {
    return {
      damage: this.inventory.weapon.damage,
      damageType: this.inventory.weapon.damageType
    };
  }

  public attack(target?: Character | Character[], attack?: Attack): number {
    if (!attack) {
      attack = this.regularAttack();
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
    return this.specialPower();
  }

  private attackSingleCharacter(target: Character, attack: Attack): number {
    return target.receiveAttack(attack, this);
  }

  private attackMultipleCharacters(
    targets: Character[],
    attack: Attack
  ): number {
    let totalDamage = 0;
    targets.forEach(target => {
      totalDamage += target.receiveAttack(attack, this);
    });

    return totalDamage;
  }

  public chargeSpecial(amount: number): void {
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

    return calculatedDamage;
  }

  private calculateDamage(attack: Attack): number {
    let finalDamage = attack.damage;

    if (
      attack.damageType !== "normal" &&
      attack.damageType === this.weakness.damageType
    ) {
      finalDamage *= 1 + this.weakness.damageIncrease;
    }

    if (
      attack.damageType !== "normal" &&
      attack.damageType === this.inventory.armor.damageType
    ) {
      finalDamage *= 1 - this.inventory.armor.damageReduction;
    }

    finalDamage -=
      (this.inventory.armor?.defense || 0) -
      (this.inventory.shield?.defense || 0);

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
    console.log(this.type, "is dead!");

    this.dead = true;
    this.myParty.removeDeadMember(this);
  }

  public update() {
    this.renderer.updateParameters();
  }

  public render(parentElement: Element) {
    this.renderer.renderCharacter(parentElement);
  }
}
