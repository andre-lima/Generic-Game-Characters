export function powerAttack(): void {
  
  const usageDepletion = 40;
  const damageMultiplier = 3;
  const target = this.myParty.getRandomEnemy();

  const specialAttack = {
    damage: this.inventory.weapon.damage * damageMultiplier,
  }

  if (this.specialCharge < usageDepletion)
    return;

  this.specialCharge -= usageDepletion;

  this.attack(target, specialAttack);
};