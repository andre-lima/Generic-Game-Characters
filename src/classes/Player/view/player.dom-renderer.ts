import { playerTemplate } from "./player.template";
import { Player } from "../Player";
import { VisualEffectsController as VE } from "../../VisualEffects/VisualEffects";

export function renderPlayer_DOM(player: Player) {

  let playerElement: Element;
  let characterImage: string;
  let element: Element;
  let healthBarElement: Element;
  let specialBarElement: Element;
  let attackButtonElement: Element;
  let specialButtonElement: Element;
  let chargeButtonElement: Element;
  
  return {
    renderPlayer: function renderPlayer(parentElement: Element): void {
      playerElement = document.createElement("div");

      playerElement.innerHTML = playerTemplate({
        characterImage: characterImage,
        playerName: player.playerName,
        playerHeath: player.health,
        maxHealth: player.maxHealth,
        hasSpecial: !!player.specialPower,
        specialCharge: player.specialCharge,
        maxSpecial: player.maxSpecial
      });

      healthBarElement = playerElement.getElementsByClassName("playerHealth")[0];
      specialBarElement = playerElement.getElementsByClassName("playerSpecial")[0];
      attackButtonElement = playerElement.getElementsByClassName("attackButton")[0];

      attackButtonElement.addEventListener("click", () => player.attack());

      if (!!player.specialPower) {
        specialButtonElement = playerElement.getElementsByClassName("specialButton")[0];
        chargeButtonElement = playerElement.getElementsByClassName("chargeSpecialButton")[0];

        specialButtonElement.addEventListener("click", () => player.useSpecial());
        chargeButtonElement.addEventListener("click", () => player.chargeSpecial(20));
      }

      parentElement.append(playerElement);
    },
    
    updateParameters: function updateParameters() {
      healthBarElement.innerHTML = `${player.health.toString()} / ${player.maxHealth.toString()} `;
    
      if (specialBarElement) {
        specialBarElement.innerHTML = `${player.specialCharge.toString()} / ${player.maxSpecial.toString()} `;
      }
    },

    renderPostEffects: function renderPostEffects(occurence: string, delay: number = 0) {
      VE.showEffect(occurence, delay);
    }
  }

}