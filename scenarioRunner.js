function parseStory(scenarioText) {

  var myRegexp = /~.*~/g;
  var match = myRegexp.exec(scenarioText);
  var matches = 0;
  while (match != null) {
    matches = matches + 1;
    // matched text: match[0]
    // match start: match.index
    // capturing group n: match[n]
    console.log(match[0])
    match = myRegexp.exec(myString);
  }
  return matches.toString();
}
module.exports.parseStory = parseStory;
