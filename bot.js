var HTTPS = require('https');
var scenario = require('./scenarioRunner.js');
var characterFile = require('./characterCreator.js');
var fs = require('fs');

var scenarioHash = null;
var userCharacter = new characterFile.character();
var allCharacterRaces = ["Human", "Android", "Glorgok", "Ikatrians", "Zolts"];
var allCharacterClasses = ["Warrior", "Rogue", "Ranger", "Berzerker", "Xenomancer"];

var botID = process.env.BOT_ID;

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegexKya = /(.|)*(k|K)ya!~/; botRegexParse = /(P|p)arse/; botRegexLoadParse = /(L|l)oad scenario/;
      botNewchar = /(.|)*newchar/;
      botSetName = /^setname/;
      botGetRaces = /^getraces/;
      botSetRace = /^setrace/;
      botRaces = /(.|)*races/;
      botHelp = /(.|)*help/;
      botGetName = /^getname/;
      botSetClass = /^setclass/;
      botGetClasses = /^getclasses/;
      botSetStats = /^setstats/;
  

  if(request.text && botNewchar.test(request.text)){
    this.res.writeHead(200);
    postMessage("Okay lets make a new character! Use the following commands to customize your character. Use getraces & getclasses for more information on race/class"); 
    postMessage("Type: setname 'character_name'"); 
    postMessage("Type: setrace 'race_name'"); 
    postMessage("Type: setclass 'class_name'");
    this.res.end();
  }
  //get character classes
  else if(request.text && botGetClasses.test(request.text) ){
    this.res.writeHead(200);
    var msg = "";
    for(var i = 0; i < 5; i++){
      msg = msg + allCharacterClasses[i];
      if(i !=4 ){
          msg = msg + ", ";
      }
    }
    postMessage(msg);
    this.res.end();
  }
  //set character class
  else if(request.text && botSetClass.test(request.text) ){
    this.res.writeHead(200);
    var className = request.text.substring(9,100);
    userCharacter.setCharacterClass(className);
    var sayClassName = "Your class is: " + userCharacter.getCharacterClass();
    postMessage(sayClassName);
    this.res.end();
  }
  //get character races
  else if(request.text && botGetRaces.test(request.text) ){
    this.res.writeHead(200);
    var msg = "";
    for(var i = 0; i < 5; i++){
      msg = msg + allCharacterRaces[i];
      if(i !=4 ){
        msg = msg + ", ";
      }
    }
    postMessage(msg);
    this.res.end();
  }
  //set character race
  else if(request.text && botSetRace.test(request.text) ){
    this.res.writeHead(200);
    var raceName = request.text.substring(8,100);
    userCharacter.setCharacterRace(raceName);
    var sayRaceName = "Your race is: " + userCharacter.getCharacterRace();
    postMessage(sayRaceName);
    this.res.end();
  }
  //set character name
  else if(request.text && botSetName.test(request.text) ){
    this.res.writeHead(200);
    var charName = request.text.substring(8,100);
    userCharacter.setCharacterName(charName);
    var sayCharName = userCharacter.getCharacterName();
    postMessage(sayCharName);
    this.res.end();
  }
  //help function
  else if(request.text &&  botHelp.test(request.text)){
    this.res.writeHead(200);
    var msg = characterFile.help();
    postMessage(msg);
    this.res.end();
  }
  //get character name
  else if(request.text &&  botGetName.test(request.text)){
    this.res.writeHead(200);
    var msg = userCharacter.getCharacterName();
    postMessage(msg);
    this.res.end();
  }
  //set stats
  else if(request.text &&  botSetStats.test(request.text)){
    this.res.writeHead(200);
    userCharacter.setCharacterStats( userCharacter.getCharacterRace(), userCharacter.getCharacterClass() );
    //var attMsg = "Attack level: " + userCharacter.getAttack().toString();
    //postMessage(attMsg);
    this.res.end();
  }
  else if(request.text && botRegexParse.test(request.text)) {
    scenarioHash = scenario.parseStory(fs.readFileSync('./scenarioText.txt', 'utf8'));
    this.res.writeHead(200);
    postMessage("Story loaded");
    this.res.end();
  }
  else if(request.text && botRegexLoadParse.test(request.text)) {
    this.res.writeHead(200);
    postMessage(scenarioHash["02"]);
    this.res.end();
  }
  else {
    console.log("Nothing happened");
    this.res.writeHead(200);
    this.res.end();
  }
}

function postMessage(response) {
  var botResponse,options, body, botReq;

  botResponse = response

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}

function getReturnString(phrase, reqName){
  var indexOfHolder = phrase.indexOf('_');
  if(indexOfHolder != -1){
    return (phrase.substr(0, indexOfHolder) + reqName + phrase.substr(indexOfHolder+1, phrase.length));
  }
  return phrase;
}  

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

exports.respond = respond;
