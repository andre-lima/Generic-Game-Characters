import handlebars from "handlebars";

export function playerTemplate(compilingData: any) {
  
  var source = "<div class='player'>" + 
      "<img src={{characterImage}} alt='' class='playerImage hidden'>" + 
      "<div id='js_playerParameters' class='playerParameters'>" + 
        "<div class='playerName'>{{playerName}}</div>" + 
        "<div class='playerHealth'>{{playerHealth}} / {{maxHealth}}</div>" + 
        "{{#if hasSpecial}}<div class='playerSpecial'>{{specialCharge}} / {{maxSpecial}}</div>{{/if}}" + 
      "</div>" + 
      "<div class='controls'>" + 
        "<button class='attackButton'>Attack</button>" + 
        "{{#if hasSpecial}}<button class='specialButton'>Special!</button>" + 
        "<button class='chargeSpecialButton'>Charge</button>{{/if}}" + 
      "</div>" + 
    "</div>";

  var template = handlebars.compile(source);
  
  return template(compilingData);
}