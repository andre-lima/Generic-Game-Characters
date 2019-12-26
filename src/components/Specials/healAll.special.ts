export function healAll(
  usageDepletion: number = 70,
  healingAmount: number = 70
): void {
  if (this.specialCharge < usageDepletion) return;

  this.specialCharge -= usageDepletion;

  this.myParty.members.forEach(member => {
    member.heal(healingAmount);
  });
}
