function parseStory(scenarioText) {
  var myRegexp = /~.*~/;
  var match = myRegexp.exec(myString);
  var matches = 0;
  while (match != null) {
    matches = matches + 1;
    match = myRegexp.exec(myString);
  }
  return matches.toString();
}
module.exports.parseStory = parseStory;
