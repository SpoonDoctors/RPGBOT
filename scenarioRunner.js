function parseStory(scenarioText) {
  var myString = "something format_abc";
  var myRegexp = /(?:^|\s)format_(.*?)(?:\s|$)/g;
  var match = myRegexp.exec(myString);
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
