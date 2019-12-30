
import handlebars from "handlebars";

export function confirmationBoxTemplate(compilingData: any) {
  
    var source = 
    `<div class='confirmationBox modal-is-open'>
      <div class='confirmationBox-container'>
        {{#if hasSpecial}}<div class='confirmationBox-title'>{{boxTitle}}</div>{{/if}}
        <div class='confirmationBox-text'>{{boxText}}</div>
        <div class='confirmationBox-buttons'>
          {{#each buttons}}
            <button class='confirmationBox-button' id='confirmationBox-button_{{id}}'>{{this.buttonText}}</button>
          {{/each}}
        </div>
      </div>
    </div>`;

  var template = handlebars.compile(source);
  
  return template(compilingData);
}