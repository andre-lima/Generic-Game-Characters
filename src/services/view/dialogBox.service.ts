
import { dialogBoxTemplate } from "./templates/dialogBox.template";

export class DialogBox {
  constructor() {
    console.log('modallll')
  }

  public showDialogBox(title: string, text: string): void {

    const dialogElement = document.createElement("div");

    dialogElement.innerHTML = dialogBoxTemplate({
      boxTitle: title,
      boxText: text
    });

    document.body.appendChild(dialogElement)
  }


}

