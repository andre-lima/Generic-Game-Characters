import handlebars from "handlebars";

export function enemyTemplate(compilingData: any) {
  
  var source = "<div class='player'>" + 
      "<img src={{characterImage}} alt='' class='playerImage'>" + 
      "<div id='js_playerParameters' class='playerParameters'>" + 
        "<div class='playerName'>{{playerName}}</div>" + 
        "<div class='playerHealth'>{{playerHealth}} / {{maxHealth}}</div>" + 
        "<div class='playerSpecial'>{{specialCharge}} / {{maxSpecial}}</div>" + 
      "</div>" + 
      "<div class='controls'>" + 
        "<button class='attackButton'>Attack</button>" + 
        "<button class='specialButton'>Special!</button>" + 
        "<button class='chargeSpecialButton'>Charge</button>" + 
      "</div>" + 
    "</div>";

  var template = handlebars.compile(source);
  
  return template(compilingData);
}