import { characterTemplate } from "./character.template";
import { Character } from "../Character";
import { VisualEffectsController as VE } from "../../VisualEffects/VisualEffects";

export class RenderCharacter_DOM {
  private characterElement: Element;
  private characterImage: string;
  private element: Element;
  private healthBarElement: Element;
  private specialBarElement: Element;
  private attackButtonElement: Element;
  private specialButtonElement: Element;
  private chargeButtonElement: Element;
  public character: Character;

  constructor(character: Character) {
    this.character = character;
  }

  public renderCharacter(parentElement: Element): void {
    this.characterElement = document.createElement("div");

    this.characterElement.innerHTML = characterTemplate({
      characterImage: this.character.characterImage,
      characterName: this.character.characterName,
      characterHeath: this.character.health,
      maxHealth: this.character.maxHealth,
      hasSpecial: !!this.character.specialPower,
      specialCharge: this.character.specialCharge,
      maxSpecial: this.character.maxSpecial,
      level: this.character.level,
      xp: this.character.xp
    });

    this.healthBarElement = this.characterElement.getElementsByClassName(
      "characterHealth"
    )[0];
    this.specialBarElement = this.characterElement.getElementsByClassName(
      "characterSpecial"
    )[0];
    this.attackButtonElement = this.characterElement.getElementsByClassName(
      "attackButton"
    )[0];

    this.attackButtonElement.addEventListener("click", () =>
      this.character.attack()
    );

    if (!!this.character.specialPower) {
      this.specialButtonElement = this.characterElement.getElementsByClassName(
        "specialButton"
      )[0];
      this.chargeButtonElement = this.characterElement.getElementsByClassName(
        "chargeSpecialButton"
      )[0];

      this.specialButtonElement.addEventListener("click", () =>
        this.character.useSpecial()
      );
      this.chargeButtonElement.addEventListener("click", () =>
        this.character.chargeSpecial(20)
      );
    }

    parentElement.append(this.characterElement);
  }

  public updateParameters() {
    this.healthBarElement.innerHTML = `${this.character.health.toString()} / ${this.character.maxHealth.toString()} `;

    if (this.specialBarElement) {
      this.specialBarElement.innerHTML = `${this.character.specialCharge.toString()} / ${this.character.maxSpecial.toString()} `;
    }
  }

  public renderPostEffects(occurence: string, delay: number = 0) {
    VE.showEffect(occurence, delay);
  }
}
