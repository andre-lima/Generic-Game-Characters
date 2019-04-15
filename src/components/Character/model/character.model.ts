import { charactersConfig } from "../../../config/config-characters";
import { Attack, ClassWeakness } from "../../interfaces/interfaces";


export class CharacterModel {

  public characterImage: string;
  public characterName: string;
  public characterType: string;
  public characterHealth: number;
  private maxHealth: number;
  public characterLevel: number;
  public xp: number;
  public classWeakness: ClassWeakness = { damageType: "none" };
  public isLeader: boolean;
  
  // Special Attack
  public specialPower: any;
  private maxSpecial: number;
  private specialCharge: number;

  constructor(
    imageSource: string,
    name: string,
    type: string,
    leader: boolean = false
  ) {
    this.characterImage = imageSource;
    this.characterName = name;
    this.characterType = type;
    this.isLeader = leader;

    const config = charactersConfig[type];
    console.log(config);

    this.maxHealth = this.characterHealth = config.maxHealth;
    this.maxSpecial = config.maxSpecial;
    this.specialCharge = 0;
  }

  public initialAttributes(type: string): any {
    return charactersConfig[type];
  }
}