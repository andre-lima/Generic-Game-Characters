import { Player } from "../Player/Player";

export class Controls {

  private player: Player;

  constructor(player: Player) {
    this.player = player;
  }

  public createControls () {
    const controlsContainer = document.createElement('div');

    const attackBtn = document.createElement('button');
    attackBtn.innerText = 'Attack';
    attackBtn.addEventListener('click', () => this.player.attack());


    controlsContainer.append(attackBtn);

    return controlsContainer;
  }

  public attachControls() {
    return this.createControls();
  }


}