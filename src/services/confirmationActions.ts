import { ConfirmationBox } from "./confirmationBox.service";
import { Character } from "../components/Character/Character";
import { Weapon, Armor } from "../components/interfaces/interfaces";
import { Inventory } from "../components/Inventory/Inventory";
import { Party } from "../components/Party/Party";

export function alertBox(alertText: string): Promise<boolean> {
  const alertBox = new ConfirmationBox();

  const alertActions = [
    {
      text: "Close",
      callback: () => {},
      closeModal: true
    }
  ];

  return alertBox.showConfirmationBox("Alert", alertText, alertActions);
}

export function dialogBox(story: any): void {
  let s = story.continueStory();
  let dialogText = s.sentence;
  let choices = s.choices;

  const dialog = new ConfirmationBox();

  const dialogActions = choices.length === 0 ? [] : choices.map(choice => {
    return {
      text: choice.text,
      id: choice.sourcePath,
      callback: () => { story.makeChoice(choice.index); dialogBox(story);},
      closeModal: true
    }
  });

  if (s.canContinue && dialogActions.length === 0) {
    dialogActions.push({
      text: '...',
      id: Math.random(),
      callback: () => { dialogBox(story);},
      closeModal: true
    })
  }

  dialog.showConfirmationBox("", dialogText, dialogActions);

}

export function confirmUnnequipShield(
  inventory: Inventory,
  newWeapon: Weapon
): Promise<boolean> {
  const confirmSwap = new ConfirmationBox();

  const confirmActions = [
    {
      text: "Equip and Lose Shield",
      callback: () => {
        inventory.shield = null;
        inventory.weapon = newWeapon;
      },
      closeModal: true
    },
    {
      text: "Keep Shield",
      callback: () => {
        console.log("cancelled");
      },
      closeModal: true
    }
  ];

  return confirmSwap.showConfirmationBox(
    "Unnequip Shield?",
    `By equipping [${newWeapon.name}] you'll lose <${inventory.shield.name}>`,
    confirmActions
  );
}

export function confirmSwapItem(
  character: Character,
  itemType: string,
  newItem: Weapon | Armor
): Promise<boolean> {
  const confirmationBox = new ConfirmationBox();

  const switchItem = (player: Character, item: Weapon) => {
    player.inventory[itemType] = item;
  };
  const cancelSwap = () => {
    console.log("Swap rejected.");
  };

  const dialogActions = [
    {
      text: "Yes",
      callback: switchItem.bind(this, character, newItem),
      closeModal: true
    },
    { text: "No", callback: cancelSwap, closeModal: true }
  ];

  return confirmationBox.showConfirmationBox(
    "Swap Items",
    `Do you want to swap [${character.inventory[itemType].name}] with [${newItem.name}] `,
    dialogActions
  );
}

export function buyItems(party: Party, items: any[]): Promise<boolean> {
  const alertBox = new ConfirmationBox();

  const alertActions = items.map(item => {
    return {
      text: "Buy " + item.name,
      callback: () => {
        if (party.hasEnoughMoney(item.price)) {
          party.spendMoney(item.price);
          party.addToVault(Object.assign({}, item)); // Add a copy of object
        }
      },
      closeModal: false
    };
  });

  alertActions.push({
    text: "Nothing, thanks!",
    callback: () => {
      console.log(party.vault[0]);
      party.removeFromVault(party.vault[0]);
      console.table(party.vault);
    },
    closeModal: true
  });

  return alertBox.showConfirmationBox(
    "Store",
    "What do you want to buy?",
    alertActions
  );
}
