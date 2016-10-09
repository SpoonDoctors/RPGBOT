var frameArray = new Object();
var index = 0;
function storyFrame(){
  this.frameID = "";
  this.frameText = "";
}


storyFrame.prototype.setID = function(ID){
  this.frameID = ID;
}
storyFrame.prototype.setText = function(text){
  this.frameText = text;
}
storyFrame.prototype.getID = function(){
  return this.frameID;  
}
storyFrame.prototype.getText = function(){
  return this.frameText;  
}

function parseStory(scenarioText) {
  var myRegexp = /~.*~/g;
  var match = myRegexp.exec(scenarioText);
  var matches = 0;
  var matchingString = null;
  while (match != null) {
    matchingString = match[0];
    match = myRegexp.exec(scenarioText);
    index = index + 1;
  }
  return "Cheese";
}
module.exports.parseStory = parseStory;
