import { playerTemplate } from "./player.template";
import { Player } from "../Player";
import { VisualEffectsController as VE } from "../../VisualEffects/VisualEffects";

export class renderPlayer_DOM {
  
  private playerElement: Element;
  private characterImage: string;
  private element: Element;
  private healthBarElement: Element;
  private specialBarElement: Element;
  private attackButtonElement: Element;
  private specialButtonElement: Element;
  private chargeButtonElement: Element;
  public player: Player;

  constructor(player: Player) {
    this.player = player;
  }
  
  public renderPlayer(parentElement: Element): void {
    this.playerElement = document.createElement("div");

    this.playerElement.innerHTML = playerTemplate({
      characterImage: this.player.characterImage,
      playerName: this.player.playerName,
      playerHeath: this.player.health,
      maxHealth: this.player.maxHealth,
      hasSpecial: !!this.player.specialPower,
      specialCharge: this.player.specialCharge,
      maxSpecial: this.player.maxSpecial
    });

    this.healthBarElement = this.playerElement.getElementsByClassName("playerHealth")[0];
    this.specialBarElement = this.playerElement.getElementsByClassName("playerSpecial")[0];
    this.attackButtonElement = this.playerElement.getElementsByClassName("attackButton")[0];

    this.attackButtonElement.addEventListener("click", () => this.player.attack());

    if (!!this.player.specialPower) {
      this.specialButtonElement = this.playerElement.getElementsByClassName("specialButton")[0];
      this.chargeButtonElement = this.playerElement.getElementsByClassName("chargeSpecialButton")[0];

      this.specialButtonElement.addEventListener("click", () => this.player.useSpecial());
      this.chargeButtonElement.addEventListener("click", () => this.player.chargeSpecial(20));
    }

    parentElement.append(this.playerElement);
  }
  
  public updateParameters() {
    this.healthBarElement.innerHTML = `${this.player.health.toString()} / ${this.player.maxHealth.toString()} `;
  
    if (this.specialBarElement) {
      this.specialBarElement.innerHTML = `${this.player.specialCharge.toString()} / ${this.player.maxSpecial.toString()} `;
    }
  }

  public renderPostEffects(occurence: string, delay: number = 0) {
    VE.showEffect(occurence, delay);
  }
  

}