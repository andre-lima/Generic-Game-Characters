import { confirmationBoxTemplate } from "./templates/confirmationBox.template";
import { slugify } from "../utils/functions.utils";

export class ConfirmationBox {
  // static unresolvedConfirmations: any;

  constructor() {}

  public showConfirmationBox(
    title: string,
    text: string,
    actions?: any[]
  ): Promise<boolean> {
    return new Promise(resolve => {
      const buttons = actions.map(action => {
        return {
          buttonText: action.text,
          id: slugify(action.text),
          onClick: action.closeModal
            ? () => {
                action.callback();
                this.closeConfirmationBox(dialogElement);
                resolve(true);
              }
            : action.callback
        };
      });

      const dialogElement: Element = document.createElement("div");
      dialogElement.className = "modal";

      dialogElement.innerHTML = confirmationBoxTemplate({
        boxTitle: title,
        boxText: text,
        buttons: buttons
      });

      document.body.appendChild(dialogElement);

      buttons.forEach(button => {
        document
          .getElementById("confirmationBox-button_" + button.id)
          .addEventListener("click", button.onClick);
      });
    });
  }

  public closeConfirmationBox(box) {
    box.parentElement.removeChild(box);
  }
}
