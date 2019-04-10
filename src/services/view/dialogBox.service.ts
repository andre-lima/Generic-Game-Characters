
import { dialogBoxTemplate } from "./templates/dialogBox.template";
import { slugify } from "../../utils/functions.utils";

export class DialogBox {
  constructor() {
  }

  public showDialogBox(title: string, text: string, actions?: any[]): void {

    const buttons = actions.map((action) => {
      return { 
        buttonText: action.text, 
        id: slugify(action.text),
        onClick: action.closeModal ? () => { action.callback(); this.closeDialogBox(dialogElement) } : action.callback }
    })

    const dialogElement: Element = document.createElement("div");
    dialogElement.className = 'modal';

    dialogElement.innerHTML = dialogBoxTemplate({
      boxTitle: title,
      boxText: text,
      buttons: buttons
    });

    document.body.appendChild(dialogElement)

    buttons.forEach(button => {
      document.getElementById('dialogBox-button_' + button.id).addEventListener('click', button.onClick);
    });
  }

  public closeDialogBox(box) {
    box.parentElement.removeChild(box);
  }

}

