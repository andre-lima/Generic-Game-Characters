
import handlebars from "handlebars";

export function dialogBoxTemplate(compilingData: any) {
  
  var source = "<div class='dialogBox modal-is-open'>" + 
      "<div class='dialogBox-container'>" + 
        "<div class='dialogBox-title'>{{boxTitle}}</div>" + 
        "<div class='dialogBox-text'>{{boxText}}</div>" + 
        "<div class='dialogBox-buttons'>" + 
          "<button class='dialogBox-confirmation'>OK</button>" + 
        "</div>" + 
      "</div>" + 
    "</div>";

  var template = handlebars.compile(source);
  
  return template(compilingData);
}