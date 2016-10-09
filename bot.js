var HTTPS = require('https');
var scenario = require('./scenarioRunner.js');
var fs = require('fs');
var scenarioHash = null;

var botID = process.env.BOT_ID;

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegexKya = /(.|)*(k|K)ya!~/; botRegexParse = /(P|p)arse/; botRegexLoadParse = /(L|l)oad parse/;
  

  if(request.text && botRegexKya.test(request.text)) {
    this.res.writeHead(200);
    postMessage("Garbage");
    this.res.end();
  }
  else if(request.text && botRegexParse.test(request.text)) {
    scenarioHash = scenario.parseStory(fs.readFileSync('./testText.txt', 'utf8'));
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
