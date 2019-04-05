import { Player } from "../Player/Player";
import { Attack } from "../interfaces/interfaces";

export class Combat {
  constructor() {
    
  }

  public attackPlayer(attacker: Player, target: Player, attack: Attack) {
    return target.sufferAttack(attack);
  }

  public attackMultiplePlayers(attacker: Player, targets: Player[], attack: Attack) {
    let totalDamage = 0;
    targets.forEach((target) => {
      totalDamage += this.attackPlayer(attacker, target, attack);
    })

    return totalDamage;
  }
}