var frameArray = [];
var index = 0;
function storyFrame(){
  this.frameID = "";
  this.frameText = "";
}

var aFrame = new storyFrame();

frameArray.prototype.setID = function(ID){
  this.frameID = ID;
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
    aFrame.setText(match[0]);
    aFrame.setID(match[0]);
    frameArray[index] = aFrame;
    match = myRegexp.exec(scenarioText);
    index = index + 1;
  }
  return frameArray[0].getID();
}
module.exports.parseStory = parseStory;

