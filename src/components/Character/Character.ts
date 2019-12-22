import { Attack, ClassWeakness } from "../interfaces/interfaces";
import { Party } from "../Party/Party";
import { Inventory } from "../Inventory/Inventory";
import { RenderCharacter_DOM } from "./view/character.dom-renderer";
import { CharacterModel } from "./model/character.model";

export abstract class Character {
  //////// Character properties

  // Model
  public characterAttributes: CharacterModel;
  private characterLevel: number;
  private experience: number;
  private characterAccuracy: number;

  // Special Attack
  public specialPower: any;

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
    level: number = 1,
    leader: boolean = false
  ) {
    this.characterLevel = level;
    this.characterAccuracy = level;

    // Minimal XP to be on given level.
    this.experience = this.calculateXp(Math.max(level - 1, 0));

    this.characterAttributes = new CharacterModel(
      imageSource,
      name || type.toUpperCase(),
      type,
      leader
    );
  }

  protected init() {
    this.specialPower = null;

    this.inventory = new Inventory();

    this.renderer = new RenderCharacter_DOM(this);
  }

  // Getters and Setters
  public get health(): number {
    return this.characterAttributes.characterHealth;
  }

  public set health(newHealth: number) {
    this.characterAttributes.characterHealth = newHealth;
  }

  public get maxHealth(): number {
    return this.characterAttributes.maxHealth;
  }

  public set specialCharge(amount: number) {
    this.characterAttributes.specialCharge = amount;
  }

  public get specialCharge(): number {
    return this.characterAttributes.specialCharge;
  }

  public get maxSpecial(): number {
    return this.characterAttributes.maxSpecial;
  }

  public get characterName(): string {
    return this.characterAttributes.characterName;
  }

  public get characterImage(): string {
    return this.characterAttributes.characterImage;
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

  public get accuracy(): number {
    return this.characterLevel;
  }

  private calculateLevel() {
    // 2: 8
    // 3: 32
    // 4: 72
    // 5: 128
    // 6: 200
    // 7: 288

    const xpNeededToLvlUp = this.calculateXp(this.characterLevel);

    if (xpNeededToLvlUp <= this.experience) {
      // Reverting formula. We can't just ++ because it wouldn't account for a player leveling up more than 1 lvl at a time.
      this.characterLevel = Math.floor(Math.sqrt(this.experience / 8));
      this.levelingUp();
    }
  }

  private calculateXp(level) {
    return 8 * level ** 2;
  }

  private levelingUp() {
    console.log(this.characterName, " is now level ", this.characterLevel);
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

    this.postEffects("damage");

    return calculatedDamage;
  }

  private calculateDamage(attack: Attack): number {
    let finalDamage = attack.damage;

    if (
      attack.damageType !== "none" &&
      attack.damageType === this.characterAttributes.classWeakness.damageType
    ) {
      finalDamage *= 1 + this.characterAttributes.classWeakness.damageIncrease;
    }

    if (
      attack.damageType !== "none" &&
      attack.damageType === this.inventory.armor.damageType
    ) {
      finalDamage *= 1 - this.inventory.armor.damageReduction;
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

    this.postEffects("death", 200);
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
