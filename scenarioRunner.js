var frameArray = [];
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

function parseStory(scenarioText) {
  var myRegexp = /~.*~/g;
  var match = myRegexp.exec(scenarioText);
  var matches = 0;
  while (match != null) {
    frameArray.push(new storyFrame());
    frameArray[index].setText(match[0].substring(0 , match[0].length-5));
    frameArray[index].setID(match[0].substring(match[0].length-4,match[0].length-1));
    match = myRegexp.exec(scenarioText);
    index = index + 1;
  }
  return frameArray[1].getID();
}
module.exports.parseStory = parseStory;
