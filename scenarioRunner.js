var frameArray = [];
var index = 0;
function storyFrame(){
  this.frameID = "";
  this.frameText = "";
}


frameArray.prototype.setID = function(textID){
  this.frameID = textID;
}
frameArray.prototype.setText = function(text){
  this.frameText = text;
}
frameArray.prototype.getID = function(){
  return this.frameID;  
}  

function parseStory(scenarioText) {
  var myRegexp = /~.*~/g;
  var match = myRegexp.exec(scenarioText);
  var matches = 0;
  while (match != null) {
    frameArray.push(new storyFrame());
    frameArray[index].setText(match[0]);
    frameArray[index].setID(match[0]);
    match = myRegexp.exec(scenarioText);
    index = index + 1;
  }
  return frameArray[0].getID();
}
module.exports.parseStory = parseStory;

