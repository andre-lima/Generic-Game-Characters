
import handlebars from "handlebars";

export function dialogBoxTemplate(compilingData: any) {
  
    var source = 
    `<div class='dialogBox modal-is-open'>
      <div class='dialogBox-container'>
        <div class='dialogBox-title'>{{boxTitle}}</div>
        <div class='dialogBox-text'>{{boxText}}</div>
        <div class='dialogBox-buttons'>
          {{#each buttons}}
            <button class='dialogBox-button' id='dialogBox-button_{{id}}'>{{this.buttonText}}</button>
          {{/each}}
        </div>
      </div>
    </div>`;

  var template = handlebars.compile(source);
  
  return template(compilingData);
}