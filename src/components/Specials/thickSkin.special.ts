export function heal(
  usageDepletion: number = 40,
  defenseIncrease: number = 40
): void {
  if (this.specialCharge < usageDepletion) return;

  this.specialCharge -= usageDepletion;

  // TODO
  // this.inventory.armor = defenseIncrease;
}
