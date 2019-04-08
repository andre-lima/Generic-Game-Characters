export function heal(): void {
  
  const usageDepletion = 40;
  const healingPower = 50;

  if (this.specialCharge < usageDepletion)
    return;

  this.specialCharge -= usageDepletion;

  this.myParty.members.forEach(member => {
    member.heal(healingPower);
  });

};