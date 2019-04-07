import handlebars from "handlebars";

export default function playerTemplate(compilingData: any) {
  
  var source = "<div class='player'>" + 
      "<img src={{characterImage}} alt='' class='playerImage'>" + 
      "<div id='js_playerParameters' class='playerParameters'>" + 
        "<div class='playerName'>{{playerName}}</div>" + 
        "<div class='playerHealth'>{{playerHealth}}</div>" + 
      "</div>" + 
      "<div class='controls'>" + 
        "<button class='attackButton'>Attack</button>" + 
      "</div>" + 
    "</div>";

  var template = handlebars.compile(source);
  
  return template(compilingData);
}