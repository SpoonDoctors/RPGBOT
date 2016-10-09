var frameArray = [];
var index = 0;
function storyFrame(){
  this.frameID = "";
  this.frameText = "";
}


storyFrame.prototype.setID = function(textID){
  this.frameID = textID;
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
  var newStoryFrame = new storeyFrame();
  while (match != null) {
    frameArray.push(newStoryFrame);
    frameArray[index].setText(match[0]);
    frameArray[index].setID(match[0]);
    console.log(match[0]);
    match = myRegexp.exec(scenarioText);
    index = index + 1;
  }
  return frameArray[0].getID();
}
module.exports.parseStory = parseStory;

